import { InjectPubSub } from '@nestjs-query/query-graphql';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenError } from 'apollo-server-fastify';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';

import { OrderStatus } from '../entities/enums/order-status.enum';
import { RequestEntity } from '../entities/request.entity';
import { ServiceCategoryEntity } from '../entities/service-category.entity';
import { Point } from '../interfaces/point';
import { DriverLocationWithId, DriverRedisService } from '../redis/driver-redis.service';
import { OrderRedisService } from '../redis/order-redis.service';
import { SharedDriverService } from './shared-driver.service';
import { DriverNotificationService } from './firebase-notification-service/driver-notification.service';
import { GoogleServicesService } from './google-services/google-services.service';
import { RegionService } from './region/region.service';
import { SharedRiderService } from './shared-rider.service';
import { ServiceService } from './service.service';

@Injectable()
export class SharedOrderService {
    constructor(
        @InjectRepository(RequestEntity)
        private orderRepository: Repository<RequestEntity>,
        private regionService: RegionService,
        @InjectRepository(ServiceCategoryEntity)
        private serviceCategoryRepository: Repository<ServiceCategoryEntity>,
        private googleServices: GoogleServicesService,
        private servicesService: ServiceService,
        private riderService: SharedRiderService,
        private driverRedisService: DriverRedisService,
        private orderRedisService: OrderRedisService,
        private driverService: SharedDriverService,
        @InjectPubSub()
        private pubSub: RedisPubSub,
        private driverNotificationService: DriverNotificationService
    ) { }

    async calculateFare(input: { points: Point[] }) {
        const regions = await this.regionService.getRegionWithPoint(input.points[0]);
        if (regions.length < 1) {
            throw new ForbiddenError(CalculateFareError.RegionUnsupported);
        }
        const servicesInRegion = await this.regionService.getRegionServices(regions[0].id);
        if (servicesInRegion.length < 1) {
            throw new ForbiddenError(CalculateFareError.NoServiceInRegion);
        }
        const metrics = (servicesInRegion.findIndex(x => x.perHundredMeters > 0) > -1) ?
            await this.googleServices.getSumDistanceAndDuration(input.points) :
            { distance: 0, duration: 0 };
        const cats = await this.serviceCategoryRepository.find({ relations: ['services', 'services.media'] });
        const _cats = cats.map(cat => {
            const { services, ..._cat } = cat;
            const _services = services.filter(x => servicesInRegion.filter(y => y.id == x.id).length > 0).map(service => {
                return {
                    ...service,
                    cost: this.servicesService.calculateCost(service, metrics.distance, metrics.duration)
                }
            });
            return {
                ..._cat,
                services: _services
            }
        }).filter(x => x.services.length > 0);
        return {
            ...metrics,
            currency: regions[0].currency,
            services: _cats
        }
    }

    async createOrder(input: { riderId: number, serviceId: number, intervalMinutes: number, points: Point[], addresses: string[], operatorId?: number }): Promise<RequestEntity> {
        const service = await this.servicesService.getWithId(input.serviceId);
        if (service == undefined) {
            throw new ForbiddenError('SERVICE_NOT_FOUND');
        }
        const closeDrivers = await this.driverRedisService.getClose(input.points[0], service.searchRadius);
        const driverIds = closeDrivers.map((x: DriverLocationWithId) => x.driverId);

        const driversWithService = await this.driverService.getOnlineDriversWithServiceId(driverIds, input.serviceId);
        const metrics = service.perHundredMeters > 0 ?
            await this.googleServices.getSumDistanceAndDuration(input.points) :
            { distance: 0, duration: 0 };
        const cost = this.servicesService.calculateCost(service, metrics.distance, metrics.duration);
        const eta = new Date(new Date().getTime() + ((input.intervalMinutes | 0) * 60 * 1000));
        const regions = await this.regionService.getRegionWithPoint(input.points[0]);
        if (service.maximumDestinationDistance != 0 && metrics.distance > service.maximumDestinationDistance) {
            throw new ForbiddenError('DISTANCE_TOO_FAR');
        }
        if (service.prepayPercent > 0) {
            const balance = await this.riderService.getRiderCreditInCurrency(input.riderId, regions[0].currency);
            if (balance < (cost * service.prepayPercent / 100)) {
                throw new ForbiddenError('UNSUFFICIENT_CREDIT');
            }
        }
        const order = await this.orderRepository.save({
            serviceId: input.serviceId,
            currency: regions[0].currency,
            riderId: input.riderId,
            points: input.points,
            addresses: input.addresses.map(address => address.replace(', ', '-')),
            distanceBest: metrics.distance,
            durationBest: metrics.duration,
            status: input.intervalMinutes > 30 ? OrderStatus.Booked : (driversWithService.length < 1 ? OrderStatus.NoCloseFound : OrderStatus.Requested),
            costBest: cost,
            costAfterCoupon: cost,
            expectedTimestamp: eta,
            operatorId: input.operatorId,
            providerShare: service.providerShareFlat + (service.providerSharePercent * cost / 100),
        });
        await this.orderRedisService.add(order, input.intervalMinutes | 0);
        if (input.intervalMinutes == null || input.intervalMinutes < 30) {
            for (const driver of driversWithService) {
                this.orderRedisService.driverNotified(order.id, driver.id);
            }
            this.pubSub.publish('orderCreated', { orderCreated: order });
            const _drivers = driversWithService.filter(x => x.notificationPlayerId != null)
            if (_drivers.length > 0) {
                this.driverNotificationService.requests(_drivers);
            }
        }
        return order;
    }

}

enum CalculateFareError {
    RegionUnsupported = 'REGION_UNSUPPORTED',
    NoServiceInRegion = 'NO_SERVICE_IN_REGION'
}
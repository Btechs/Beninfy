import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(ServiceEntity)
        private service: Repository<ServiceEntity>
    ) {}

    calculateCost(service: ServiceEntity, distance: number, duration: number) {
        let i = service.baseFare;
        let multiplier = 1;
        console.log(`Calculating Trip fee with base fare ${i} distance of ${distance} meters and duration of ${duration}`);
        i += (service.perHundredMeters * distance / 100) + (service.perMinuteDrive * duration / 60);
        console.log(`Initial calculation without multiplier: ${i}`);
        let ratioCost = 0;
        let newRatioCost = 0;
        let ratioDistance = 0;
        let endDistance = 0;
        for (const _multiplier of service.distanceMultipliers) {
            if (distance > _multiplier.distanceFrom) {
                endDistance = (distance > _multiplier.distanceTo ? _multiplier.distanceTo : distance);
                ratioDistance = (endDistance - _multiplier.distanceFrom);
                ratioCost = (ratioDistance / distance) * i;
                newRatioCost = ratioCost * _multiplier.multiply;
                i = (i - ratioCost) + newRatioCost;
            }
        }
        console.log(`After time & distance multiplier: ${i}`);

        for (const _multiplier of service.timeMultipliers) {
            const startMinutes = parseInt(_multiplier.startTime.split(':')[0]) * 60 + parseInt(_multiplier.startTime.split(':')[1]);
            const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
            const endMinutes = parseInt(_multiplier.endTime.split(':')[0]) * 60 + parseInt(_multiplier.endTime.split(':')[1]);
            if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
                i *= _multiplier.multiply;
                multiplier *= _multiplier.multiply;
            }
        }
        console.log(`After time multiplier: ${i}`);

        if (i < (service.minimumFee * multiplier)) {
            i = service.minimumFee * multiplier;
        }
        console.log(`After Minimum fee applied: ${i}`);
        return i;
    }

    getWithId(id: number): Promise<ServiceEntity | undefined> {
        return this.service.findOne(id);
    }
}
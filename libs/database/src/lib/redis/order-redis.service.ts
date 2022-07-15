import { Injectable } from "@nestjs/common";
import { RequestEntity } from "../entities/request.entity";
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from "ioredis";

@Injectable()
export class OrderRedisService {

    constructor(
        @InjectRedis() private readonly redisService: Redis,
    ) {}

    async add(request: RequestRedisDTO, minutesfromNow: number): Promise<RequestRedisDTO> {
        const date = new Date()
        const pickupTime = date.setMinutes(date.getMinutes() + minutesfromNow);
        await this.redisService.geoadd(RedisKeys.Request, request.points[0].lng, request.points[0].lat, request.id.toString())
        await this.redisService.zadd(RedisKeys.RequestTime, pickupTime, request.id)
        await this.redisService.set(`${RedisKeys.Request}:${request.id}`, JSON.stringify(request));
        return request;
    }

    async getForDriver(driverId: number, distance: number): Promise<Array<RequestRedisDTO>> {
        const driverLocation = await this.redisService.geopos(RedisKeys.Driver, driverId.toString());
        if(driverLocation[0] == null) {
            return [];
        }
        const requestIds = await this.redisService.georadius(RedisKeys.Request, parseFloat(driverLocation[0][0]), parseFloat(driverLocation[0][1]), distance, 'm');
        const requests = [];
        const ts = Math.round(new Date().getTime());
        const min = ts - (10 * 60000);
        const max = ts + (30 * 60000);
        const _requests = await this.redisService.zrangebyscore(RedisKeys.RequestTime, min, max);
        const intersection = requestIds.filter(x=>_requests.includes(x))
        for (const requestId of intersection) {
            const request = await this.redisService.get(`${RedisKeys.Request}:${requestId}`);
            if (request)
                requests.push(JSON.parse(request));
        }
        return requests;
    }

    async driverNotified(requestId: number, driverId: number) {
        return await this.redisService.sadd(`${RedisKeys.RequestDrivers}:${requestId}`, driverId)
    }

    async getDriversNotified(requestId: number): Promise<Array<number>> {
        const driverIds = await this.redisService.smembers(`${RedisKeys.RequestDrivers}:${requestId}`);
        return driverIds.map((x: string) => parseInt(x));
    }

    async expire(requestIds: number[]) {
        this.redisService.zrem(RedisKeys.Request, requestIds);
        this.redisService.zrem(RedisKeys.RequestTime, requestIds);
        this.redisService.zrem(RedisKeys.RequestDrivers, requestIds);
        // for(const requestId of requestIds) {
        //     this.redis.expire(`${RedisKeys.Request}:${requestId}`, -1);
        // }
        this.redisService.del(requestIds.map(id => (`${RedisKeys.Request}:${id}`))); // # This doesn't works for some reason. expire works
    }

    async getAll(): Promise<RequestRedisDTO[]> {
        const min = 0;
        const max = -1;
        const _requests = await this.redisService.zrange(RedisKeys.RequestTime, min, max);
        const result: RequestRedisDTO[] = []
        for(const requestId of _requests) {
            const request = await this.redisService.get(`${RedisKeys.Request}:${requestId}`);
            if(request != null) {
                result.push(JSON.parse(request ?? ''));
            }
        }
        return result;
    }
}

enum RedisKeys {
    Driver = 'driver',
    Request = 'request',
    RequestDrivers = 'request-drivers',
    RequestTime = 'request-time'
}

type RequestRedisDTO = Pick<RequestEntity, 'id' | 'expectedTimestamp' | 'currency' | 'addresses' | 'points' | 'distanceBest' | 'durationBest' | 'costBest' | 'serviceId' | 'createdOn' | 'status'>;
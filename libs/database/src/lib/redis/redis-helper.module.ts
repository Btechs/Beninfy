import { Module } from "@nestjs/common";
import { DriverRedisService } from "./driver-redis.service";
import { OrderRedisService } from "./order-redis.service";

@Module({
    providers: [DriverRedisService, OrderRedisService],
    exports: [DriverRedisService, OrderRedisService]
})
export class RedisHelpersModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisPubSubProvider } from '@beninfy/database';
import { DriverTransactionEntity } from '@beninfy/database/driver-transaction.entity';
import { DriverWalletEntity } from '@beninfy/database/driver-wallet.entity';
import { DriverEntity } from '@beninfy/database/driver.entity';
import { FleetTransactionEntity } from '@beninfy/database/fleet-transaction.entity';
import { FleetWalletEntity } from '@beninfy/database/fleet-wallet.entity';
import { ProviderTransactionEntity } from '@beninfy/database/provider-transaction.entity';
import { ProviderWalletEntity } from '@beninfy/database/provider-wallet.entity';
import { RequestEntity } from '@beninfy/database/request.entity';
import { RiderEntity } from '@beninfy/database/rider-entity';
import { RiderTransactionEntity } from '@beninfy/database/rider-transaction.entity';
import { RiderWalletEntity } from '@beninfy/database/rider-wallet.entity';
import { ServiceCategoryEntity } from '@beninfy/database/service-category.entity';
import { ServiceEntity } from '@beninfy/database/service.entity';
import { RedisHelpersModule } from '@beninfy/redis/redis-helper.module';
import { SharedConfigurationService } from '../shared-configuration.service';
import { FirebaseNotificationModule } from './firebase-notification-service/firebase-notification-service.module';
import { GoogleServicesModule } from './google-services/google-services.module';
import { RegionModule } from './region/region.module';
import { ServiceService } from './service.service';
import { SharedDriverService } from './shared-driver.service';
import { SharedFleetService } from './shared-fleet.service';
import { SharedOrderService } from './shared-order.service';
import { SharedProviderService } from './shared-provider.service';
import { SharedRiderService } from './shared-rider.service';

@Module({
  imports: [
      RedisHelpersModule,
    TypeOrmModule.forFeature([
      ServiceCategoryEntity,
      ServiceEntity,
      RiderEntity,
      DriverEntity,
      DriverWalletEntity,
      DriverTransactionEntity,
      FleetWalletEntity,
      FleetTransactionEntity,
      ProviderWalletEntity,
      ProviderTransactionEntity,
      RiderWalletEntity,
      RiderTransactionEntity,
      RequestEntity,
      
    ]),
    RegionModule,
    GoogleServicesModule,
    FirebaseNotificationModule.register(),
  ],
  providers: [
    RedisPubSubProvider.provider(),
    ServiceService,
    SharedDriverService,
    SharedFleetService,
    SharedOrderService,
    SharedProviderService,
    SharedRiderService,
    SharedConfigurationService
  ],
  exports: [
    SharedDriverService,
    SharedFleetService,
    SharedOrderService,
    SharedProviderService,
    SharedRiderService,
  ],
})
export class SharedOrderModule {}

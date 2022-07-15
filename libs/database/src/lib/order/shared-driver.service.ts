import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { DriverTransactionEntity } from '../entities/driver-transaction.entity';
import { DriverWalletEntity } from '../entities/driver-wallet.entity';
import { DriverEntity } from '../entities/driver.entity';
import { DriverStatus } from '../entities/enums/driver-status.enum';

@Injectable()
export class SharedDriverService {
    constructor(
        @InjectRepository(DriverEntity)
        public driverRepo: Repository<DriverEntity>,
        @InjectRepository(DriverWalletEntity)
        private driverWalletRepo: Repository<DriverWalletEntity>,
        @InjectRepository(DriverTransactionEntity)
        private driverTransactionRepo: Repository<DriverTransactionEntity>
    ) { }

    async updateDriverStatus(driverId: number, status: DriverStatus) {
        return this.driverRepo.update(driverId, { status });
    }

    async getOnlineDriversWithServiceId(driverIds: number[], serviceId: number) {
        const driversWithService = await this.driverRepo.find({
            where: {
                id: In(driverIds),
                status: DriverStatus.Online,
            }, relations: ['enabledServices']
        });
        return driversWithService.filter(x => {
            return x.enabledServices.map(y => y.id).includes(serviceId)
        });
    }

    async rechargeWallet(transaction: Pick<DriverTransactionEntity, 'status' | 'action' | 'rechargeType' | 'deductType' | 'amount' | 'currency' | 'driverId' | 'requestId' | 'operatorId' | 'paymentGatewayId' | 'refrenceNumber' | 'description'>) {
        let wallet = await this.driverWalletRepo.findOne({ driverId: transaction.driverId, currency: transaction.currency });
        if (wallet == null) {
            wallet = await this.driverWalletRepo.save({ balance: transaction.amount, currency: transaction.currency, driverId: transaction.driverId });
        } else {
            await this.driverWalletRepo.update(wallet.id, { balance: transaction.amount + wallet.balance });
            wallet.balance += transaction.amount;
        }
        if(transaction.amount != 0) {
            Logger.log(`Saving transaction ${JSON.stringify(transaction)}`);
            this.driverTransactionRepo.save(transaction);
        }
        return wallet;
    }
}
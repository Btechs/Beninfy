import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FleetTransactionEntity } from "../entities/fleet-transaction.entity";
import { FleetWalletEntity } from "../entities/fleet-wallet.entity";
import { Repository } from "typeorm";

@Injectable()
export class SharedFleetService {
    constructor(
        @InjectRepository(FleetWalletEntity)
        private fleetWalletRepository: Repository<FleetWalletEntity>,
        @InjectRepository(FleetTransactionEntity)
        private fleetTransactionEntity: Repository<FleetTransactionEntity>
    ) {}

    async rechargeWallet(transaction: Pick<FleetTransactionEntity, 'action' | 'rechargeType' | 'deductType' | 'fleetId' | 'amount' | 'currency' | 'requestId' | 'operatorId' | 'refrenceNumber' | 'description'>) {
        let wallet = await this.fleetWalletRepository.findOne({ fleetId: transaction.fleetId, currency: transaction.currency });
        if (wallet == null) {
            wallet = await this.fleetWalletRepository.save({ fleetId: transaction.fleetId, balance: transaction.amount, currency: transaction.currency });
        } else {
            await this.fleetWalletRepository.update(wallet.id, { balance: transaction.amount + wallet.balance });
            wallet.balance += transaction.amount;
        }
        this.fleetTransactionEntity.save(transaction);
        return wallet;
    }

}
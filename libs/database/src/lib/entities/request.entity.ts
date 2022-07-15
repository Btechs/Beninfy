import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Point } from "../interfaces/point";
import { MultipointTransformer } from "../transformers/multipoint.transformer";
import { ComplaintEntity } from "./complaint.entity";
import { CouponEntity } from "./coupon.entity";
import { DriverTransactionEntity } from "./driver-transaction.entity";
import { DriverEntity } from "./driver.entity";
import { OrderStatus } from "./enums/order-status.enum";
import { FeedbackEntity } from "./feedback.entity";
import { FleetTransactionEntity } from "./fleet-transaction.entity";
import { OrderMessageEntity } from "./request-message.entity";
import { PaymentGatewayEntity } from "./payment-gateway.entity";
import { ProviderTransactionEntity } from "./provider-transaction.entity";
import { RiderEntity } from "./rider-entity";
import { RiderTransactionEntity } from "./rider-transaction.entity";
import { ServiceEntity } from "./service.entity";
import { OperatorEntity } from "./operator.entity";

@Entity('request')
export class RequestEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({name: 'requestTimestamp'})
    createdOn!: Date;

    @Column({ nullable: true })
    startTimestamp?: Date;

    @Column({ nullable: true })
    finishTimestamp?: Date;

    @Column('enum', {
        enum: OrderStatus,
        default: OrderStatus.Requested
    })
    status!: OrderStatus;

    @Column('int', { default: 0 })
    distanceBest!: number;

    @Column('int', { default: 0 })
    durationBest!: number;

    @Column()
    expectedTimestamp!: Date;

    @Column({ nullable: true })
    etaPickup?: Date;

    @Column('float', {
        precision: 10,
        scale: 2
    })
    costBest!: number;

    @Column('float', {
        precision: 10,
        scale: 2,
        default: '0.00'
    })
    costAfterCoupon!: number;

    @Column('float', { 
        default: 0,
        precision: 10,
        scale: 2
    })
    paidAmount!: number;

    @Column("float", {
        precision: 10,
        default: 0,
        scale: 2
    })
    providerShare!: number;

    @Column("varchar", {
        transformer: {
            to(value: string[]): string {
                return value.join('|');
            },
            from(value: string): string[] {
                if (value == null)
                    return [];
                return value.split('|');
            }
        },
        length: 500
    })
    addresses!: string[];

    @Column('multipoint', {
        transformer: new MultipointTransformer()
    })
    points!: Point[];

    @ManyToOne(() => DriverEntity, driver => driver.orders)
    driver?: DriverEntity;

    @Column({ nullable: true })
    driverId?: number;

    @ManyToOne(() => RiderEntity, rider => rider.orders)
    rider!: RiderEntity;

    @Column()
    riderId!: number;

    @ManyToOne(() => CouponEntity, coupon => coupon.orders)
    coupon?: CouponEntity;

    @Column({ nullable: true })
    couponId?: number;

    @Column('char', { length: 3 })
    currency!: string;

    @OneToMany(() => OrderMessageEntity, message => message.request)
    conversation!: OrderMessageEntity[];

    @ManyToOne(() => PaymentGatewayEntity, gateway => gateway.orders)
    paymentGateway?: PaymentGatewayEntity;

    @Column({ nullable: true })
    paymentGatewayId?: number;

    @OneToMany(() => ComplaintEntity, complaint => complaint.request)
    complaints!: ComplaintEntity[];

    @ManyToOne(() => ServiceEntity, service => service.requests)
    service!: ServiceEntity;

    @Column()
    serviceId!: number;

    @ManyToOne(() => OperatorEntity, operator => operator.requests, { onDelete: 'CASCADE' })
    operator?: OperatorEntity;

    @Column({nullable: true })
    operatorId?: number;

    @OneToMany(() => RiderTransactionEntity, riderTransaction => riderTransaction.request)
    riderTransactions!: RiderTransactionEntity[];

    @OneToMany(() => FleetTransactionEntity, fleetTransaction => fleetTransaction.request)
    fleetTransactions!: FleetTransactionEntity[];

    @OneToOne(() => FeedbackEntity, feedback => feedback.request)
    @JoinColumn()
    review?: FeedbackEntity;

    @Column({ nullable: true })
    reviewId?: number;

    @OneToMany(() => DriverTransactionEntity, transaction => transaction.request)
    driverTransactions!: DriverTransactionEntity[];

    @OneToMany(() => ProviderTransactionEntity, transaction => transaction.request)
    providerTransactions!: ProviderTransactionEntity[];
}
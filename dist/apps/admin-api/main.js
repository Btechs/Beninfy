/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/admin-api/src/app/accounting/accounting.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountingModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const provider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-transaction.entity.ts");
const provider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-wallet.entity.ts");
const accounting_resolver_1 = __webpack_require__("./apps/admin-api/src/app/accounting/accounting.resolver.ts");
const accounting_service_1 = __webpack_require__("./apps/admin-api/src/app/accounting/accounting.service.ts");
const provider_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/provider-transaction.dto.ts");
const provider_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/provider-wallet.dto.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
let AccountingModule = class AccountingModule {
};
AccountingModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([provider_transaction_entity_1.ProviderTransactionEntity, request_entity_1.RequestEntity]),
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([provider_transaction_entity_1.ProviderTransactionEntity, provider_wallet_entity_1.ProviderWalletEntity])],
                resolvers: [
                    {
                        EntityClass: provider_transaction_entity_1.ProviderTransactionEntity,
                        DTOClass: provider_transaction_dto_1.ProviderTransactionDTO,
                        create: { many: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: provider_wallet_entity_1.ProviderWalletEntity,
                        DTOClass: provider_wallet_dto_1.ProviderWalletDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ],
        providers: [
            accounting_service_1.AccountingService,
            accounting_resolver_1.AccountingResolver
        ]
    })
], AccountingModule);
exports.AccountingModule = AccountingModule;


/***/ }),

/***/ "./apps/admin-api/src/app/accounting/accounting.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountingResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const accounting_service_1 = __webpack_require__("./apps/admin-api/src/app/accounting/accounting.service.ts");
const chart_timeframe_enum_1 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/chart-timeframe.enum.ts");
const income_result_item_dto_1 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/income-result-item.dto.ts");
const request_result_item_dto_1 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/request-result-item.dto.ts");
let AccountingResolver = class AccountingResolver {
    constructor(service) {
        this.service = service;
    }
    incomeChart(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const items = yield this.service.incomeChart(input);
            return { items };
        });
    }
    requestChart(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const items = yield this.service.requestsChart(input);
            return { items };
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => income_result_item_dto_1.IncomeResults),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('timeframe', { type: () => chart_timeframe_enum_1.ChartTimeframe })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountingResolver.prototype, "incomeChart", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => request_result_item_dto_1.RequestsResults),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('timeframe', { type: () => chart_timeframe_enum_1.ChartTimeframe })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AccountingResolver.prototype, "requestChart", null);
AccountingResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, tslib_1.__metadata)("design:paramtypes", [accounting_service_1.AccountingService])
], AccountingResolver);
exports.AccountingResolver = AccountingResolver;


/***/ }),

/***/ "./apps/admin-api/src/app/accounting/accounting.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountingService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const provider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-transaction.entity.ts");
const typeorm_2 = __webpack_require__("typeorm");
const chart_timeframe_enum_1 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/chart-timeframe.enum.ts");
let AccountingService = class AccountingService {
    constructor(providerTransactionRepository) {
        this.providerTransactionRepository = providerTransactionRepository;
    }
    incomeChart(timeframe) {
        const vars = this.getQueryVars(timeframe, 'transactionTime');
        return this.providerTransactionRepository.query(`SELECT currency, SUM(amount) as sum, UNIX_TIMESTAMP(ANY_VALUE(transactionTime)) * 1000 AS time from admin_transaction WHERE ${vars.query} GROUP BY currency, ${vars.groupBy}`);
    }
    requestsChart(timeframe) {
        const vars = this.getQueryVars(timeframe, 'requestTimestamp');
        return this.providerTransactionRepository.query(`SELECT COUNT(id) as count, UNIX_TIMESTAMP(ANY_VALUE(requestTimestamp)) * 1000 AS time from \`request\` WHERE ${vars.query} GROUP BY ${vars.groupBy}`);
    }
    getQueryVars(query, timeField) {
        switch (query) {
            case (chart_timeframe_enum_1.ChartTimeframe.Daily):
                return { groupBy: `DATE(${timeField}),TIME(${timeField})`, query: `${timeField} = CURDATE()` };
            case (chart_timeframe_enum_1.ChartTimeframe.Monthly):
                return { groupBy: `DAYOFYEAR(${timeField}),YEAR(${timeField})`, query: `${timeField} > CURDATE() - INTERVAL 2 MONTH` };
            case (chart_timeframe_enum_1.ChartTimeframe.Weekly):
                return { groupBy: `WEEKOFYEAR(${timeField}),YEAR(${timeField})`, query: `${timeField} > CURDATE() - INTERVAL 6 MONTH` };
            case (chart_timeframe_enum_1.ChartTimeframe.Yearly):
                return { groupBy: `MONTH(${timeField}),YEAR(${timeField})`, query: `${timeField} > CURDATE() - INTERVAL 12 MONTH` };
        }
    }
};
AccountingService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(provider_transaction_entity_1.ProviderTransactionEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository])
], AccountingService);
exports.AccountingService = AccountingService;


/***/ }),

/***/ "./apps/admin-api/src/app/accounting/dto/chart-timeframe.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChartTimeframe = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var ChartTimeframe;
(function (ChartTimeframe) {
    ChartTimeframe["Daily"] = "Daily";
    ChartTimeframe["Weekly"] = "Weekly";
    ChartTimeframe["Monthly"] = "Monthly";
    ChartTimeframe["Yearly"] = "Yearly";
})(ChartTimeframe = exports.ChartTimeframe || (exports.ChartTimeframe = {}));
(0, graphql_1.registerEnumType)(ChartTimeframe, { name: 'ChartTimeframe' });


/***/ }),

/***/ "./apps/admin-api/src/app/accounting/dto/income-result-item.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IncomeResults = exports.IncomeResultItem = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/income-result-item.dto.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let IncomeResultItem = class IncomeResultItem {
    static _GRAPHQL_METADATA_FACTORY() {
        return { time: { type: () => String }, sum: { type: () => Number }, currency: { type: () => String } };
    }
};
IncomeResultItem = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], IncomeResultItem);
exports.IncomeResultItem = IncomeResultItem;
let IncomeResults = class IncomeResults {
    static _GRAPHQL_METADATA_FACTORY() {
        return { items: { type: () => [(__webpack_require__("./apps/admin-api/src/app/accounting/dto/income-result-item.dto.ts").IncomeResultItem)] } };
    }
};
IncomeResults = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], IncomeResults);
exports.IncomeResults = IncomeResults;


/***/ }),

/***/ "./apps/admin-api/src/app/accounting/dto/provider-transaction.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderTransactionDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts");
const eager_import_2 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ProviderTransactionDTO = class ProviderTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, action: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts").TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts").ProviderDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts").ProviderRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, operatorId: { nullable: true, type: () => Number }, requestId: { nullable: true, type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderTransactionDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderTransactionDTO.prototype, "operatorId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderTransactionDTO.prototype, "requestId", void 0);
ProviderTransactionDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('ProviderTransaction')
], ProviderTransactionDTO);
exports.ProviderTransactionDTO = ProviderTransactionDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/accounting/dto/provider-wallet.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderWalletDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ProviderWalletDTO = class ProviderWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderWalletDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.Float),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderWalletDTO.prototype, "balance", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], ProviderWalletDTO.prototype, "currency", void 0);
ProviderWalletDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('ProviderWallet')
], ProviderWalletDTO);
exports.ProviderWalletDTO = ProviderWalletDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/accounting/dto/request-result-item.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestsResults = exports.RequestResultItem = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/request-result-item.dto.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let RequestResultItem = class RequestResultItem {
    static _GRAPHQL_METADATA_FACTORY() {
        return { time: { type: () => String }, count: { type: () => Number } };
    }
};
RequestResultItem = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], RequestResultItem);
exports.RequestResultItem = RequestResultItem;
let RequestsResults = class RequestsResults {
    static _GRAPHQL_METADATA_FACTORY() {
        return { items: { type: () => [(__webpack_require__("./apps/admin-api/src/app/accounting/dto/request-result-item.dto.ts").RequestResultItem)] } };
    }
};
RequestsResults = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], RequestsResults);
exports.RequestsResults = RequestsResults;


/***/ }),

/***/ "./apps/admin-api/src/app/address/address.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const rider_address_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-address.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const address_dto_1 = __webpack_require__("./apps/admin-api/src/app/address/dto/address.dto.ts");
let AddressModule = class AddressModule {
};
AddressModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([rider_address_entity_1.RiderAddressEntity])],
                resolvers: [
                    {
                        EntityClass: rider_address_entity_1.RiderAddressEntity,
                        DTOClass: address_dto_1.AddressDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            }),
        ]
    })
], AddressModule);
exports.AddressModule = AddressModule;


/***/ }),

/***/ "./apps/admin-api/src/app/address/dto/address.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/interfaces/point.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let AddressDTO = class AddressDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, details: { nullable: true, type: () => String }, location: { type: () => (__webpack_require__("./libs/database/src/lib/interfaces/point.ts").Point) } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], AddressDTO.prototype, "id", void 0);
AddressDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Address')
], AddressDTO);
exports.AddressDTO = AddressDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/admin-api.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fastify = __webpack_require__("fastify");
const rest_jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/rest-jwt-auth.guard.ts");
const upload_service_1 = __webpack_require__("./apps/admin-api/src/app/upload/upload.service.ts");
let AppController = class AppController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    upload(req, res) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const upload = yield this.uploadService.uploadMedia(req, res, 'uploads', (new Date().getTime()).toString());
            upload;
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(rest_jwt_auth_guard_1.RestJwtAuthGuard),
    (0, tslib_1.__param)(0, (0, common_1.Req)()),
    (0, tslib_1.__param)(1, (0, common_1.Res)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AppController.prototype, "upload", null);
AppController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__metadata)("design:paramtypes", [upload_service_1.UploadService])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/admin-api/src/app/admin-api.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AdminAPIModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminAPIModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const axios_1 = __webpack_require__("@nestjs/axios");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const database_1 = __webpack_require__("./libs/database/src/index.ts");
const path_1 = __webpack_require__("path");
const accounting_module_1 = __webpack_require__("./apps/admin-api/src/app/accounting/accounting.module.ts");
const address_module_1 = __webpack_require__("./apps/admin-api/src/app/address/address.module.ts");
const admin_api_controller_1 = __webpack_require__("./apps/admin-api/src/app/admin-api.controller.ts");
const announcement_module_1 = __webpack_require__("./apps/admin-api/src/app/announcement/announcement.module.ts");
const car_module_1 = __webpack_require__("./apps/admin-api/src/app/car/car.module.ts");
const coupon_module_1 = __webpack_require__("./apps/admin-api/src/app/coupon/coupon.module.ts");
const driver_module_1 = __webpack_require__("./apps/admin-api/src/app/driver/driver.module.ts");
const feedback_module_1 = __webpack_require__("./apps/admin-api/src/app/feedback/feedback.module.ts");
const fleet_module_1 = __webpack_require__("./apps/admin-api/src/app/fleet/fleet.module.ts");
const operator_module_1 = __webpack_require__("./apps/admin-api/src/app/operator/operator.module.ts");
const order_module_1 = __webpack_require__("./apps/admin-api/src/app/order/order.module.ts");
const payment_gateway_module_1 = __webpack_require__("./apps/admin-api/src/app/payment-gateway/payment-gateway.module.ts");
const region_module_1 = __webpack_require__("./apps/admin-api/src/app/region/region.module.ts");
const rider_module_1 = __webpack_require__("./apps/admin-api/src/app/rider/rider.module.ts");
const service_module_1 = __webpack_require__("./apps/admin-api/src/app/service/service.module.ts");
const auth_module_1 = __webpack_require__("./apps/admin-api/src/app/auth/auth.module.ts");
const upload_module_1 = __webpack_require__("./apps/admin-api/src/app/upload/upload.module.ts");
const complaint_module_1 = __webpack_require__("./apps/admin-api/src/app/complaint/complaint.module.ts");
const fs_1 = __webpack_require__("fs");
const configuration_module_1 = __webpack_require__("./apps/admin-api/src/app/config/configuration.module.ts");
const upload_service_1 = __webpack_require__("./apps/admin-api/src/app/upload/upload.service.ts");
const nestjs_redis_1 = __webpack_require__("@liaoliaots/nestjs-redis");
const jwt_strategy_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt.strategy.ts");
let AdminAPIModule = AdminAPIModule_1 = class AdminAPIModule {
    static register() {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const configAddress = `${process.cwd()}/config/config.${"development"}.json`;
            if ((0, fs_1.existsSync)(configAddress)) {
                const file = yield fs_1.promises.readFile(configAddress, { encoding: 'utf-8' });
                const config = JSON.parse(file);
                const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
                if (config.firebaseProjectPrivateKey != null &&
                    (0, fs_1.existsSync)(firebaseKeyFileAddress)) {
                    return {
                        module: AdminAPIModule_1,
                        imports: [
                            database_1.DatabaseModule,
                            graphql_1.GraphQLModule.forRoot({
                                subscriptions: {
                                    'subscriptions-transport-ws': {
                                        //keepAlive: 5000,
                                        onConnect: (connectionParams) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                                            if (connectionParams.authToken) {
                                                return (0, jwt_strategy_1.validateToken)(connectionParams.authToken);
                                            }
                                            throw new Error('Missing auth token!');
                                        }),
                                        onDisconnect: () => {
                                        },
                                    },
                                },
                                autoSchemaFile: (0, path_1.join)(process.cwd(), 'admin.schema.gql'),
                                cors: false,
                            }),
                            typeorm_1.TypeOrmModule.forFeature(database_1.entities),
                            service_module_1.ServiceModule,
                            operator_module_1.OperatorModule,
                            rider_module_1.RiderModule,
                            driver_module_1.DriverModule,
                            fleet_module_1.FleetModule,
                            order_module_1.OrderModule,
                            announcement_module_1.AnnouncementModule,
                            coupon_module_1.CouponModule,
                            accounting_module_1.AccountingModule,
                            region_module_1.RegionModule,
                            payment_gateway_module_1.PaymentGatewayModule,
                            car_module_1.CarModule,
                            feedback_module_1.FeedbackModule,
                            address_module_1.AddressModule,
                            auth_module_1.AuthModule,
                            upload_module_1.UploadModule,
                            complaint_module_1.ComplaintModule,
                            configuration_module_1.ConfigurationModule,
                            axios_1.HttpModule,
                            nestjs_redis_1.RedisModule.forRoot({
                                closeClient: true,
                                commonOptions: { db: 2 },
                                config: {
                                    host: (_a = process.env.REDIS_HOST) !== null && _a !== void 0 ? _a : 'localhost'
                                },
                            }),
                        ],
                        providers: [upload_service_1.UploadService],
                        controllers: [admin_api_controller_1.AppController],
                    };
                }
            }
            return {
                module: AdminAPIModule_1,
                imports: [
                    axios_1.HttpModule,
                    graphql_1.GraphQLModule.forRoot({
                        autoSchemaFile: true,
                        cors: false,
                        //uploads: false,
                    }),
                    configuration_module_1.ConfigurationModule,
                ],
            };
        });
    }
};
AdminAPIModule = AdminAPIModule_1 = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
    // imports: [
    //   DatabaseModule,
    //   GraphQLModule.forRoot({
    //     installSubscriptionHandlers: true,
    //     autoSchemaFile: join(process.cwd(), 'admin.schema.gql'),
    //     //uploads: false,
    //     cors: false
    //   }),
    //   TypeOrmModule.forFeature(entities),
    //   ServiceModule,
    //   OperatorModule,
    //   RiderModule,
    //   DriverModule,
    //   FleetModule,
    //   OrderModule,
    //   AnnouncementModule,
    //   CouponModule,
    //   AccountingModule,
    //   RegionModule,
    //   PaymentGatewayModule,
    //   CarModule,
    //   FeedbackModule,
    //   AddressModule,
    //   AuthModule,
    //   UploadModule,
    //   ComplaintModule,
    //   ConfigurationModule,
    //   HttpModule
    // ],
    // providers: [],
    // controllers: [AppController]
    })
], AdminAPIModule);
exports.AdminAPIModule = AdminAPIModule;


/***/ }),

/***/ "./apps/admin-api/src/app/announcement/announcement.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const announcement_entity_1 = __webpack_require__("./libs/database/src/lib/entities/announcement.entity.ts");
const announcement_dto_1 = __webpack_require__("./apps/admin-api/src/app/announcement/dto/announcement.dto.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
let AnnouncementModule = class AnnouncementModule {
};
AnnouncementModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([announcement_entity_1.AnnouncementEntity])],
                resolvers: [
                    {
                        EntityClass: announcement_entity_1.AnnouncementEntity,
                        DTOClass: announcement_dto_1.AnnouncementDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ]
    })
], AnnouncementModule);
exports.AnnouncementModule = AnnouncementModule;


/***/ }),

/***/ "./apps/admin-api/src/app/announcement/dto/announcement.authorizer.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementAuthorizer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let AnnouncementAuthorizer = class AnnouncementAuthorizer {
    authorize(context, authorizerContext) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const operator = yield (0, typeorm_1.getRepository)(operator_entity_1.OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });
            if (authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Announcements_View)) {
                throw new common_1.UnauthorizedException();
            }
            if (!authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Announcements_Edit)) {
                throw new common_1.UnauthorizedException();
            }
            return undefined;
        });
    }
};
AnnouncementAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], AnnouncementAuthorizer);
exports.AnnouncementAuthorizer = AnnouncementAuthorizer;


/***/ }),

/***/ "./apps/admin-api/src/app/announcement/dto/announcement.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const announcement_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/announcement/dto/announcement.authorizer.ts");
let AnnouncementDTO = class AnnouncementDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, description: { type: () => String }, startAt: { type: () => Date }, expireAt: { type: () => Date } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], AnnouncementDTO.prototype, "id", void 0);
AnnouncementDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Announcement'),
    (0, query_graphql_1.Authorize)(announcement_authorizer_1.AnnouncementAuthorizer)
], AnnouncementDTO);
exports.AnnouncementDTO = AnnouncementDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const operator_module_1 = __webpack_require__("./apps/admin-api/src/app/operator/operator.module.ts");
const auth_resolver_1 = __webpack_require__("./apps/admin-api/src/app/auth/auth.resolver.ts");
const auth_service_1 = __webpack_require__("./apps/admin-api/src/app/auth/auth.service.ts");
const jwt_strategy_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt.strategy.ts");
let AuthModule = class AuthModule {
};
AuthModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            operator_module_1.OperatorModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'secret'
            })
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            auth_service_1.AuthService,
            auth_resolver_1.AuthResolver
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/admin-api/src/app/auth/auth.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const operator_dto_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.dto.ts");
const auth_service_1 = __webpack_require__("./apps/admin-api/src/app/auth/auth.service.ts");
const token_dto_1 = __webpack_require__("./apps/admin-api/src/app/auth/dto/token.dto.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
let AuthResolver = class AuthResolver {
    constructor(authService, context) {
        this.authService = authService;
        this.context = context;
    }
    //@UseGuards(LocalAdminAuthGuard)
    login(userName, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const token = yield this.authService.loginAdmin({ userName, password });
            return {
                token
            };
        });
    }
    me() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.authService.getAdmin(this.context.req.user.id);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => token_dto_1.TokenObject),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('userName', { type: () => String })),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)('password', { type: () => String })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => operator_dto_1.OperatorDTO),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
AuthResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, tslib_1.__param)(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    (0, tslib_1.__metadata)("design:paramtypes", [auth_service_1.AuthService, Object])
], AuthResolver);
exports.AuthResolver = AuthResolver;


/***/ }),

/***/ "./apps/admin-api/src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const apollo_server_fastify_1 = __webpack_require__("apollo-server-fastify");
const operator_service_1 = __webpack_require__("./apps/admin-api/src/app/operator/operator.service.ts");
let AuthService = class AuthService {
    constructor(jwtService, adminService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
    }
    getAdmin(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.adminService.getById(id);
        });
    }
    loginAdmin(args) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const admin = yield this.adminService.validateCredentials(args.userName, args.password);
            if (admin == null) {
                throw new apollo_server_fastify_1.ForbiddenError('Invalid Credentials');
            }
            return this.jwtService.sign({ id: admin.id });
        });
    }
};
AuthService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [jwt_1.JwtService, operator_service_1.OperatorService])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/admin-api/src/app/auth/dto/token.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenObject = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let TokenObject = class TokenObject {
    static _GRAPHQL_METADATA_FACTORY() {
        return { token: { type: () => String } };
    }
};
TokenObject = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], TokenObject);
exports.TokenObject = TokenObject;


/***/ }),

/***/ "./apps/admin-api/src/app/auth/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const apollo_server_fastify_1 = __webpack_require__("apollo-server-fastify");
const passport_1 = __webpack_require__("@nestjs/passport");
const execution_context_host_1 = __webpack_require__("@nestjs/core/helpers/execution-context-host");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        return super.canActivate(new execution_context_host_1.ExecutionContextHost([req]));
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new apollo_server_fastify_1.AuthenticationError('GqlAuthGuard');
        }
        return user;
    }
};
JwtAuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./apps/admin-api/src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateToken = exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_decode_1 = __webpack_require__("jwt-decode");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret'
        });
    }
    validate(payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return payload;
        });
    }
};
JwtStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
function validateToken(token) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const res = (0, jwt_decode_1.default)(token);
        return {
            id: res.id
        };
    });
}
exports.validateToken = validateToken;


/***/ }),

/***/ "./apps/admin-api/src/app/auth/rest-jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestJwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let RestJwtAuthGuard = class RestJwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('REST API Auth blocked reqeust.');
        }
        return user;
    }
};
RestJwtAuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], RestJwtAuthGuard);
exports.RestJwtAuthGuard = RestJwtAuthGuard;


/***/ }),

/***/ "./apps/admin-api/src/app/car/car.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const car_color_entity_1 = __webpack_require__("./libs/database/src/lib/entities/car-color.entity.ts");
const car_model_entity_1 = __webpack_require__("./libs/database/src/lib/entities/car-model.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const car_color_dto_1 = __webpack_require__("./apps/admin-api/src/app/car/dto/car-color.dto.ts");
const car_model_dto_1 = __webpack_require__("./apps/admin-api/src/app/car/dto/car-model.dto.ts");
let CarModule = class CarModule {
};
CarModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([car_color_entity_1.CarColorEntity, car_model_entity_1.CarModelEntity])],
                resolvers: [
                    {
                        EntityClass: car_model_entity_1.CarModelEntity,
                        DTOClass: car_model_dto_1.CarModelDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: car_color_entity_1.CarColorEntity,
                        DTOClass: car_color_dto_1.CarColorDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ]
    })
], CarModule);
exports.CarModule = CarModule;


/***/ }),

/***/ "./apps/admin-api/src/app/car/dto/car-color.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const car_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/car/dto/car.authorizer.ts");
let CarColorDTO = class CarColorDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], CarColorDTO.prototype, "id", void 0);
CarColorDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('CarColor'),
    (0, query_graphql_1.Authorize)(car_authorizer_1.CarAuthorizer)
], CarColorDTO);
exports.CarColorDTO = CarColorDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/car/dto/car-model.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const car_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/car/dto/car.authorizer.ts");
let CarModelDTO = class CarModelDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], CarModelDTO.prototype, "id", void 0);
CarModelDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('CarModel'),
    (0, query_graphql_1.Authorize)(car_authorizer_1.CarAuthorizer)
], CarModelDTO);
exports.CarModelDTO = CarModelDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/car/dto/car.authorizer.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarAuthorizer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let CarAuthorizer = class CarAuthorizer {
    authorize(context, authorizerContext) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const operator = yield (0, typeorm_1.getRepository)(operator_entity_1.OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });
            if (authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Cars_View)) {
                throw new common_1.UnauthorizedException();
            }
            if (!authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Cars_Edit)) {
                throw new common_1.UnauthorizedException();
            }
            return undefined;
        });
    }
};
CarAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], CarAuthorizer);
exports.CarAuthorizer = CarAuthorizer;


/***/ }),

/***/ "./apps/admin-api/src/app/complaint/complaint.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const complaint_activity_entity_1 = __webpack_require__("./libs/database/src/lib/entities/complaint-activity.entity.ts");
const complaint_entity_1 = __webpack_require__("./libs/database/src/lib/entities/complaint.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const complaint_activity_dto_1 = __webpack_require__("./apps/admin-api/src/app/complaint/dto/complaint-activity.dto.ts");
const complaint_dto_1 = __webpack_require__("./apps/admin-api/src/app/complaint/dto/complaint.dto.ts");
let ComplaintModule = class ComplaintModule {
};
ComplaintModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([complaint_entity_1.ComplaintEntity, complaint_activity_entity_1.ComplaintActivityEntity])],
                resolvers: [
                    {
                        EntityClass: complaint_entity_1.ComplaintEntity,
                        DTOClass: complaint_dto_1.ComplaintDTO,
                        create: { disabled: true },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        enableAggregate: true,
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: complaint_activity_entity_1.ComplaintActivityEntity,
                        DTOClass: complaint_activity_dto_1.ComplaintActivityDTO,
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE,
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })]
    })
], ComplaintModule);
exports.ComplaintModule = ComplaintModule;


/***/ }),

/***/ "./apps/admin-api/src/app/complaint/dto/complaint-activity.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/complaint-activity-type.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const operator_dto_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.dto.ts");
let ComplaintActivityDTO = class ComplaintActivityDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, type: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/complaint-activity-type.enum.ts").ComplaintActivityType) }, comment: { nullable: true, type: () => String }, complaintId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintActivityDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintActivityDTO.prototype, "complaintId", void 0);
ComplaintActivityDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('ComplaintActivity'),
    (0, query_graphql_1.Relation)('actor', () => operator_dto_1.OperatorDTO),
    (0, query_graphql_1.Relation)('assignedTo', () => operator_dto_1.OperatorDTO, { nullable: true })
], ComplaintActivityDTO);
exports.ComplaintActivityDTO = ComplaintActivityDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/complaint/dto/complaint.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/complaint-status.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const complaint_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/complaint-status.enum.ts");
const order_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/order.dto.ts");
const complaint_activity_dto_1 = __webpack_require__("./apps/admin-api/src/app/complaint/dto/complaint-activity.dto.ts");
let ComplaintDTO = class ComplaintDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, inscriptionTimestamp: { type: () => Date }, requestedByDriver: { type: () => Boolean }, subject: { type: () => String }, content: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/complaint-status.enum.ts").ComplaintStatus) }, requestId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => complaint_status_enum_1.ComplaintStatus),
    (0, tslib_1.__metadata)("design:type", String)
], ComplaintDTO.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintDTO.prototype, "requestId", void 0);
ComplaintDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Complaint'),
    (0, query_graphql_1.UnPagedRelation)('activities', () => complaint_activity_dto_1.ComplaintActivityDTO, { pagingStrategy: query_graphql_1.PagingStrategies.NONE }),
    (0, query_graphql_1.Relation)('order', () => order_dto_1.OrderDTO)
], ComplaintDTO);
exports.ComplaintDTO = ComplaintDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/config/config.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateConfigResult = exports.UpdateConfigStatus = exports.UpdatePurchaseCodeResult = exports.UpdatePurchaseCodeStatus = exports.UploadResult = exports.CurrentConfiguration = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./apps/admin-api/src/app/config/config.dto.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CurrentConfiguration = class CurrentConfiguration {
    static _GRAPHQL_METADATA_FACTORY() {
        return { purchaseCode: { nullable: true, type: () => String }, backendMapsAPIKey: { nullable: true, type: () => String }, adminPanelAPIKey: { nullable: true, type: () => String }, firebaseProjectPrivateKey: { nullable: true, type: () => String } };
    }
};
CurrentConfiguration = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], CurrentConfiguration);
exports.CurrentConfiguration = CurrentConfiguration;
let UploadResult = class UploadResult {
    static _GRAPHQL_METADATA_FACTORY() {
        return { url: { type: () => String } };
    }
};
UploadResult = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], UploadResult);
exports.UploadResult = UploadResult;
var UpdatePurchaseCodeStatus;
(function (UpdatePurchaseCodeStatus) {
    UpdatePurchaseCodeStatus["OK"] = "OK";
    UpdatePurchaseCodeStatus["INVALID"] = "INVALID";
    UpdatePurchaseCodeStatus["OVERUSED"] = "OVERUSED";
    UpdatePurchaseCodeStatus["CLIENT_FOUND"] = "CLIENT_FOUND";
})(UpdatePurchaseCodeStatus = exports.UpdatePurchaseCodeStatus || (exports.UpdatePurchaseCodeStatus = {}));
(0, graphql_1.registerEnumType)(UpdatePurchaseCodeStatus, { name: 'UpdatePurchaseCodeStatus' });
let UpdatePurchaseCodeResult = class UpdatePurchaseCodeResult {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { type: () => (__webpack_require__("./apps/admin-api/src/app/config/config.dto.ts").UpdatePurchaseCodeStatus) }, clients: { nullable: true, type: () => [String] } };
    }
};
UpdatePurchaseCodeResult = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], UpdatePurchaseCodeResult);
exports.UpdatePurchaseCodeResult = UpdatePurchaseCodeResult;
var UpdateConfigStatus;
(function (UpdateConfigStatus) {
    UpdateConfigStatus["OK"] = "OK";
    UpdateConfigStatus["INVALID"] = "INVALID";
})(UpdateConfigStatus = exports.UpdateConfigStatus || (exports.UpdateConfigStatus = {}));
(0, graphql_1.registerEnumType)(UpdateConfigStatus, { name: 'UpdateConfigStatus' });
let UpdateConfigResult = class UpdateConfigResult {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { type: () => (__webpack_require__("./apps/admin-api/src/app/config/config.dto.ts").UpdateConfigStatus) }, message: { nullable: true, type: () => String } };
    }
};
UpdateConfigResult = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], UpdateConfigResult);
exports.UpdateConfigResult = UpdateConfigResult;


/***/ }),

/***/ "./apps/admin-api/src/app/config/configuration.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fastify = __webpack_require__("fastify");
const configuration_service_1 = __webpack_require__("./apps/admin-api/src/app/config/configuration.service.ts");
let ConfigurationController = class ConfigurationController {
    constructor(configurationService) {
        this.configurationService = configurationService;
    }
    upload(req, res) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.configurationService.uploadFile(req, res, 'config');
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)('upload'),
    (0, tslib_1.__param)(0, (0, common_1.Req)()),
    (0, tslib_1.__param)(1, (0, common_1.Res)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConfigurationController.prototype, "upload", null);
ConfigurationController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('config'),
    (0, tslib_1.__metadata)("design:paramtypes", [configuration_service_1.ConfigurationService])
], ConfigurationController);
exports.ConfigurationController = ConfigurationController;


/***/ }),

/***/ "./apps/admin-api/src/app/config/configuration.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const axios_1 = __webpack_require__("@nestjs/axios");
const common_1 = __webpack_require__("@nestjs/common");
const configuration_controller_1 = __webpack_require__("./apps/admin-api/src/app/config/configuration.controller.ts");
const configuration_resolver_1 = __webpack_require__("./apps/admin-api/src/app/config/configuration.resolver.ts");
const configuration_service_1 = __webpack_require__("./apps/admin-api/src/app/config/configuration.service.ts");
let ConfigurationModule = class ConfigurationModule {
};
ConfigurationModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
        ],
        providers: [
            configuration_service_1.ConfigurationService,
            configuration_resolver_1.ConfigurationResolver
        ],
        controllers: [
            configuration_controller_1.ConfigurationController
        ]
    })
], ConfigurationModule);
exports.ConfigurationModule = ConfigurationModule;


/***/ }),

/***/ "./apps/admin-api/src/app/config/configuration.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const apollo_server_fastify_1 = __webpack_require__("apollo-server-fastify");
const config_dto_1 = __webpack_require__("./apps/admin-api/src/app/config/config.dto.ts");
const configuration_service_1 = __webpack_require__("./apps/admin-api/src/app/config/configuration.service.ts");
//import { GraphQLUpload } from "apollo-server-fastify";
let ConfigurationResolver = class ConfigurationResolver {
    constructor(configurationService) {
        this.configurationService = configurationService;
    }
    // @Mutation(() => UploadResult)
    // async uploads(@Args('input', { type: () => GraphQLUpload }) {createReadStream,filename}): Promise<{url: string}> {
    //     return {url: filename};
    // }
    currentConfiguration() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const currentConfig = this.configurationService.getConfiguration();
            if (currentConfig == null) {
                throw new apollo_server_fastify_1.ForbiddenError('Already Configured');
            }
            return currentConfig;
        });
    }
    updatePurchaseCode(purchaseCode) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.configurationService.updatePurchaseCode(purchaseCode);
        });
    }
    updateMapsAPIKey(backend, adminPanel) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.configurationService.updateMapsAPIKey(backend, adminPanel);
        });
    }
    updateFirebase(keyFileName) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.configurationService.updateFirebase(keyFileName);
        });
    }
    disablePreviousServer(ip) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.configurationService.disablePreviousServer(ip);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => config_dto_1.CurrentConfiguration),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConfigurationResolver.prototype, "currentConfiguration", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => config_dto_1.UpdatePurchaseCodeResult),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('purchaseCode', { type: () => String })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConfigurationResolver.prototype, "updatePurchaseCode", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => config_dto_1.UpdateConfigResult),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('backend', { type: () => String })),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)('adminPanel', { type: () => String })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConfigurationResolver.prototype, "updateMapsAPIKey", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => config_dto_1.UpdateConfigResult),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('keyFileName', { type: () => String })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConfigurationResolver.prototype, "updateFirebase", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => config_dto_1.UpdateConfigResult),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('ip', { type: () => String })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ConfigurationResolver.prototype, "disablePreviousServer", null);
ConfigurationResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, tslib_1.__metadata)("design:paramtypes", [configuration_service_1.ConfigurationService])
], ConfigurationResolver);
exports.ConfigurationResolver = ConfigurationResolver;


/***/ }),

/***/ "./apps/admin-api/src/app/config/configuration.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const axios_1 = __webpack_require__("@nestjs/axios");
const common_1 = __webpack_require__("@nestjs/common");
const rxjs_1 = __webpack_require__("rxjs");
const config_dto_1 = __webpack_require__("./apps/admin-api/src/app/config/config.dto.ts");
const fs = __webpack_require__("fs");
const util = __webpack_require__("util");
const path_1 = __webpack_require__("path");
const stream_1 = __webpack_require__("stream");
const pump = util.promisify(stream_1.pipeline);
let ConfigurationService = class ConfigurationService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getConfiguration() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const configAddress = `${process.cwd()}/config/config.${"development"}.json`;
            if (fs.existsSync(configAddress)) {
                const file = yield fs.promises.readFile(configAddress, { encoding: 'utf-8' });
                const config = JSON.parse(file);
                const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
                if (config.firebaseProjectPrivateKey != null &&
                    fs.existsSync(firebaseKeyFileAddress)) {
                    return {
                        adminPanelAPIKey: config.adminPanelAPIKey,
                        backendMapsAPIKey: 'RESTRICTED',
                        purchaseCode: 'RESTRICTED',
                        firebaseProjectPrivateKey: 'RESTRICTED'
                    };
                }
                return config;
            }
            else {
                return new config_dto_1.CurrentConfiguration();
            }
        });
    }
    saveConfiguration(newConfig) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const config = yield this.getConfiguration();
            const finalConfig = Object.assign(config, newConfig);
            const str = JSON.stringify(finalConfig);
            yield fs.promises.mkdir(`${process.cwd()}/config`, { recursive: true });
            yield fs.promises.writeFile(`${process.cwd()}/config/config.${"development"}.json`, str);
            return true;
        });
    }
    updatePurchaseCode(code) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const result = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://buildwithsam.org/server_api/license_check/activate_bws_taxi.php?purchaseCode=${code}&port=${process.env.MAIN_PORT}`));
            if (result.data.status == 'OK') {
                yield this.saveConfiguration({ purchaseCode: code });
                return {
                    status: config_dto_1.UpdatePurchaseCodeStatus.OK
                };
            }
            else if (result.data.status == 'USED') {
                return {
                    status: config_dto_1.UpdatePurchaseCodeStatus.CLIENT_FOUND,
                    clients: result.data.clients
                };
            }
            else {
                return {
                    status: config_dto_1.UpdatePurchaseCodeStatus.INVALID
                };
            }
        });
    }
    updateMapsAPIKey(backend, adminPanel) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.saveConfiguration({ backendMapsAPIKey: backend, adminPanelAPIKey: adminPanel });
            return {
                status: config_dto_1.UpdateConfigStatus.OK
            };
        });
    }
    updateFirebase(keyFileName) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.saveConfiguration({ firebaseProjectPrivateKey: keyFileName });
            return {
                status: config_dto_1.UpdateConfigStatus.OK
            };
        });
    }
    disablePreviousServer(ip) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const result = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(`http://buildwithsam.org/server_api/license_check/disable_one.php?ip=${ip}`));
            if (result.data.status == 'OK') {
                return { status: config_dto_1.UpdateConfigStatus.OK };
            }
            else {
                return { status: config_dto_1.UpdateConfigStatus.INVALID };
            }
        });
    }
    uploadFile(req, res, dir, fileNamePrefix) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            // Check request is multipart
            if (!req.isMultipart()) {
                res.send(new common_1.BadRequestException());
                return;
            }
            let _fileName = '';
            const data = yield req.file();
            yield fs.promises.mkdir(dir, { recursive: true });
            _fileName = (0, path_1.join)(dir, fileNamePrefix != null ? `${fileNamePrefix}-${data.filename}` : data.filename);
            yield pump(data.file, fs.createWriteStream(_fileName));
            res.code(200).send({ address: _fileName });
        });
    }
};
ConfigurationService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [axios_1.HttpService])
], ConfigurationService);
exports.ConfigurationService = ConfigurationService;


/***/ }),

/***/ "./apps/admin-api/src/app/coupon/coupon.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const coupon_entity_1 = __webpack_require__("./libs/database/src/lib/entities/coupon.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const coupon_dto_1 = __webpack_require__("./apps/admin-api/src/app/coupon/dto/coupon.dto.ts");
let CouponModule = class CouponModule {
};
CouponModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([coupon_entity_1.CouponEntity])],
                resolvers: [
                    {
                        EntityClass: coupon_entity_1.CouponEntity,
                        DTOClass: coupon_dto_1.CouponDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ]
    })
], CouponModule);
exports.CouponModule = CouponModule;


/***/ }),

/***/ "./apps/admin-api/src/app/coupon/dto/coupon.authorizer.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponAuthorizer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let CouponAuthorizer = class CouponAuthorizer {
    authorize(context, authorizerContext) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const operator = yield (0, typeorm_1.getRepository)(operator_entity_1.OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });
            if (authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Coupons_View)) {
                throw new common_1.UnauthorizedException();
            }
            if (!authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Coupons_Edit)) {
                throw new common_1.UnauthorizedException();
            }
            return undefined;
        });
    }
};
CouponAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], CouponAuthorizer);
exports.CouponAuthorizer = CouponAuthorizer;


/***/ }),

/***/ "./apps/admin-api/src/app/coupon/dto/coupon.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const service_dto_1 = __webpack_require__("./apps/admin-api/src/app/service/dto/service.dto.ts");
const coupon_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/coupon/dto/coupon.authorizer.ts");
let CouponDTO = class CouponDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, code: { type: () => String }, title: { type: () => String }, description: { type: () => String }, manyUsersCanUse: { type: () => Number }, manyTimesUserCanUse: { type: () => Number }, minimumCost: { type: () => Number }, maximumCost: { type: () => Number }, startAt: { type: () => Date }, expireAt: { type: () => Date }, discountPercent: { type: () => Number }, discountFlat: { type: () => Number }, creditGift: { type: () => Number }, isEnabled: { type: () => Boolean }, isFirstTravelOnly: { type: () => Boolean } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponDTO.prototype, "manyUsersCanUse", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponDTO.prototype, "manyTimesUserCanUse", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponDTO.prototype, "discountPercent", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponDTO.prototype, "discountFlat", void 0);
CouponDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Coupon'),
    (0, query_graphql_1.UnPagedRelation)('allowedServices', () => service_dto_1.ServiceDTO),
    (0, query_graphql_1.Authorize)(coupon_authorizer_1.CouponAuthorizer)
], CouponDTO);
exports.CouponDTO = CouponDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/driver.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const driver_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-transaction.entity.ts");
const driver_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-wallet.entity.ts");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const shared_driver_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-driver.service.ts");
const redis_helper_module_1 = __webpack_require__("./libs/database/src/lib/redis/redis-helper.module.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const driver_resolver_1 = __webpack_require__("./apps/admin-api/src/app/driver/driver.resolver.ts");
const driver_service_1 = __webpack_require__("./apps/admin-api/src/app/driver/driver.service.ts");
const driver_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver-transaction.dto.ts");
const driver_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver-wallet.dto.ts");
const driver_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver.dto.ts");
const driver_input_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver.input.ts");
let DriverModule = class DriverModule {
};
DriverModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            redis_helper_module_1.RedisHelpersModule,
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([driver_entity_1.DriverEntity, driver_transaction_entity_1.DriverTransactionEntity, driver_wallet_entity_1.DriverWalletEntity])],
                resolvers: [
                    {
                        EntityClass: driver_entity_1.DriverEntity,
                        DTOClass: driver_dto_1.DriverDTO,
                        UpdateDTOClass: driver_input_1.UpdateDriverInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        enableAggregate: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: driver_wallet_entity_1.DriverWalletEntity,
                        DTOClass: driver_wallet_dto_1.DriverWalletDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: driver_transaction_entity_1.DriverTransactionEntity,
                        DTOClass: driver_transaction_dto_1.DriverTransactionDTO,
                        create: { many: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ],
        providers: [driver_resolver_1.DriverResolver, driver_service_1.DriverService, shared_driver_service_1.SharedDriverService]
    })
], DriverModule);
exports.DriverModule = DriverModule;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/driver.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const transaction_action_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const transaction_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-status.enum.ts");
const shared_driver_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-driver.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const driver_service_1 = __webpack_require__("./apps/admin-api/src/app/driver/driver.service.ts");
const driver_location_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver-location.dto.ts");
const driver_transaction_input_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver-transaction.input.ts");
const driver_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver-wallet.dto.ts");
let DriverResolver = class DriverResolver {
    constructor(driverService, sharedDriverService, context) {
        this.driverService = driverService;
        this.sharedDriverService = sharedDriverService;
        this.context = context;
    }
    getDriversLocation() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.driverService.getDriversLocation();
        });
    }
    createDriverTransaction(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            input.amount = input.action == transaction_action_enum_1.TransactionAction.Recharge ? Math.abs(input.amount) : Math.abs(input.amount) * -1;
            return this.sharedDriverService.rechargeWallet(Object.assign(Object.assign({}, input), { operatorId: this.context.req.user.id, status: transaction_status_enum_1.TransactionStatus.Done }));
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [driver_location_dto_1.OnlineDriver]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DriverResolver.prototype, "getDriversLocation", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => driver_wallet_dto_1.DriverWalletDTO),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => driver_transaction_input_1.DriverTransactionInput })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [driver_transaction_input_1.DriverTransactionInput]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DriverResolver.prototype, "createDriverTransaction", null);
DriverResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, tslib_1.__param)(2, (0, common_1.Inject)(graphql_1.CONTEXT)),
    (0, tslib_1.__metadata)("design:paramtypes", [driver_service_1.DriverService,
        shared_driver_service_1.SharedDriverService, Object])
], DriverResolver);
exports.DriverResolver = DriverResolver;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/driver.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const driver_redis_service_1 = __webpack_require__("./libs/database/src/lib/redis/driver-redis.service.ts");
let DriverService = class DriverService {
    constructor(driverRedisService) {
        this.driverRedisService = driverRedisService;
    }
    getDriversLocation() {
        return this.driverRedisService.getAllOnline();
    }
};
DriverService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [driver_redis_service_1.DriverRedisService])
], DriverService);
exports.DriverService = DriverService;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/dto/driver-location.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnlineDriver = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/interfaces/point.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let OnlineDriver = class OnlineDriver {
    static _GRAPHQL_METADATA_FACTORY() {
        return { location: { type: () => (__webpack_require__("./libs/database/src/lib/interfaces/point.ts").Point) }, driverId: { type: () => Number }, lastUpdatedAt: { type: () => Number } };
    }
};
OnlineDriver = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], OnlineDriver);
exports.OnlineDriver = OnlineDriver;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/dto/driver-transaction.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-status.enum.ts");
const eager_import_2 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-deduct-transaction-type.enum.ts");
const eager_import_3 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-recharge-transaction-type.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const operator_dto_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.dto.ts");
let DriverTransactionDTO = class DriverTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { createdAt: { type: () => Date }, action: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts").TransactionAction) }, status: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-status.enum.ts").TransactionStatus) }, deductType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/driver-deduct-transaction-type.enum.ts").DriverDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/driver-recharge-transaction-type.enum.ts").DriverRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, driverId: { type: () => Number }, paymentGatewayId: { nullable: true, type: () => Number }, operatorId: { nullable: true, type: () => Number }, requestId: { nullable: true, type: () => Number }, description: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", Date)
], DriverTransactionDTO.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionDTO.prototype, "driverId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionDTO.prototype, "operatorId", void 0);
DriverTransactionDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('DriverTransaction'),
    (0, query_graphql_1.Relation)('operator', () => operator_dto_1.OperatorDTO, { nullable: true })
], DriverTransactionDTO);
exports.DriverTransactionDTO = DriverTransactionDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/dto/driver-transaction.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-deduct-transaction-type.enum.ts");
const eager_import_2 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-recharge-transaction-type.enum.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let DriverTransactionInput = class DriverTransactionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { action: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts").TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/driver-deduct-transaction-type.enum.ts").DriverDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/driver-recharge-transaction-type.enum.ts").DriverRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, driverId: { type: () => Number }, description: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionInput.prototype, "driverId", void 0);
DriverTransactionInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], DriverTransactionInput);
exports.DriverTransactionInput = DriverTransactionInput;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/dto/driver-wallet.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverWalletDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const driver_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver.dto.ts");
let DriverWalletDTO = class DriverWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String }, driverId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverWalletDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.Float),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverWalletDTO.prototype, "balance", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], DriverWalletDTO.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverWalletDTO.prototype, "driverId", void 0);
DriverWalletDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('DriverWallet'),
    (0, query_graphql_1.Relation)('driver', () => driver_dto_1.DriverDTO)
], DriverWalletDTO);
exports.DriverWalletDTO = DriverWalletDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/dto/driver.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-status.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const driver_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-status.enum.ts");
const feedback_dto_1 = __webpack_require__("./apps/admin-api/src/app/feedback/dto/feedback.dto.ts");
const number_masker_middleware_1 = __webpack_require__("./apps/admin-api/src/app/number.masker.middleware.ts");
const order_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/order.dto.ts");
const service_dto_1 = __webpack_require__("./apps/admin-api/src/app/service/dto/service.dto.ts");
const media_dto_1 = __webpack_require__("./apps/admin-api/src/app/upload/media.dto.ts");
const driver_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver-transaction.dto.ts");
const driver_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver-wallet.dto.ts");
let DriverDTO = class DriverDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, fleetId: { nullable: true, type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String }, certificateNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, carProductionYear: { nullable: true, type: () => Number }, carId: { nullable: true, type: () => Number }, carColorId: { nullable: true, type: () => Number }, carPlate: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/driver-status.enum.ts").DriverStatus) }, gender: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts").Gender) }, rating: { nullable: true, type: () => Number }, reviewCount: { type: () => Number }, registrationTimestamp: { type: () => Date }, lastSeenTimestamp: { nullable: true, type: () => Date }, accountNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, bankRoutingNumber: { nullable: true, type: () => String }, bankSwift: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, softRejectionNote: { nullable: true, type: () => String }, documents: { nullable: true, type: () => [String] }, mediaId: { nullable: true, type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "fleetId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], DriverDTO.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => String, { middleware: [number_masker_middleware_1.numberMasker] }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverDTO.prototype, "mobileNumber", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "carProductionYear", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "carId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "carColorId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => driver_status_enum_1.DriverStatus),
    (0, tslib_1.__metadata)("design:type", String)
], DriverDTO.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "mediaId", void 0);
DriverDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Driver'),
    (0, query_graphql_1.OffsetConnection)('feedbacks', () => feedback_dto_1.FeedbackDTO),
    (0, query_graphql_1.UnPagedRelation)('wallet', () => driver_wallet_dto_1.DriverWalletDTO, { relationName: 'wallet' }),
    (0, query_graphql_1.UnPagedRelation)('enabledServices', () => service_dto_1.ServiceDTO),
    (0, query_graphql_1.OffsetConnection)('transactions', () => driver_transaction_dto_1.DriverTransactionDTO),
    (0, query_graphql_1.OffsetConnection)('orders', () => order_dto_1.OrderDTO),
    (0, query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true })
], DriverDTO);
exports.DriverDTO = DriverDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/driver/dto/driver.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDriverInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-status.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const driver_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-status.enum.ts");
let UpdateDriverInput = class UpdateDriverInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { fleetId: { nullable: true, type: () => Number }, carId: { nullable: true, type: () => Number }, carColorId: { nullable: true, type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, certificateNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, carProductionYear: { nullable: true, type: () => Number }, carPlate: { nullable: true, type: () => String }, status: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/driver-status.enum.ts").DriverStatus) }, gender: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts").Gender) }, accountNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, bankRoutingNumber: { nullable: true, type: () => String }, bankSwift: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, softRejectionNote: { nullable: true, type: () => String }, mediaId: { nullable: true, type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateDriverInput.prototype, "fleetId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateDriverInput.prototype, "carId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateDriverInput.prototype, "carColorId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateDriverInput.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => driver_status_enum_1.DriverStatus),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateDriverInput.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateDriverInput.prototype, "mediaId", void 0);
UpdateDriverInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateDriverInput);
exports.UpdateDriverInput = UpdateDriverInput;


/***/ }),

/***/ "./apps/admin-api/src/app/feedback/dto/feedback-parameter.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let FeedbackParameterDTO = class FeedbackParameterDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, isGood: { type: () => Boolean } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackParameterDTO.prototype, "id", void 0);
FeedbackParameterDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('FeedbackParameter')
], FeedbackParameterDTO);
exports.FeedbackParameterDTO = FeedbackParameterDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/feedback/dto/feedback.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const feedback_parameter_dto_1 = __webpack_require__("./apps/admin-api/src/app/feedback/dto/feedback-parameter.dto.ts");
let FeedbackDTO = class FeedbackDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, score: { type: () => Number }, reviewTimestamp: { type: () => Date }, description: { nullable: true, type: () => String }, driverId: { type: () => Number }, requestId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackDTO.prototype, "score", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackDTO.prototype, "driverId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackDTO.prototype, "requestId", void 0);
FeedbackDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Feedback'),
    (0, query_graphql_1.UnPagedRelation)('parameters', () => feedback_parameter_dto_1.FeedbackParameterDTO)
], FeedbackDTO);
exports.FeedbackDTO = FeedbackDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/feedback/feedback.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const feedback_parameter_entity_1 = __webpack_require__("./libs/database/src/lib/entities/feedback-parameter.entity.ts");
const feedback_entity_1 = __webpack_require__("./libs/database/src/lib/entities/feedback.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const feedback_parameter_dto_1 = __webpack_require__("./apps/admin-api/src/app/feedback/dto/feedback-parameter.dto.ts");
const feedback_dto_1 = __webpack_require__("./apps/admin-api/src/app/feedback/dto/feedback.dto.ts");
let FeedbackModule = class FeedbackModule {
};
FeedbackModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([feedback_entity_1.FeedbackEntity, feedback_parameter_entity_1.FeedbackParameterEntity])],
                resolvers: [
                    {
                        EntityClass: feedback_entity_1.FeedbackEntity,
                        DTOClass: feedback_dto_1.FeedbackDTO,
                        create: { disabled: true },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: feedback_parameter_entity_1.FeedbackParameterEntity,
                        DTOClass: feedback_parameter_dto_1.FeedbackParameterDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ]
    })
], FeedbackModule);
exports.FeedbackModule = FeedbackModule;


/***/ }),

/***/ "./apps/admin-api/src/app/fleet/dto/fleet-transaction.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetTransactionDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts");
const eager_import_2 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const operator_dto_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.dto.ts");
let FleetTransactionDTO = class FleetTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, transactionTimestamp: { type: () => Date }, action: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts").TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts").ProviderDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts").ProviderRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, operatorId: { nullable: true, type: () => Number }, requestId: { nullable: true, type: () => Number }, fleetId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionDTO.prototype, "operatorId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionDTO.prototype, "requestId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionDTO.prototype, "fleetId", void 0);
FleetTransactionDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('FleetTransaction'),
    (0, query_graphql_1.Relation)('operator', () => operator_dto_1.OperatorDTO, { nullable: true })
], FleetTransactionDTO);
exports.FleetTransactionDTO = FleetTransactionDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/fleet/dto/fleet-transaction.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetTransactionInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts");
const eager_import_2 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let FleetTransactionInput = class FleetTransactionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { action: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts").TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts").ProviderDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts").ProviderRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, fleetId: { type: () => Number }, description: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionInput.prototype, "fleetId", void 0);
FleetTransactionInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], FleetTransactionInput);
exports.FleetTransactionInput = FleetTransactionInput;


/***/ }),

/***/ "./apps/admin-api/src/app/fleet/dto/fleet-wallet.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetWalletDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const fleet_dto_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet.dto.ts");
let FleetWalletDTO = class FleetWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String }, fleetId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetWalletDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.Float),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetWalletDTO.prototype, "balance", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], FleetWalletDTO.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetWalletDTO.prototype, "fleetId", void 0);
FleetWalletDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('FleetWallet'),
    (0, query_graphql_1.Relation)('fleet', () => fleet_dto_1.FleetDTO)
], FleetWalletDTO);
exports.FleetWalletDTO = FleetWalletDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/fleet/dto/fleet.authorizer.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetAuthorizer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let FleetAuthorizer = class FleetAuthorizer {
    authorize(context, authorizerContext) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const operator = yield (0, typeorm_1.getRepository)(operator_entity_1.OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });
            if (authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Fleets_View)) {
                throw new common_1.UnauthorizedException();
            }
            if (!authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Fleets_Edit)) {
                throw new common_1.UnauthorizedException();
            }
            return undefined;
        });
    }
};
FleetAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], FleetAuthorizer);
exports.FleetAuthorizer = FleetAuthorizer;


/***/ }),

/***/ "./apps/admin-api/src/app/fleet/dto/fleet.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const fleet_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet-transaction.dto.ts");
const fleet_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet-wallet.dto.ts");
const fleet_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet.authorizer.ts");
let FleetDTO = class FleetDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, phoneNumber: { type: () => String }, mobileNumber: { type: () => String }, accountNumber: { type: () => String }, commissionSharePercent: { type: () => Number }, commissionShareFlat: { type: () => Number }, address: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", String)
], FleetDTO.prototype, "name", void 0);
FleetDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Fleet'),
    (0, query_graphql_1.UnPagedRelation)('wallet', () => fleet_wallet_dto_1.FleetWalletDTO, { relationName: 'wallet' }),
    (0, query_graphql_1.OffsetConnection)('transactions', () => fleet_transaction_dto_1.FleetTransactionDTO),
    (0, query_graphql_1.Authorize)(fleet_authorizer_1.FleetAuthorizer)
], FleetDTO);
exports.FleetDTO = FleetDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/fleet/fleet.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const fleet_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-transaction.entity.ts");
const fleet_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-wallet.entity.ts");
const fleet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet.entity.ts");
const shared_fleet_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-fleet.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const fleet_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet-transaction.dto.ts");
const fleet_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet-wallet.dto.ts");
const fleet_dto_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet.dto.ts");
const fleet_resolver_1 = __webpack_require__("./apps/admin-api/src/app/fleet/fleet.resolver.ts");
let FleetModule = class FleetModule {
};
FleetModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([fleet_entity_1.FleetEntity, fleet_transaction_entity_1.FleetTransactionEntity, fleet_wallet_entity_1.FleetWalletEntity])],
                resolvers: [
                    {
                        EntityClass: fleet_entity_1.FleetEntity,
                        DTOClass: fleet_dto_1.FleetDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: fleet_wallet_entity_1.FleetWalletEntity,
                        DTOClass: fleet_wallet_dto_1.FleetWalletDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: fleet_transaction_entity_1.FleetTransactionEntity,
                        DTOClass: fleet_transaction_dto_1.FleetTransactionDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })],
        providers: [fleet_resolver_1.FleetResolver, shared_fleet_service_1.SharedFleetService]
    })
], FleetModule);
exports.FleetModule = FleetModule;


/***/ }),

/***/ "./apps/admin-api/src/app/fleet/fleet.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const transaction_action_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const shared_fleet_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-fleet.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const fleet_transaction_input_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet-transaction.input.ts");
const fleet_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet-wallet.dto.ts");
let FleetResolver = class FleetResolver {
    constructor(sharedFleetService, context) {
        this.sharedFleetService = sharedFleetService;
        this.context = context;
    }
    createFleetTransaction(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            input.amount = input.action == transaction_action_enum_1.TransactionAction.Recharge ? Math.abs(input.amount) : Math.abs(input.amount) * -1;
            return this.sharedFleetService.rechargeWallet(Object.assign(Object.assign({}, input), { operatorId: this.context.req.user.id }));
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => fleet_wallet_dto_1.FleetWalletDTO),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => fleet_transaction_input_1.FleetTransactionInput })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [fleet_transaction_input_1.FleetTransactionInput]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FleetResolver.prototype, "createFleetTransaction", null);
FleetResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, tslib_1.__param)(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    (0, tslib_1.__metadata)("design:paramtypes", [shared_fleet_service_1.SharedFleetService, Object])
], FleetResolver);
exports.FleetResolver = FleetResolver;


/***/ }),

/***/ "./apps/admin-api/src/app/number.masker.middleware.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.numberMasker = void 0;
const tslib_1 = __webpack_require__("tslib");
const numberMasker = (ctx, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    let value = yield next();
    const length = value.toString().length;
    if (process.env.DEMO_MODE != null && value != null && length > 4) {
        value = `${value.toString().substring(0, length - 3)}xxxx`;
    }
    return value;
});
exports.numberMasker = numberMasker;


/***/ }),

/***/ "./apps/admin-api/src/app/operator/dto/create-operator.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOperatorInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const operator_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.authorizer.ts");
let CreateOperatorInput = class CreateOperatorInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, userName: { type: () => String }, password: { type: () => String }, mobileNumber: { type: () => String }, email: { nullable: true, type: () => String }, roleId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateOperatorInput.prototype, "roleId", void 0);
CreateOperatorInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)(),
    (0, query_graphql_1.Authorize)(operator_authorizer_1.OperatorAuthorizer)
], CreateOperatorInput);
exports.CreateOperatorInput = CreateOperatorInput;


/***/ }),

/***/ "./apps/admin-api/src/app/operator/dto/operator-role.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorRoleDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const operator_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.authorizer.ts");
let OperatorRoleDTO = class OperatorRoleDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, permissions: { type: () => [(__webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts").OperatorPermission)] } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OperatorRoleDTO.prototype, "id", void 0);
OperatorRoleDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('OperatorRole'),
    (0, query_graphql_1.Authorize)(operator_authorizer_1.OperatorAuthorizer)
], OperatorRoleDTO);
exports.OperatorRoleDTO = OperatorRoleDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/operator/dto/operator.authorizer.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorAuthorizer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let OperatorAuthorizer = class OperatorAuthorizer {
    authorize(context, authorizerContext) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const operator = yield (0, typeorm_1.getRepository)(operator_entity_1.OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });
            if (authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Users_View)) {
                throw new common_1.UnauthorizedException();
            }
            if (!authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Users_Edit)) {
                throw new common_1.UnauthorizedException();
            }
            return undefined;
        });
    }
};
OperatorAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], OperatorAuthorizer);
exports.OperatorAuthorizer = OperatorAuthorizer;


/***/ }),

/***/ "./apps/admin-api/src/app/operator/dto/operator.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const operator_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.authorizer.ts");
let OperatorDTO = class OperatorDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, userName: { type: () => String }, mobileNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, roleId: { nullable: true, type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OperatorDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OperatorDTO.prototype, "roleId", void 0);
OperatorDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Operator'),
    (0, query_graphql_1.Authorize)(operator_authorizer_1.OperatorAuthorizer)
], OperatorDTO);
exports.OperatorDTO = OperatorDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/operator/operator.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const operator_role_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator-role.entity.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const operator_role_dto_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator-role.dto.ts");
const operator_dto_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.dto.ts");
const create_operator_input_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/create-operator.input.ts");
const operator_service_1 = __webpack_require__("./apps/admin-api/src/app/operator/operator.service.ts");
let OperatorModule = class OperatorModule {
};
OperatorModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([operator_entity_1.OperatorEntity, operator_role_entity_1.OperatorRoleEntity])],
                resolvers: [
                    {
                        EntityClass: operator_role_entity_1.OperatorRoleEntity,
                        DTOClass: operator_role_dto_1.OperatorRoleDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: operator_entity_1.OperatorEntity,
                        DTOClass: operator_dto_1.OperatorDTO,
                        CreateDTOClass: create_operator_input_1.CreateOperatorInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })],
        providers: [operator_service_1.OperatorService],
        exports: [operator_service_1.OperatorService]
    })
], OperatorModule);
exports.OperatorModule = OperatorModule;


/***/ }),

/***/ "./apps/admin-api/src/app/operator/operator.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_2 = __webpack_require__("typeorm");
let OperatorService = class OperatorService {
    constructor(repo) {
        this.repo = repo;
    }
    validateCredentials(userName, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repo.findOne({ userName, password });
        });
    }
    getById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repo.findOne(id);
        });
    }
};
OperatorService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository])
], OperatorService);
exports.OperatorService = OperatorService;


/***/ }),

/***/ "./apps/admin-api/src/app/order/dispatcher.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DispatcherResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const shared_order_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-order.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const calculate_fare_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/calculate-fare.dto.ts");
const calculate_fare_input_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/calculate-fare.input.ts");
const create_order_input_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/create-order.input.ts");
const order_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/order.dto.ts");
const order_service_1 = __webpack_require__("./apps/admin-api/src/app/order/order.service.ts");
let DispatcherResolver = class DispatcherResolver {
    constructor(context, sharedOrderService, orderService) {
        this.context = context;
        this.sharedOrderService = sharedOrderService;
        this.orderService = orderService;
    }
    calculateFare(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.sharedOrderService.calculateFare(input);
        });
    }
    createOrder(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.sharedOrderService.createOrder(Object.assign(Object.assign({}, input), { operatorId: this.context.req.user.id }));
        });
    }
    cancelOrder(orderId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.orderService.cancelOrder(orderId);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => calculate_fare_dto_1.CalculateFareDTO),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => calculate_fare_input_1.CalculateFareInput })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [calculate_fare_input_1.CalculateFareInput]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DispatcherResolver.prototype, "calculateFare", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => order_dto_1.OrderDTO),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => create_order_input_1.CreateOrderInput })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [create_order_input_1.CreateOrderInput]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DispatcherResolver.prototype, "createOrder", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => order_dto_1.OrderDTO),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('orderId', { type: () => graphql_1.ID })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DispatcherResolver.prototype, "cancelOrder", null);
DispatcherResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => order_dto_1.OrderDTO),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(graphql_1.CONTEXT)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, shared_order_service_1.SharedOrderService,
        order_service_1.OrderService])
], DispatcherResolver);
exports.DispatcherResolver = DispatcherResolver;


/***/ }),

/***/ "./apps/admin-api/src/app/order/dto/calculate-fare.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculateFareDTO = exports.CalculateFareError = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./apps/admin-api/src/app/order/dto/service-category-with-cost.dto.ts");
const eager_import_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/calculate-fare.dto.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
var CalculateFareError;
(function (CalculateFareError) {
    CalculateFareError["RegionUnsupported"] = "REGION_UNSUPPORTED";
    CalculateFareError["NoServiceInRegion"] = "NO_SERVICE_IN_REGION";
})(CalculateFareError = exports.CalculateFareError || (exports.CalculateFareError = {}));
(0, graphql_1.registerEnumType)(CalculateFareError, { name: 'CalculateFareError' });
let CalculateFareDTO = class CalculateFareDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { currency: { type: () => String }, distance: { type: () => Number }, duration: { type: () => Number }, services: { type: () => [(__webpack_require__("./apps/admin-api/src/app/order/dto/service-category-with-cost.dto.ts").ServiceCategoryWithCostDTO)] }, error: { nullable: true, type: () => (__webpack_require__("./apps/admin-api/src/app/order/dto/calculate-fare.dto.ts").CalculateFareError) } };
    }
};
CalculateFareDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], CalculateFareDTO);
exports.CalculateFareDTO = CalculateFareDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/order/dto/calculate-fare.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculateFareInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/interfaces/point.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CalculateFareInput = class CalculateFareInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { points: { type: () => [(__webpack_require__("./libs/database/src/lib/interfaces/point.ts").Point)] } };
    }
};
CalculateFareInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], CalculateFareInput);
exports.CalculateFareInput = CalculateFareInput;


/***/ }),

/***/ "./apps/admin-api/src/app/order/dto/create-order.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrderInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/interfaces/point.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let CreateOrderInput = class CreateOrderInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { riderId: { type: () => Number }, serviceId: { type: () => Number }, points: { type: () => [(__webpack_require__("./libs/database/src/lib/interfaces/point.ts").Point)] }, addresses: { type: () => [String] }, intervalMinutes: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateOrderInput.prototype, "riderId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateOrderInput.prototype, "serviceId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateOrderInput.prototype, "intervalMinutes", void 0);
CreateOrderInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], CreateOrderInput);
exports.CreateOrderInput = CreateOrderInput;


/***/ }),

/***/ "./apps/admin-api/src/app/order/dto/order-message.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/message-status.enum.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
let OrderMessageDTO = class OrderMessageDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, sentAt: { type: () => Date }, sentByDriver: { type: () => Boolean }, status: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/message-status.enum.ts").MessageStatus) }, content: { type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderMessageDTO.prototype, "id", void 0);
OrderMessageDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('OrderMessage')
], OrderMessageDTO);
exports.OrderMessageDTO = OrderMessageDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/order/dto/order.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/order-status.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/interfaces/point.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const order_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/order-status.enum.ts");
const provider_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/accounting/dto/provider-transaction.dto.ts");
const complaint_dto_1 = __webpack_require__("./apps/admin-api/src/app/complaint/dto/complaint.dto.ts");
const coupon_dto_1 = __webpack_require__("./apps/admin-api/src/app/coupon/dto/coupon.dto.ts");
const driver_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver-transaction.dto.ts");
const driver_dto_1 = __webpack_require__("./apps/admin-api/src/app/driver/dto/driver.dto.ts");
const fleet_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/fleet/dto/fleet-transaction.dto.ts");
const rider_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-transaction.dto.ts");
const rider_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider.dto.ts");
const service_dto_1 = __webpack_require__("./apps/admin-api/src/app/service/dto/service.dto.ts");
const order_message_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/order-message.dto.ts");
let OrderDTO = class OrderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdOn: { type: () => Date }, startTimestamp: { nullable: true, type: () => Date }, finishTimestamp: { nullable: true, type: () => Date }, status: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/order-status.enum.ts").OrderStatus) }, distanceBest: { type: () => Number }, durationBest: { type: () => Number }, costBest: { type: () => Number }, costAfterCoupon: { type: () => Number }, currency: { type: () => String }, addresses: { type: () => [String] }, points: { type: () => [(__webpack_require__("./libs/database/src/lib/interfaces/point.ts").Point)] }, expectedTimestamp: { nullable: true, type: () => Date }, riderId: { type: () => Number }, driverId: { nullable: true, type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", Date)
], OrderDTO.prototype, "createdOn", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => order_status_enum_1.OrderStatus),
    (0, tslib_1.__metadata)("design:type", String)
], OrderDTO.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderDTO.prototype, "distanceBest", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderDTO.prototype, "durationBest", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderDTO.prototype, "riderId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderDTO.prototype, "driverId", void 0);
OrderDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Order'),
    (0, query_graphql_1.Relation)('driver', () => driver_dto_1.DriverDTO, { nullable: true }),
    (0, query_graphql_1.Relation)('rider', () => rider_dto_1.RiderDTO),
    (0, query_graphql_1.Relation)('service', () => service_dto_1.ServiceDTO),
    (0, query_graphql_1.Relation)('coupon', () => coupon_dto_1.CouponDTO, { nullable: true }),
    (0, query_graphql_1.UnPagedRelation)('complaints', () => complaint_dto_1.ComplaintDTO),
    (0, query_graphql_1.UnPagedRelation)('conversation', () => order_message_dto_1.OrderMessageDTO, { relationName: 'conversation' }),
    (0, query_graphql_1.UnPagedRelation)('riderTransactions', () => rider_transaction_dto_1.RiderTransactionDTO),
    (0, query_graphql_1.UnPagedRelation)('driverTransactions', () => driver_transaction_dto_1.DriverTransactionDTO),
    (0, query_graphql_1.UnPagedRelation)('fleetTransactions', () => fleet_transaction_dto_1.FleetTransactionDTO),
    (0, query_graphql_1.UnPagedRelation)('providerTransactions', () => provider_transaction_dto_1.ProviderTransactionDTO)
], OrderDTO);
exports.OrderDTO = OrderDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/order/dto/service-category-with-cost.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryWithCostDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./apps/admin-api/src/app/order/dto/service-with-cost.dto.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ServiceCategoryWithCostDTO = class ServiceCategoryWithCostDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, services: { type: () => [(__webpack_require__("./apps/admin-api/src/app/order/dto/service-with-cost.dto.ts").ServiceWithCostDTO)] } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceCategoryWithCostDTO.prototype, "id", void 0);
ServiceCategoryWithCostDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('ServiceCategoryWithCost')
], ServiceCategoryWithCostDTO);
exports.ServiceCategoryWithCostDTO = ServiceCategoryWithCostDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/order/dto/service-with-cost.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceWithCostDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./apps/admin-api/src/app/upload/media.dto.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ServiceWithCostDTO = class ServiceWithCostDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, cost: { type: () => Number }, media: { type: () => (__webpack_require__("./apps/admin-api/src/app/upload/media.dto.ts").MediaDTO) } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceWithCostDTO.prototype, "id", void 0);
ServiceWithCostDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('ServiceWithCost')
], ServiceWithCostDTO);
exports.ServiceWithCostDTO = ServiceWithCostDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/order/order-subscription.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSubscriptionService = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const graphql_redis_subscriptions_1 = __webpack_require__("graphql-redis-subscriptions");
const order_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/order.dto.ts");
let OrderSubscriptionService = class OrderSubscriptionService {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    orderUpdated(orderId) {
        return this.pubSub.asyncIterator('orderUpdated');
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => order_dto_1.OrderDTO, {
        filter(payload, variables, context) {
            return (variables.orderId == payload.orderUpdated.id);
        },
    }),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('orderId', { type: () => graphql_1.ID })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], OrderSubscriptionService.prototype, "orderUpdated", null);
OrderSubscriptionService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__metadata)("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], OrderSubscriptionService);
exports.OrderSubscriptionService = OrderSubscriptionService;


/***/ }),

/***/ "./apps/admin-api/src/app/order/order.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./libs/database/src/index.ts");
const request_message_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request-message.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const shared_order_module_1 = __webpack_require__("./libs/database/src/lib/order/shared-order.module.ts");
const redis_helper_module_1 = __webpack_require__("./libs/database/src/lib/redis/redis-helper.module.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const dispatcher_resolver_1 = __webpack_require__("./apps/admin-api/src/app/order/dispatcher.resolver.ts");
const order_message_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/order-message.dto.ts");
const order_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/order.dto.ts");
const order_subscription_service_1 = __webpack_require__("./apps/admin-api/src/app/order/order-subscription.service.ts");
const order_service_1 = __webpack_require__("./apps/admin-api/src/app/order/order.service.ts");
let OrderModule = class OrderModule {
};
OrderModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            shared_order_module_1.SharedOrderModule,
            redis_helper_module_1.RedisHelpersModule,
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        request_entity_1.RequestEntity,
                        request_message_entity_1.OrderMessageEntity,
                    ]),
                ],
                pubSub: database_1.RedisPubSubProvider.provider(),
                resolvers: [
                    {
                        EntityClass: request_entity_1.RequestEntity,
                        DTOClass: order_dto_1.OrderDTO,
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        enableAggregate: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                    },
                    {
                        EntityClass: request_message_entity_1.OrderMessageEntity,
                        DTOClass: order_message_dto_1.OrderMessageDTO,
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        read: { disabled: true },
                    },
                ],
            }),
        ],
        providers: [
            dispatcher_resolver_1.DispatcherResolver,
            order_subscription_service_1.OrderSubscriptionService,
            order_service_1.OrderService,
            database_1.RedisPubSubProvider.provider(),
        ],
    })
], OrderModule);
exports.OrderModule = OrderModule;


/***/ }),

/***/ "./apps/admin-api/src/app/order/order.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderService = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const order_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/order-status.enum.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const order_redis_service_1 = __webpack_require__("./libs/database/src/lib/redis/order-redis.service.ts");
const graphql_redis_subscriptions_1 = __webpack_require__("graphql-redis-subscriptions");
const typeorm_2 = __webpack_require__("typeorm");
let OrderService = class OrderService {
    constructor(orderRepository, orderRedisService, pubSub) {
        this.orderRepository = orderRepository;
        this.orderRedisService = orderRedisService;
        this.pubSub = pubSub;
    }
    cancelOrder(orderId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let order = yield this.orderRepository.findOne(orderId, { relations: ['service'] });
            yield this.orderRepository.update(order.id, { status: order_status_enum_1.OrderStatus.Expired, finishTimestamp: new Date(), costAfterCoupon: 0 });
            this.orderRedisService.expire([order.id]);
            this.pubSub.publish('orderRemoved', { orderRemoved: order });
            return order;
        });
    }
};
OrderService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    (0, tslib_1.__param)(2, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        order_redis_service_1.OrderRedisService,
        graphql_redis_subscriptions_1.RedisPubSub])
], OrderService);
exports.OrderService = OrderService;


/***/ }),

/***/ "./apps/admin-api/src/app/payment-gateway/dto/gateway.authorizer.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayAuthorizer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let GatewayAuthorizer = class GatewayAuthorizer {
    authorize(context, authorizerContext) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const operator = yield (0, typeorm_1.getRepository)(operator_entity_1.OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });
            if (authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Gateways_View)) {
                throw new common_1.UnauthorizedException();
            }
            if (!authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Gateways_Edit)) {
                throw new common_1.UnauthorizedException();
            }
            return undefined;
        });
    }
};
GatewayAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], GatewayAuthorizer);
exports.GatewayAuthorizer = GatewayAuthorizer;


/***/ }),

/***/ "./apps/admin-api/src/app/payment-gateway/dto/payment-gateway.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/payment-gateway-type.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const gateway_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/payment-gateway/dto/gateway.authorizer.ts");
let PaymentGatewayDTO = class PaymentGatewayDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, enabled: { type: () => Boolean }, title: { type: () => String }, type: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/payment-gateway-type.enum.ts").PaymentGatewayType) }, publicKey: { nullable: true, type: () => String }, privateKey: { type: () => String }, merchantId: { nullable: true, type: () => String }, saltKey: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], PaymentGatewayDTO.prototype, "id", void 0);
PaymentGatewayDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('PaymentGateway'),
    (0, query_graphql_1.Authorize)(gateway_authorizer_1.GatewayAuthorizer)
], PaymentGatewayDTO);
exports.PaymentGatewayDTO = PaymentGatewayDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/payment-gateway/payment-gateway.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const payment_gateway_entity_1 = __webpack_require__("./libs/database/src/lib/entities/payment-gateway.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const payment_gateway_dto_1 = __webpack_require__("./apps/admin-api/src/app/payment-gateway/dto/payment-gateway.dto.ts");
let PaymentGatewayModule = class PaymentGatewayModule {
};
PaymentGatewayModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([payment_gateway_entity_1.PaymentGatewayEntity])],
                resolvers: [
                    {
                        EntityClass: payment_gateway_entity_1.PaymentGatewayEntity,
                        DTOClass: payment_gateway_dto_1.PaymentGatewayDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ]
    })
], PaymentGatewayModule);
exports.PaymentGatewayModule = PaymentGatewayModule;


/***/ }),

/***/ "./apps/admin-api/src/app/region/dto/region.authorizer.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionAuthorizer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let RegionAuthorizer = class RegionAuthorizer {
    authorize(context, authorizerContext) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const operator = yield (0, typeorm_1.getRepository)(operator_entity_1.OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });
            if (authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Regions_View)) {
                throw new common_1.UnauthorizedException();
            }
            if (!authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Regions_Edit)) {
                throw new common_1.UnauthorizedException();
            }
            return undefined;
        });
    }
};
RegionAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], RegionAuthorizer);
exports.RegionAuthorizer = RegionAuthorizer;


/***/ }),

/***/ "./apps/admin-api/src/app/region/dto/region.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/interfaces/point.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const region_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/region/dto/region.authorizer.ts");
let RegionDTO = class RegionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, currency: { type: () => String }, enabled: { type: () => Boolean }, location: { type: () => [[(__webpack_require__("./libs/database/src/lib/interfaces/point.ts").Point)]] } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RegionDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], RegionDTO.prototype, "currency", void 0);
RegionDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Region'),
    (0, query_graphql_1.Authorize)(region_authorizer_1.RegionAuthorizer)
], RegionDTO);
exports.RegionDTO = RegionDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/region/region.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const region_entity_1 = __webpack_require__("./libs/database/src/lib/entities/region.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const region_dto_1 = __webpack_require__("./apps/admin-api/src/app/region/dto/region.dto.ts");
let RegionModule = class RegionModule {
};
RegionModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([region_entity_1.RegionEntity])],
                resolvers: [
                    {
                        EntityClass: region_entity_1.RegionEntity,
                        DTOClass: region_dto_1.RegionDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        enableAggregate: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ]
    })
], RegionModule);
exports.RegionModule = RegionModule;


/***/ }),

/***/ "./apps/admin-api/src/app/rider/dto/rider-address.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-address-type.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/interfaces/point.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let RiderAddressDTO = class RiderAddressDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, type: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/rider-address-type.enum.ts").RiderAddressType) }, title: { type: () => String }, details: { nullable: true, type: () => String }, location: { type: () => (__webpack_require__("./libs/database/src/lib/interfaces/point.ts").Point) }, riderId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderAddressDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderAddressDTO.prototype, "riderId", void 0);
RiderAddressDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('RiderAddress')
], RiderAddressDTO);
exports.RiderAddressDTO = RiderAddressDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/rider/dto/rider-transaction.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderTransactionDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-deduct-transaction-type.enum.ts");
const eager_import_2 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-recharge-transaction-type.enum.ts");
const eager_import_3 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-status.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const operator_dto_1 = __webpack_require__("./apps/admin-api/src/app/operator/dto/operator.dto.ts");
const payment_gateway_dto_1 = __webpack_require__("./apps/admin-api/src/app/payment-gateway/dto/payment-gateway.dto.ts");
const rider_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider.dto.ts");
let RiderTransactionDTO = class RiderTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, action: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts").TransactionAction) }, createdAt: { type: () => Date }, deductType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/rider-deduct-transaction-type.enum.ts").RiderDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/rider-recharge-transaction-type.enum.ts").RiderRechargeTransactionType) }, status: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-status.enum.ts").TransactionStatus) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, riderId: { type: () => Number }, paymentGatewayId: { nullable: true, type: () => Number }, operatorId: { nullable: true, type: () => Number }, requestId: { nullable: true, type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", Date)
], RiderTransactionDTO.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.Float),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionDTO.prototype, "amount", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], RiderTransactionDTO.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionDTO.prototype, "riderId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionDTO.prototype, "paymentGatewayId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionDTO.prototype, "operatorId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionDTO.prototype, "requestId", void 0);
RiderTransactionDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('RiderTransaction'),
    (0, query_graphql_1.Relation)('operator', () => operator_dto_1.OperatorDTO, { nullable: true }),
    (0, query_graphql_1.Relation)('paymentGateway', () => payment_gateway_dto_1.PaymentGatewayDTO, { nullable: true }),
    (0, query_graphql_1.Relation)('rider', () => rider_dto_1.RiderDTO)
], RiderTransactionDTO);
exports.RiderTransactionDTO = RiderTransactionDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/rider/dto/rider-transaction.input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderTransactionInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-deduct-transaction-type.enum.ts");
const eager_import_2 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-recharge-transaction-type.enum.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let RiderTransactionInput = class RiderTransactionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { action: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts").TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/rider-deduct-transaction-type.enum.ts").RiderDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/rider-recharge-transaction-type.enum.ts").RiderRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, riderId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionInput.prototype, "riderId", void 0);
RiderTransactionInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], RiderTransactionInput);
exports.RiderTransactionInput = RiderTransactionInput;


/***/ }),

/***/ "./apps/admin-api/src/app/rider/dto/rider-wallet.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderWalletDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const rider_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider.dto.ts");
let RiderWalletDTO = class RiderWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String }, riderId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderWalletDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.Float),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderWalletDTO.prototype, "balance", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderWalletDTO.prototype, "riderId", void 0);
RiderWalletDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('RiderWallet'),
    (0, query_graphql_1.Relation)('rider', () => rider_dto_1.RiderDTO)
], RiderWalletDTO);
exports.RiderWalletDTO = RiderWalletDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/rider/dto/rider.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-status.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const gender_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts");
const number_masker_middleware_1 = __webpack_require__("./apps/admin-api/src/app/number.masker.middleware.ts");
const order_dto_1 = __webpack_require__("./apps/admin-api/src/app/order/dto/order.dto.ts");
const media_dto_1 = __webpack_require__("./apps/admin-api/src/app/upload/media.dto.ts");
const rider_address_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-address.dto.ts");
const rider_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-transaction.dto.ts");
const rider_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-wallet.dto.ts");
let RiderDTO = class RiderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, status: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/rider-status.enum.ts").RiderStatus) }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String }, registrationTimestamp: { type: () => Date }, email: { nullable: true, type: () => String }, gender: { nullable: true, type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts").Gender) } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", String)
], RiderDTO.prototype, "firstName", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", String)
], RiderDTO.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => String, { middleware: [number_masker_middleware_1.numberMasker] }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderDTO.prototype, "mobileNumber", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", String)
], RiderDTO.prototype, "gender", void 0);
RiderDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Rider'),
    (0, query_graphql_1.OffsetConnection)('addresses', () => rider_address_dto_1.RiderAddressDTO),
    (0, query_graphql_1.OffsetConnection)('wallet', () => rider_wallet_dto_1.RiderWalletDTO),
    (0, query_graphql_1.OffsetConnection)('transactions', () => rider_transaction_dto_1.RiderTransactionDTO),
    (0, query_graphql_1.OffsetConnection)('orders', () => order_dto_1.OrderDTO),
    (0, query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true })
], RiderDTO);
exports.RiderDTO = RiderDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/rider/rider.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const rider_address_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-address.entity.ts");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
const rider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-transaction.entity.ts");
const rider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-wallet.entity.ts");
const shared_rider_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-rider.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const rider_address_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-address.dto.ts");
const rider_transaction_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-transaction.dto.ts");
const rider_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-wallet.dto.ts");
const rider_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider.dto.ts");
const rider_resolver_1 = __webpack_require__("./apps/admin-api/src/app/rider/rider.resolver.ts");
let RiderModule = class RiderModule {
};
RiderModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([rider_entity_1.RiderEntity, rider_wallet_entity_1.RiderWalletEntity, rider_transaction_entity_1.RiderTransactionEntity, rider_address_entity_1.RiderAddressEntity])],
                resolvers: [
                    {
                        EntityClass: rider_entity_1.RiderEntity,
                        DTOClass: rider_dto_1.RiderDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: rider_wallet_entity_1.RiderWalletEntity,
                        DTOClass: rider_wallet_dto_1.RiderWalletDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: rider_transaction_entity_1.RiderTransactionEntity,
                        DTOClass: rider_transaction_dto_1.RiderTransactionDTO,
                        create: { many: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: rider_address_entity_1.RiderAddressEntity,
                        DTOClass: rider_address_dto_1.RiderAddressDTO,
                        create: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ],
        providers: [rider_resolver_1.RiderResolver, shared_rider_service_1.SharedRiderService]
    })
], RiderModule);
exports.RiderModule = RiderModule;


/***/ }),

/***/ "./apps/admin-api/src/app/rider/rider.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const transaction_action_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const transaction_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-status.enum.ts");
const shared_rider_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-rider.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const rider_transaction_input_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-transaction.input.ts");
const rider_wallet_dto_1 = __webpack_require__("./apps/admin-api/src/app/rider/dto/rider-wallet.dto.ts");
let RiderResolver = class RiderResolver {
    constructor(sharedRiderService, context) {
        this.sharedRiderService = sharedRiderService;
        this.context = context;
    }
    createRiderTransaction(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            input.amount = input.action == transaction_action_enum_1.TransactionAction.Recharge ? Math.abs(input.amount) : Math.abs(input.amount) * -1;
            return this.sharedRiderService.rechargeWallet(Object.assign(Object.assign({}, input), { operatorId: this.context.req.user.id, status: transaction_status_enum_1.TransactionStatus.Done }));
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => rider_wallet_dto_1.RiderWalletDTO),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => rider_transaction_input_1.RiderTransactionInput })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [rider_transaction_input_1.RiderTransactionInput]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RiderResolver.prototype, "createRiderTransaction", null);
RiderResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, tslib_1.__param)(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    (0, tslib_1.__metadata)("design:paramtypes", [shared_rider_service_1.SharedRiderService, Object])
], RiderResolver);
exports.RiderResolver = RiderResolver;


/***/ }),

/***/ "./apps/admin-api/src/app/service/dto/service-category.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const service_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/service/dto/service.authorizer.ts");
const service_dto_1 = __webpack_require__("./apps/admin-api/src/app/service/dto/service.dto.ts");
let ServiceCategoryDTO = class ServiceCategoryDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceCategoryDTO.prototype, "id", void 0);
ServiceCategoryDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('ServiceCategory'),
    (0, query_graphql_1.UnPagedRelation)('services', () => service_dto_1.ServiceDTO, { pagingStrategy: query_graphql_1.PagingStrategies.NONE }),
    (0, query_graphql_1.Authorize)(service_authorizer_1.ServiceAuthorizer)
], ServiceCategoryDTO);
exports.ServiceCategoryDTO = ServiceCategoryDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/service/dto/service.authorizer.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceAuthorizer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const typeorm_1 = __webpack_require__("typeorm");
let ServiceAuthorizer = class ServiceAuthorizer {
    authorize(context, authorizerContext) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const operator = yield (0, typeorm_1.getRepository)(operator_entity_1.OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });
            if (authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Services_View)) {
                throw new common_1.UnauthorizedException();
            }
            if (!authorizerContext.readonly && !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Services_Edit)) {
                if (authorizerContext.operationName == 'updateOne') {
                    throw new common_1.UnauthorizedException();
                }
            }
            return undefined;
        });
    }
};
ServiceAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], ServiceAuthorizer);
exports.ServiceAuthorizer = ServiceAuthorizer;


/***/ }),

/***/ "./apps/admin-api/src/app/service/dto/service.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const eager_import_0 = __webpack_require__("./libs/database/src/lib/entities/enums/service-payment-method.enum.ts");
const eager_import_1 = __webpack_require__("./libs/database/src/lib/interfaces/time-multiplier.dto.ts");
const eager_import_2 = __webpack_require__("./libs/database/src/lib/interfaces/distance-multiplier.dto.ts");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const region_dto_1 = __webpack_require__("./apps/admin-api/src/app/region/dto/region.dto.ts");
const media_dto_1 = __webpack_require__("./apps/admin-api/src/app/upload/media.dto.ts");
const service_authorizer_1 = __webpack_require__("./apps/admin-api/src/app/service/dto/service.authorizer.ts");
let ServiceDTO = class ServiceDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, categoryId: { type: () => Number }, baseFare: { type: () => Number }, perHundredMeters: { type: () => Number }, perMinuteDrive: { type: () => Number }, prepayPercent: { type: () => Number }, minimumFee: { type: () => Number }, searchRadius: { type: () => Number }, paymentMethod: { type: () => (__webpack_require__("./libs/database/src/lib/entities/enums/service-payment-method.enum.ts").ServicePaymentMethod) }, cancellationTotalFee: { type: () => Number }, cancellationDriverShare: { type: () => Number }, providerSharePercent: { type: () => Number }, providerShareFlat: { type: () => Number }, maximumDestinationDistance: { type: () => Number }, timeMultipliers: { type: () => [(__webpack_require__("./libs/database/src/lib/interfaces/time-multiplier.dto.ts").TimeMultiplier)] }, distanceMultipliers: { type: () => [(__webpack_require__("./libs/database/src/lib/interfaces/distance-multiplier.dto.ts").DistanceMultiplier)] }, mediaId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceDTO.prototype, "categoryId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceDTO.prototype, "searchRadius", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceDTO.prototype, "providerSharePercent", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceDTO.prototype, "maximumDestinationDistance", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceDTO.prototype, "mediaId", void 0);
ServiceDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Service'),
    (0, query_graphql_1.UnPagedRelation)('regions', () => region_dto_1.RegionDTO, { pagingStrategy: query_graphql_1.PagingStrategies.NONE }),
    (0, query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO),
    (0, query_graphql_1.Authorize)(service_authorizer_1.ServiceAuthorizer)
], ServiceDTO);
exports.ServiceDTO = ServiceDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/service/service.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const service_category_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service-category.entity.ts");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/admin-api/src/app/auth/jwt-auth.guard.ts");
const service_category_dto_1 = __webpack_require__("./apps/admin-api/src/app/service/dto/service-category.dto.ts");
const service_dto_1 = __webpack_require__("./apps/admin-api/src/app/service/dto/service.dto.ts");
let ServiceModule = class ServiceModule {
};
ServiceModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([service_category_entity_1.ServiceCategoryEntity, service_entity_1.ServiceEntity])],
                resolvers: [
                    {
                        EntityClass: service_entity_1.ServiceEntity,
                        DTOClass: service_dto_1.ServiceDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    },
                    {
                        EntityClass: service_category_entity_1.ServiceCategoryEntity,
                        DTOClass: service_category_dto_1.ServiceCategoryDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard]
                    }
                ]
            })
        ]
    })
], ServiceModule);
exports.ServiceModule = ServiceModule;


/***/ }),

/***/ "./apps/admin-api/src/app/upload/media.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let MediaDTO = class MediaDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, address: { type: () => String }, base64: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], MediaDTO.prototype, "id", void 0);
MediaDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Media')
], MediaDTO);
exports.MediaDTO = MediaDTO;


/***/ }),

/***/ "./apps/admin-api/src/app/upload/upload.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const query_typeorm_1 = __webpack_require__("@nestjs-query/query-typeorm");
const common_1 = __webpack_require__("@nestjs/common");
const media_entity_1 = __webpack_require__("./libs/database/src/lib/entities/media.entity.ts");
const media_dto_1 = __webpack_require__("./apps/admin-api/src/app/upload/media.dto.ts");
const upload_service_1 = __webpack_require__("./apps/admin-api/src/app/upload/upload.service.ts");
let UploadModule = class UploadModule {
};
UploadModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([media_entity_1.MediaEntity])],
                resolvers: [
                    {
                        DTOClass: media_dto_1.MediaDTO,
                        EntityClass: media_entity_1.MediaEntity,
                        create: { disabled: true },
                        read: { disabled: true },
                        delete: { disabled: true },
                        update: { disabled: true }
                    }
                ]
            })
        ],
        providers: [upload_service_1.UploadService],
        exports: [upload_service_1.UploadService]
    })
], UploadModule);
exports.UploadModule = UploadModule;


/***/ }),

/***/ "./apps/admin-api/src/app/upload/upload.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fs = __webpack_require__("fs");
const util = __webpack_require__("util");
const path_1 = __webpack_require__("path");
const typeorm_1 = __webpack_require__("typeorm");
const media_entity_1 = __webpack_require__("./libs/database/src/lib/entities/media.entity.ts");
const typeorm_2 = __webpack_require__("@nestjs/typeorm");
const stream_1 = __webpack_require__("stream");
const pump = util.promisify(stream_1.pipeline);
let UploadService = class UploadService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    uploadMedia(req, res, dir, fileNamePrefix) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            //Check request is multipart
            if (!req.isMultipart()) {
                res.send(new common_1.BadRequestException());
                return;
            }
            const data = yield req.file();
            yield fs.promises.mkdir(dir, { recursive: true });
            const _fileName = (0, path_1.join)(dir, fileNamePrefix != null ? `${fileNamePrefix}-${data.filename}` : data.filename);
            yield pump(data.file, fs.createWriteStream(_fileName));
            const insert = yield this.mediaRepository.insert({ address: _fileName });
            res.code(200).send({ id: insert.raw.insertId, address: _fileName });
        });
    }
};
UploadService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_2.InjectRepository)(media_entity_1.MediaEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_1.Repository])
], UploadService);
exports.UploadService = UploadService;


/***/ }),

/***/ "./libs/database/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/database/src/lib/database.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/database/src/lib/interfaces/point.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/database/src/lib/interfaces/distance-multiplier.dto.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/database/src/lib/interfaces/time-multiplier.dto.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/database/src/lib/redis-pub-sub.provider.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/database/src/lib/crypto.service.ts"), exports);


/***/ }),

/***/ "./libs/database/src/lib/crypto.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CryptoService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const crypto_1 = __webpack_require__("crypto");
let CryptoService = class CryptoService {
    constructor() {
        this.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
        this.IV_LENGTH = 16; // For AES, this is always 16
    }
    encrypt(text) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(this.IV_LENGTH);
            const cipher = (0, crypto_1.createCipheriv)('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        });
    }
    decrypt(text) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const textParts = text.split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedText = Buffer.from(textParts.join(':'), 'hex');
            const decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return JSON.parse(decrypted.toString());
        });
    }
};
CryptoService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], CryptoService);
exports.CryptoService = CryptoService;


/***/ }),

/***/ "./libs/database/src/lib/database.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.entities = exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const car_color_entity_1 = __webpack_require__("./libs/database/src/lib/entities/car-color.entity.ts");
const car_model_entity_1 = __webpack_require__("./libs/database/src/lib/entities/car-model.entity.ts");
const complaint_activity_entity_1 = __webpack_require__("./libs/database/src/lib/entities/complaint-activity.entity.ts");
const complaint_entity_1 = __webpack_require__("./libs/database/src/lib/entities/complaint.entity.ts");
const coupon_entity_1 = __webpack_require__("./libs/database/src/lib/entities/coupon.entity.ts");
const driver_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-transaction.entity.ts");
const driver_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-wallet.entity.ts");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const feedback_parameter_entity_1 = __webpack_require__("./libs/database/src/lib/entities/feedback-parameter.entity.ts");
const feedback_entity_1 = __webpack_require__("./libs/database/src/lib/entities/feedback.entity.ts");
const fleet_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-transaction.entity.ts");
const fleet_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-wallet.entity.ts");
const fleet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet.entity.ts");
const media_entity_1 = __webpack_require__("./libs/database/src/lib/entities/media.entity.ts");
const operator_role_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator-role.entity.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const request_message_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request-message.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const payment_gateway_entity_1 = __webpack_require__("./libs/database/src/lib/entities/payment-gateway.entity.ts");
const provider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-transaction.entity.ts");
const provider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-wallet.entity.ts");
const region_entity_1 = __webpack_require__("./libs/database/src/lib/entities/region.entity.ts");
const rider_address_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-address.entity.ts");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
const rider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-transaction.entity.ts");
const rider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-wallet.entity.ts");
const service_category_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service-category.entity.ts");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
const payment_entity_1 = __webpack_require__("./libs/database/src/lib/entities/payment.entity.ts");
let DatabaseModule = class DatabaseModule {
    onModuleInit() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const conn = yield (0, typeorm_2.createConnection)({
                name: 'mg',
                type: 'mysql',
                host: process.env.MYSQL_HOST || 'localhost',
                port: 3306,
                username: process.env.MYSQL_USER || 'root',
                password: process.env.MYSQL_PASS || 'defaultpassword',
                database: process.env.MYSQL_DB || 'beninfy',
                migrations: [`${__dirname}/migration/*.js`],
                migrationsRun: true
            });
            const migrationsOutput = yield conn.runMigrations();
            common_1.Logger.log(`${migrationsOutput.length} Migrations done!`);
        });
    }
};
DatabaseModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    const baseConn = {
                        type: 'mysql',
                        host: process.env.MYSQL_HOST || 'localhost',
                        port: 3306,
                        username: process.env.MYSQL_USER || 'root',
                        password: process.env.MYSQL_PASS || 'defaultpassword',
                    };
                    const conn = yield (0, typeorm_2.createConnection)(Object.assign(Object.assign({}, baseConn), { name: 'ts' }));
                    const result = yield conn.query(`SHOW DATABASES LIKE '${process.env.MYSQL_DB || 'beninfy'}';`);
                    const shouldSync = (result.length == 0) || process.env.FORCE_SYNC_DB != null;
                    if (result.length == 0) {
                        yield conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB || 'beninfy'}`);
                    }
                    return Object.assign(Object.assign({}, baseConn), { database: process.env.MYSQL_DB || 'beninfy', autoLoadEntities: true, legacySpatialSupport: false, migrations: [`${__dirname}/migration/*.js`], synchronize: true, migrationsRun: false });
                }),
            }),
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
exports.entities = [
    media_entity_1.MediaEntity,
    operator_entity_1.OperatorEntity,
    operator_role_entity_1.OperatorRoleEntity,
    driver_entity_1.DriverEntity,
    provider_transaction_entity_1.ProviderTransactionEntity,
    provider_wallet_entity_1.ProviderWalletEntity,
    complaint_activity_entity_1.ComplaintActivityEntity,
    complaint_entity_1.ComplaintEntity,
    car_model_entity_1.CarModelEntity,
    car_color_entity_1.CarColorEntity,
    driver_transaction_entity_1.DriverTransactionEntity,
    driver_wallet_entity_1.DriverWalletEntity,
    feedback_parameter_entity_1.FeedbackParameterEntity,
    feedback_entity_1.FeedbackEntity,
    fleet_entity_1.FleetEntity,
    fleet_wallet_entity_1.FleetWalletEntity,
    fleet_transaction_entity_1.FleetTransactionEntity,
    request_entity_1.RequestEntity,
    request_message_entity_1.OrderMessageEntity,
    payment_gateway_entity_1.PaymentGatewayEntity,
    payment_entity_1.PaymentEntity,
    service_entity_1.ServiceEntity,
    service_category_entity_1.ServiceCategoryEntity,
    coupon_entity_1.CouponEntity,
    region_entity_1.RegionEntity,
    rider_entity_1.RiderEntity,
    rider_wallet_entity_1.RiderWalletEntity,
    rider_transaction_entity_1.RiderTransactionEntity,
    rider_address_entity_1.RiderAddressEntity,
];


/***/ }),

/***/ "./libs/database/src/lib/entities/announcement.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const anouncement_user_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/anouncement-user-type.enum.ts");
const media_entity_1 = __webpack_require__("./libs/database/src/lib/entities/media.entity.ts");
let AnnouncementEntity = class AnnouncementEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AnnouncementEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('set', {
        enum: anouncement_user_type_enum_1.AnnouncementUserType,
        default: [anouncement_user_type_enum_1.AnnouncementUserType.Rider]
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], AnnouncementEntity.prototype, "userType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        name: 'startTimestamp'
    }),
    (0, tslib_1.__metadata)("design:type", Date)
], AnnouncementEntity.prototype, "startAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        name: 'expirationTimestamp'
    }),
    (0, tslib_1.__metadata)("design:type", Date)
], AnnouncementEntity.prototype, "expireAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], AnnouncementEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], AnnouncementEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, media => media.announcement),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", media_entity_1.MediaEntity)
], AnnouncementEntity.prototype, "media", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AnnouncementEntity.prototype, "mediaId", void 0);
AnnouncementEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('promotion')
], AnnouncementEntity);
exports.AnnouncementEntity = AnnouncementEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/car-color.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
let CarColorEntity = class CarColorEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CarColorEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], CarColorEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => driver_entity_1.DriverEntity, driver => driver.carColor),
    (0, tslib_1.__metadata)("design:type", Array)
], CarColorEntity.prototype, "drivers", void 0);
CarColorEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('car_color')
], CarColorEntity);
exports.CarColorEntity = CarColorEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/car-model.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
let CarModelEntity = class CarModelEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CarModelEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'title' }),
    (0, tslib_1.__metadata)("design:type", String)
], CarModelEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => driver_entity_1.DriverEntity, driver => driver.car),
    (0, tslib_1.__metadata)("design:type", Array)
], CarModelEntity.prototype, "drivers", void 0);
CarModelEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('car')
], CarModelEntity);
exports.CarModelEntity = CarModelEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/complaint-activity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const complaint_entity_1 = __webpack_require__("./libs/database/src/lib/entities/complaint.entity.ts");
const complaint_activity_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/complaint-activity-type.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
let ComplaintActivityEntity = class ComplaintActivityEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintActivityEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: complaint_activity_type_enum_1.ComplaintActivityType
    }),
    (0, tslib_1.__metadata)("design:type", String)
], ComplaintActivityEntity.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.complaintActivities),
    (0, tslib_1.__metadata)("design:type", operator_entity_1.OperatorEntity)
], ComplaintActivityEntity.prototype, "actor", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity),
    (0, tslib_1.__metadata)("design:type", operator_entity_1.OperatorEntity)
], ComplaintActivityEntity.prototype, "assignedTo", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintActivityEntity.prototype, "assignedToId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ComplaintActivityEntity.prototype, "comment", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => complaint_entity_1.ComplaintEntity, complaint => complaint.activities),
    (0, tslib_1.__metadata)("design:type", complaint_entity_1.ComplaintEntity)
], ComplaintActivityEntity.prototype, "complaint", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintActivityEntity.prototype, "complaintId", void 0);
ComplaintActivityEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('complaint_activity')
], ComplaintActivityEntity);
exports.ComplaintActivityEntity = ComplaintActivityEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/complaint.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const complaint_activity_entity_1 = __webpack_require__("./libs/database/src/lib/entities/complaint-activity.entity.ts");
const complaint_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/complaint-status.enum.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
let ComplaintEntity = class ComplaintEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], ComplaintEntity.prototype, "inscriptionTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.complaints),
    (0, tslib_1.__metadata)("design:type", request_entity_1.RequestEntity)
], ComplaintEntity.prototype, "request", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintEntity.prototype, "requestId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], ComplaintEntity.prototype, "requestedByDriver", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], ComplaintEntity.prototype, "subject", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ComplaintEntity.prototype, "content", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: complaint_status_enum_1.ComplaintStatus,
        default: complaint_status_enum_1.ComplaintStatus.Submitted
    }),
    (0, tslib_1.__metadata)("design:type", String)
], ComplaintEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => complaint_activity_entity_1.ComplaintActivityEntity, activity => activity.complaint),
    (0, tslib_1.__metadata)("design:type", Array)
], ComplaintEntity.prototype, "activities", void 0);
ComplaintEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('complaint')
], ComplaintEntity);
exports.ComplaintEntity = ComplaintEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/coupon.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
let CouponEntity = class CouponEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CouponEntity.prototype, "code", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], CouponEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CouponEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        default: 0
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponEntity.prototype, "manyUsersCanUse", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        default: 1
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponEntity.prototype, "manyTimesUserCanUse", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("float", {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponEntity.prototype, "minimumCost", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("float", {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponEntity.prototype, "maximumCost", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'startTimestamp' }),
    (0, tslib_1.__metadata)("design:type", Date)
], CouponEntity.prototype, "startAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'expirationTimestamp', nullable: true }),
    (0, tslib_1.__metadata)("design:type", Date)
], CouponEntity.prototype, "expireAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("tinyint", {
        default: 0
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponEntity.prototype, "discountPercent", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("float", {
        default: 0,
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponEntity.prototype, "discountFlat", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("float", {
        default: 0,
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], CouponEntity.prototype, "creditGift", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        default: true
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CouponEntity.prototype, "isEnabled", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        default: false
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CouponEntity.prototype, "isFirstTravelOnly", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.ServiceEntity, service => service.allowedCoupons),
    (0, typeorm_1.JoinTable)({ name: 'coupon_services_service' }),
    (0, tslib_1.__metadata)("design:type", Array)
], CouponEntity.prototype, "allowedServices", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => rider_entity_1.RiderEntity, rider => rider.coupons),
    (0, tslib_1.__metadata)("design:type", Array)
], CouponEntity.prototype, "riders", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, order => order.coupon, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' }),
    (0, tslib_1.__metadata)("design:type", Array)
], CouponEntity.prototype, "orders", void 0);
CouponEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('coupon')
], CouponEntity);
exports.CouponEntity = CouponEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/driver-transaction.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const driver_deduct_transaction_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-deduct-transaction-type.enum.ts");
const driver_recharge_transaction_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-recharge-transaction-type.enum.ts");
const transaction_action_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const transaction_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-status.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const payment_gateway_entity_1 = __webpack_require__("./libs/database/src/lib/entities/payment-gateway.entity.ts");
let DriverTransactionEntity = class DriverTransactionEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: 'transactionTime' }),
    (0, tslib_1.__metadata)("design:type", Date)
], DriverTransactionEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: transaction_status_enum_1.TransactionStatus,
        default: transaction_status_enum_1.TransactionStatus.Processing
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverTransactionEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', { enum: transaction_action_enum_1.TransactionAction }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverTransactionEntity.prototype, "action", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: driver_deduct_transaction_type_enum_1.DriverDeductTransactionType,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverTransactionEntity.prototype, "deductType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: driver_recharge_transaction_type_enum_1.DriverRechargeTransactionType,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverTransactionEntity.prototype, "rechargeType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionEntity.prototype, "amount", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('char', { length: '3' }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverTransactionEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentNumber' }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverTransactionEntity.prototype, "refrenceNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'details' }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverTransactionEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, driver => driver.transactions),
    (0, tslib_1.__metadata)("design:type", driver_entity_1.DriverEntity)
], DriverTransactionEntity.prototype, "driver", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionEntity.prototype, "driverId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, gateway => gateway.riderTransactions),
    (0, tslib_1.__metadata)("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], DriverTransactionEntity.prototype, "paymentGateway", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionEntity.prototype, "paymentGatewayId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.driverTransactions),
    (0, tslib_1.__metadata)("design:type", operator_entity_1.OperatorEntity)
], DriverTransactionEntity.prototype, "operator", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionEntity.prototype, "operatorId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.driverTransactions),
    (0, tslib_1.__metadata)("design:type", request_entity_1.RequestEntity)
], DriverTransactionEntity.prototype, "request", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionEntity.prototype, "requestId", void 0);
DriverTransactionEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('driver_transaction')
], DriverTransactionEntity);
exports.DriverTransactionEntity = DriverTransactionEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/driver-wallet.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverWalletEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
let DriverWalletEntity = class DriverWalletEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverWalletEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: 0.0,
        name: 'amount'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverWalletEntity.prototype, "balance", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('char', { length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverWalletEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, driver => driver.wallet, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", driver_entity_1.DriverEntity)
], DriverWalletEntity.prototype, "driver", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverWalletEntity.prototype, "driverId", void 0);
DriverWalletEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('driver_wallet')
], DriverWalletEntity);
exports.DriverWalletEntity = DriverWalletEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/driver.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const car_color_entity_1 = __webpack_require__("./libs/database/src/lib/entities/car-color.entity.ts");
const car_model_entity_1 = __webpack_require__("./libs/database/src/lib/entities/car-model.entity.ts");
const driver_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-transaction.entity.ts");
const driver_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-wallet.entity.ts");
const driver_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-status.enum.ts");
const gender_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts");
const feedback_entity_1 = __webpack_require__("./libs/database/src/lib/entities/feedback.entity.ts");
const fleet_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-transaction.entity.ts");
const fleet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet.entity.ts");
const media_entity_1 = __webpack_require__("./libs/database/src/lib/entities/media.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
let DriverEntity = class DriverEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "firstName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("bigint", {
        unique: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "mobileNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "certificateNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => car_model_entity_1.CarModelEntity, car => car.drivers, { onDelete: 'SET NULL' }),
    (0, tslib_1.__metadata)("design:type", car_model_entity_1.CarModelEntity)
], DriverEntity.prototype, "car", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverEntity.prototype, "carId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("varchar", {
        nullable: true,
        name: 'carColor'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "carColorLegacy", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => car_color_entity_1.CarColorEntity, carColor => carColor.drivers),
    (0, tslib_1.__metadata)("design:type", car_color_entity_1.CarColorEntity)
], DriverEntity.prototype, "carColor", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverEntity.prototype, "carColorId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('int', {
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverEntity.prototype, "carProductionYear", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "carPlate", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("enum", {
        default: driver_status_enum_1.DriverStatus.WaitingDocuments,
        enum: driver_status_enum_1.DriverStatus
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("enum", {
        nullable: true,
        enum: gender_enum_1.Gender
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "gender", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], DriverEntity.prototype, "registrationTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('tinyint', { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverEntity.prototype, "rating", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('smallint', { default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverEntity.prototype, "reviewCount", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", Date)
], DriverEntity.prototype, "lastSeenTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.ServiceEntity, service => service.drivers),
    (0, typeorm_1.JoinTable)({ name: 'driver_services_service' }),
    (0, tslib_1.__metadata)("design:type", Array)
], DriverEntity.prototype, "enabledServices", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => media_entity_1.MediaEntity, media => media.driverDocument),
    (0, tslib_1.__metadata)("design:type", Array)
], DriverEntity.prototype, "documents", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "accountNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "bankName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "bankRoutingNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "bankSwift", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "notificationPlayerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentsNote' }),
    (0, tslib_1.__metadata)("design:type", String)
], DriverEntity.prototype, "softRejectionNote", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, media => media.driver),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", media_entity_1.MediaEntity)
], DriverEntity.prototype, "media", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverEntity.prototype, "mediaId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.FeedbackEntity, feedback => feedback.driver),
    (0, tslib_1.__metadata)("design:type", Array)
], DriverEntity.prototype, "feedbacks", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, (fleet) => fleet.drivers),
    (0, tslib_1.__metadata)("design:type", fleet_entity_1.FleetEntity)
], DriverEntity.prototype, "fleet", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverEntity.prototype, "fleetId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => driver_wallet_entity_1.DriverWalletEntity, wallet => wallet.driver),
    (0, tslib_1.__metadata)("design:type", Array)
], DriverEntity.prototype, "wallet", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, driverTransaction => driverTransaction.driver, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' }),
    (0, tslib_1.__metadata)("design:type", Array)
], DriverEntity.prototype, "transactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, order => order.driver, { onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", Array)
], DriverEntity.prototype, "orders", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => fleet_transaction_entity_1.FleetTransactionEntity, fleetTransaction => fleetTransaction.driver),
    (0, tslib_1.__metadata)("design:type", Array)
], DriverEntity.prototype, "fleetTransactions", void 0);
DriverEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('driver')
], DriverEntity);
exports.DriverEntity = DriverEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/anouncement-user-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementUserType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var AnnouncementUserType;
(function (AnnouncementUserType) {
    AnnouncementUserType["Driver"] = "Driver";
    AnnouncementUserType["Rider"] = "Rider";
    AnnouncementUserType["Operator"] = "Operator";
})(AnnouncementUserType = exports.AnnouncementUserType || (exports.AnnouncementUserType = {}));
(0, graphql_1.registerEnumType)(AnnouncementUserType, { name: 'AnnouncementUserType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/complaint-activity-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var ComplaintActivityType;
(function (ComplaintActivityType) {
    ComplaintActivityType["AssignToOperator"] = "AssignedToOperator";
    ComplaintActivityType["Update"] = "Update";
    ComplaintActivityType["Resolved"] = "Resolved";
})(ComplaintActivityType = exports.ComplaintActivityType || (exports.ComplaintActivityType = {}));
(0, graphql_1.registerEnumType)(ComplaintActivityType, { name: 'ComplaintActivityType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/complaint-status.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintStatus = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var ComplaintStatus;
(function (ComplaintStatus) {
    ComplaintStatus["Submitted"] = "Submitted";
    ComplaintStatus["UnderInvestigation"] = "UnderInvestigation";
    ComplaintStatus["Resolved"] = "Resolved";
})(ComplaintStatus = exports.ComplaintStatus || (exports.ComplaintStatus = {}));
(0, graphql_1.registerEnumType)(ComplaintStatus, { name: 'ComplaintStatus' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/driver-deduct-transaction-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverDeductTransactionType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var DriverDeductTransactionType;
(function (DriverDeductTransactionType) {
    DriverDeductTransactionType["Withdraw"] = "Withdraw";
    DriverDeductTransactionType["Commission"] = "Commission";
    DriverDeductTransactionType["Correction"] = "Correction";
})(DriverDeductTransactionType = exports.DriverDeductTransactionType || (exports.DriverDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(DriverDeductTransactionType, { name: 'DriverDeductTransactionType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/driver-recharge-transaction-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var DriverRechargeTransactionType;
(function (DriverRechargeTransactionType) {
    DriverRechargeTransactionType["OrderFee"] = "OrderFee";
    DriverRechargeTransactionType["BankTransfer"] = "BankTransfer";
    DriverRechargeTransactionType["InAppPayment"] = "InAppPayment";
    DriverRechargeTransactionType["Gift"] = "Gift";
})(DriverRechargeTransactionType = exports.DriverRechargeTransactionType || (exports.DriverRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(DriverRechargeTransactionType, { name: 'DriverRechargeTransactionType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/driver-status.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverStatus = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["Online"] = "online";
    DriverStatus["Offline"] = "offline";
    DriverStatus["Blocked"] = "blocked";
    DriverStatus["InService"] = "in service";
    DriverStatus["WaitingDocuments"] = "waiting documents";
    DriverStatus["PendingApproval"] = "pending approval";
    DriverStatus["SoftReject"] = "soft reject";
    DriverStatus["HardReject"] = "hard reject";
})(DriverStatus = exports.DriverStatus || (exports.DriverStatus = {}));
(0, graphql_1.registerEnumType)(DriverStatus, { name: 'DriverStatus' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/gender.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Unknown"] = "unknown";
})(Gender = exports.Gender || (exports.Gender = {}));
(0, graphql_1.registerEnumType)(Gender, { name: 'Gender' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/message-status.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageStatus = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["Sent"] = "sent";
    MessageStatus["Delivered"] = "delivered";
    MessageStatus["Seen"] = "seen";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
(0, graphql_1.registerEnumType)(MessageStatus, { name: 'MessageStatus' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/operator-permission.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorPermission = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var OperatorPermission;
(function (OperatorPermission) {
    OperatorPermission["Drivers_View"] = "Drivers_View";
    OperatorPermission["Drivers_Edit"] = "Drivers_Edit";
    OperatorPermission["Riders_View"] = "Riders_View";
    OperatorPermission["Riders_Edit"] = "Riders_Edit";
    OperatorPermission["Regions_View"] = "Regions_View";
    OperatorPermission["Regions_Edit"] = "Regions_Edit";
    OperatorPermission["Services_View"] = "Services_View";
    OperatorPermission["Services_Edit"] = "Services_Edit";
    OperatorPermission["Complaints_View"] = "Complaints_View";
    OperatorPermission["Complaints_Edit"] = "Complaints_Edit";
    OperatorPermission["Coupons_View"] = "Coupons_View";
    OperatorPermission["Coupons_Edit"] = "Coupons_Edit";
    OperatorPermission["Announcements_View"] = "Announcements_View";
    OperatorPermission["Announcements_Edit"] = "Announcements_Edit";
    OperatorPermission["Requests_View"] = "Requests_View";
    OperatorPermission["Fleets_View"] = "Fleets_View";
    OperatorPermission["Fleets_Edit"] = "Fleets_Edit";
    OperatorPermission["Gateways_View"] = "Gateways_View";
    OperatorPermission["Gateways_Edit"] = "Gateways_Edit";
    OperatorPermission["Users_View"] = "Users_View";
    OperatorPermission["Users_Edit"] = "Users_Edit";
    OperatorPermission["Cars_View"] = "Cars_View";
    OperatorPermission["Cars_Edit"] = "Cars_Edit";
    OperatorPermission["FleetWallet_View"] = "FleetWallet_View";
    OperatorPermission["FleetWallet_Edit"] = "FleetWallet_Edit";
    OperatorPermission["ProviderWallet_View"] = "ProviderWallet_View";
    OperatorPermission["ProviderWallet_Edit"] = "ProviderWallet_Edit";
    OperatorPermission["DriverWallet_View"] = "DriverWallet_View";
    OperatorPermission["DriverWallet_Edit"] = "DriverWallet_Edit";
    OperatorPermission["RiderWallet_View"] = "RiderWallet_View";
    OperatorPermission["RiderWallet_Edit"] = "RiderWallet_Edit";
})(OperatorPermission = exports.OperatorPermission || (exports.OperatorPermission = {}));
(0, graphql_1.registerEnumType)(OperatorPermission, { name: 'OperatorPermission' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/order-status.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderStatus = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Requested"] = "Requested";
    OrderStatus["NotFound"] = "NotFound";
    OrderStatus["NoCloseFound"] = "NoCloseFound";
    OrderStatus["Found"] = "Found";
    OrderStatus["DriverAccepted"] = "DriverAccepted";
    OrderStatus["Arrived"] = "Arrived";
    OrderStatus["WaitingForPrePay"] = "WaitingForPrePay";
    OrderStatus["DriverCanceled"] = "DriverCanceled";
    OrderStatus["RiderCanceled"] = "RiderCanceled";
    OrderStatus["Started"] = "Started";
    OrderStatus["WaitingForPostPay"] = "WaitingForPostPay";
    OrderStatus["WaitingForReview"] = "WaitingForReview";
    OrderStatus["Finished"] = "Finished";
    OrderStatus["Booked"] = "Booked";
    OrderStatus["Expired"] = "Expired";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
(0, graphql_1.registerEnumType)(OrderStatus, { name: 'OrderStatus' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/payment-gateway-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var PaymentGatewayType;
(function (PaymentGatewayType) {
    PaymentGatewayType["Stripe"] = "stripe";
    PaymentGatewayType["BrainTree"] = "braintree";
    PaymentGatewayType["PayPal"] = "paypal";
    PaymentGatewayType["Paytm"] = "paytm";
    PaymentGatewayType["Razorpay"] = "razorpay";
    PaymentGatewayType["Paystack"] = "paystack";
    PaymentGatewayType["PayU"] = "payu";
    PaymentGatewayType["Instamojo"] = "instamojo";
    PaymentGatewayType["Flutterwave"] = "flutterwave";
    PaymentGatewayType["PayGate"] = "paygate";
    PaymentGatewayType["MIPS"] = "mips";
    PaymentGatewayType["MercadoPago"] = "mercadopago";
    PaymentGatewayType["AmazonPaymentServices"] = "amazon";
    PaymentGatewayType["MyTMoney"] = "mytmoney";
    PaymentGatewayType["WayForPay"] = "wayforpay";
    PaymentGatewayType["CustomLink"] = "link";
})(PaymentGatewayType = exports.PaymentGatewayType || (exports.PaymentGatewayType = {}));
(0, graphql_1.registerEnumType)(PaymentGatewayType, { name: 'PaymentGatewayType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/payment-status.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentStatus = void 0;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Processing"] = "processing";
    PaymentStatus["Success"] = "success";
    PaymentStatus["Canceled"] = "canceled";
    PaymentStatus["Failed"] = "failed";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderDeductTransactionType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var ProviderDeductTransactionType;
(function (ProviderDeductTransactionType) {
    ProviderDeductTransactionType["Withdraw"] = "Withdraw";
})(ProviderDeductTransactionType = exports.ProviderDeductTransactionType || (exports.ProviderDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(ProviderDeductTransactionType, { name: 'ProviderDeductTransactionType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var ProviderRechargeTransactionType;
(function (ProviderRechargeTransactionType) {
    ProviderRechargeTransactionType["Commission"] = "Commission";
})(ProviderRechargeTransactionType = exports.ProviderRechargeTransactionType || (exports.ProviderRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(ProviderRechargeTransactionType, { name: 'ProviderRechargeTransactionType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/rider-address-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var RiderAddressType;
(function (RiderAddressType) {
    RiderAddressType["Home"] = "Home";
    RiderAddressType["Work"] = "Work";
    RiderAddressType["Partner"] = "Partner";
    RiderAddressType["Other"] = "Other";
})(RiderAddressType = exports.RiderAddressType || (exports.RiderAddressType = {}));
(0, graphql_1.registerEnumType)(RiderAddressType, { name: 'RiderAddressType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/rider-deduct-transaction-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDeductTransactionType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var RiderDeductTransactionType;
(function (RiderDeductTransactionType) {
    RiderDeductTransactionType["OrderFee"] = "OrderFee";
    RiderDeductTransactionType["Withdraw"] = "Withdraw";
    RiderDeductTransactionType["Correction"] = "Correction";
})(RiderDeductTransactionType = exports.RiderDeductTransactionType || (exports.RiderDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(RiderDeductTransactionType, { name: 'RiderDeductTransactionType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/rider-document-type.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDocumentType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var RiderDocumentType;
(function (RiderDocumentType) {
    RiderDocumentType["ID"] = "ID";
    RiderDocumentType["Passport"] = "Passport";
    RiderDocumentType["DriverLicense"] = "DriverLicense";
    RiderDocumentType["ResidentPermitID"] = "ResidentPermitID";
})(RiderDocumentType = exports.RiderDocumentType || (exports.RiderDocumentType = {}));
(0, graphql_1.registerEnumType)(RiderDocumentType, { name: 'RiderDocumentType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/rider-recharge-transaction-type.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var RiderRechargeTransactionType;
(function (RiderRechargeTransactionType) {
    RiderRechargeTransactionType["BankTransfer"] = "BankTransfer";
    RiderRechargeTransactionType["Gift"] = "Gift";
    RiderRechargeTransactionType["Correction"] = "Correction";
    RiderRechargeTransactionType["InAppPayment"] = "InAppPayment";
})(RiderRechargeTransactionType = exports.RiderRechargeTransactionType || (exports.RiderRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(RiderRechargeTransactionType, { name: 'RiderRechargeTransactionType' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/rider-status.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderStatus = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var RiderStatus;
(function (RiderStatus) {
    RiderStatus["Enabled"] = "enabled";
    RiderStatus["Disabled"] = "blocked";
})(RiderStatus = exports.RiderStatus || (exports.RiderStatus = {}));
(0, graphql_1.registerEnumType)(RiderStatus, { name: 'RiderStatus' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/service-distance-fee-mode.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDistanceFeeMode = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var ServiceDistanceFeeMode;
(function (ServiceDistanceFeeMode) {
    ServiceDistanceFeeMode["None"] = "None";
    ServiceDistanceFeeMode["PickupToDestination"] = "PickupToDestination";
    ServiceDistanceFeeMode["Radial"] = "Radial";
})(ServiceDistanceFeeMode = exports.ServiceDistanceFeeMode || (exports.ServiceDistanceFeeMode = {}));
(0, graphql_1.registerEnumType)(ServiceDistanceFeeMode, { name: 'ServiceDistanceFeeMode' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/service-payment-method.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicePaymentMethod = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var ServicePaymentMethod;
(function (ServicePaymentMethod) {
    ServicePaymentMethod["CashCredit"] = "CashCredit";
    ServicePaymentMethod["OnlyCredit"] = "OnlyCredit";
    ServicePaymentMethod["OnlyCash"] = "OnlyCash";
})(ServicePaymentMethod = exports.ServicePaymentMethod || (exports.ServicePaymentMethod = {}));
(0, graphql_1.registerEnumType)(ServicePaymentMethod, { name: 'ServicePaymentMethod' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/transaction-action.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionAction = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var TransactionAction;
(function (TransactionAction) {
    TransactionAction["Recharge"] = "Recharge";
    TransactionAction["Deduct"] = "Deduct";
})(TransactionAction = exports.TransactionAction || (exports.TransactionAction = {}));
(0, graphql_1.registerEnumType)(TransactionAction, { name: 'TransactionAction' });


/***/ }),

/***/ "./libs/database/src/lib/entities/enums/transaction-status.enum.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionStatus = void 0;
const graphql_1 = __webpack_require__("@nestjs/graphql");
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Processing"] = "Processing";
    TransactionStatus["Done"] = "Done";
    TransactionStatus["Canceled"] = "Canceled";
    TransactionStatus["Rejected"] = "Rejected";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
(0, graphql_1.registerEnumType)(TransactionStatus, { name: 'TransactionStatus' });


/***/ }),

/***/ "./libs/database/src/lib/entities/feedback-parameter.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const feedback_entity_1 = __webpack_require__("./libs/database/src/lib/entities/feedback.entity.ts");
let FeedbackParameterEntity = class FeedbackParameterEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackParameterEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], FeedbackParameterEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], FeedbackParameterEntity.prototype, "isGood", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => feedback_entity_1.FeedbackEntity, feedback => feedback.parameters),
    (0, typeorm_1.JoinTable)(),
    (0, tslib_1.__metadata)("design:type", Array)
], FeedbackParameterEntity.prototype, "feedbacks", void 0);
FeedbackParameterEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('review_parameter')
], FeedbackParameterEntity);
exports.FeedbackParameterEntity = FeedbackParameterEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/feedback.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const feedback_parameter_entity_1 = __webpack_require__("./libs/database/src/lib/entities/feedback-parameter.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
let FeedbackEntity = class FeedbackEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], FeedbackEntity.prototype, "reviewTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('tinyint'),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackEntity.prototype, "score", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'review', nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], FeedbackEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, driver => driver.feedbacks),
    (0, tslib_1.__metadata)("design:type", driver_entity_1.DriverEntity)
], FeedbackEntity.prototype, "driver", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackEntity.prototype, "driverId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => request_entity_1.RequestEntity, order => order.review),
    (0, tslib_1.__metadata)("design:type", request_entity_1.RequestEntity)
], FeedbackEntity.prototype, "request", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FeedbackEntity.prototype, "requestId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => feedback_parameter_entity_1.FeedbackParameterEntity, feedbackParameter => feedbackParameter.feedbacks),
    (0, tslib_1.__metadata)("design:type", Array)
], FeedbackEntity.prototype, "parameters", void 0);
FeedbackEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('request_review')
], FeedbackEntity);
exports.FeedbackEntity = FeedbackEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/fleet-transaction.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetTransactionEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const provider_deduct_transaction_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts");
const provider_recharge_transaction_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts");
const transaction_action_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const fleet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet.entity.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
let FleetTransactionEntity = class FleetTransactionEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: 'transactionTime' }),
    (0, tslib_1.__metadata)("design:type", Date)
], FleetTransactionEntity.prototype, "transactionTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', { enum: transaction_action_enum_1.TransactionAction }),
    (0, tslib_1.__metadata)("design:type", String)
], FleetTransactionEntity.prototype, "action", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: provider_deduct_transaction_type_enum_1.ProviderDeductTransactionType,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], FleetTransactionEntity.prototype, "deductType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], FleetTransactionEntity.prototype, "rechargeType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionEntity.prototype, "amount", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('char', { length: '3' }),
    (0, tslib_1.__metadata)("design:type", String)
], FleetTransactionEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentNumber' }),
    (0, tslib_1.__metadata)("design:type", String)
], FleetTransactionEntity.prototype, "refrenceNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'details' }),
    (0, tslib_1.__metadata)("design:type", String)
], FleetTransactionEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.fleetTransactions),
    (0, tslib_1.__metadata)("design:type", request_entity_1.RequestEntity)
], FleetTransactionEntity.prototype, "request", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionEntity.prototype, "requestId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, driver => driver.fleetTransactions),
    (0, tslib_1.__metadata)("design:type", driver_entity_1.DriverEntity)
], FleetTransactionEntity.prototype, "driver", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionEntity.prototype, "driverId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, fleet => fleet.transactions),
    (0, tslib_1.__metadata)("design:type", fleet_entity_1.FleetEntity)
], FleetTransactionEntity.prototype, "fleet", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionEntity.prototype, "fleetId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.fleetTransactions),
    (0, tslib_1.__metadata)("design:type", operator_entity_1.OperatorEntity)
], FleetTransactionEntity.prototype, "operator", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'operatorId' }),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetTransactionEntity.prototype, "operatorId", void 0);
FleetTransactionEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('fleet_transaction')
], FleetTransactionEntity);
exports.FleetTransactionEntity = FleetTransactionEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/fleet-wallet.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetWalletEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const fleet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet.entity.ts");
let FleetWalletEntity = class FleetWalletEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetWalletEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: 0.0,
        name: 'amount'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetWalletEntity.prototype, "balance", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], FleetWalletEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, fleet => fleet.wallet),
    (0, tslib_1.__metadata)("design:type", fleet_entity_1.FleetEntity)
], FleetWalletEntity.prototype, "fleet", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetWalletEntity.prototype, "fleetId", void 0);
FleetWalletEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('fleet_wallet')
], FleetWalletEntity);
exports.FleetWalletEntity = FleetWalletEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/fleet.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const fleet_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-transaction.entity.ts");
const fleet_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-wallet.entity.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
let FleetEntity = class FleetEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], FleetEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('bigint'),
    (0, tslib_1.__metadata)("design:type", String)
], FleetEntity.prototype, "phoneNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], FleetEntity.prototype, "accountNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('bigint'),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetEntity.prototype, "mobileNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('tinyint', { default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetEntity.prototype, "commissionSharePercent", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', { default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], FleetEntity.prototype, "commissionShareFlat", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], FleetEntity.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => driver_entity_1.DriverEntity, driver => driver.fleet),
    (0, tslib_1.__metadata)("design:type", Array)
], FleetEntity.prototype, "drivers", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => fleet_wallet_entity_1.FleetWalletEntity, wallet => wallet.fleet),
    (0, tslib_1.__metadata)("design:type", Array)
], FleetEntity.prototype, "wallet", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => fleet_transaction_entity_1.FleetTransactionEntity, fleetTransaction => fleetTransaction.fleet, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' }),
    (0, tslib_1.__metadata)("design:type", Array)
], FleetEntity.prototype, "transactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => operator_entity_1.OperatorEntity, operator => operator.fleet),
    (0, tslib_1.__metadata)("design:type", Array)
], FleetEntity.prototype, "operators", void 0);
FleetEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('fleet')
], FleetEntity);
exports.FleetEntity = FleetEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/media.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const announcement_entity_1 = __webpack_require__("./libs/database/src/lib/entities/announcement.entity.ts");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
let MediaEntity = class MediaEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], MediaEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("varchar"),
    (0, tslib_1.__metadata)("design:type", String)
], MediaEntity.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("longtext", {
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], MediaEntity.prototype, "base64", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => driver_entity_1.DriverEntity, driver => driver.media, { onDelete: 'SET NULL' }),
    (0, tslib_1.__metadata)("design:type", driver_entity_1.DriverEntity)
], MediaEntity.prototype, "driver", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, driver => driver.documents, { onDelete: 'SET NULL' }),
    (0, tslib_1.__metadata)("design:type", driver_entity_1.DriverEntity)
], MediaEntity.prototype, "driverDocument", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], MediaEntity.prototype, "driverDocumentId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => operator_entity_1.OperatorEntity, operator => operator.media, { onDelete: 'SET NULL' }),
    (0, tslib_1.__metadata)("design:type", operator_entity_1.OperatorEntity)
], MediaEntity.prototype, "operator", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => announcement_entity_1.AnnouncementEntity, announcement => announcement.media, { onDelete: 'SET NULL' }),
    (0, tslib_1.__metadata)("design:type", announcement_entity_1.AnnouncementEntity)
], MediaEntity.prototype, "announcement", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => rider_entity_1.RiderEntity, rider => rider.media, { onDelete: 'SET NULL' }),
    (0, tslib_1.__metadata)("design:type", Array)
], MediaEntity.prototype, "rider", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => service_entity_1.ServiceEntity, service => service.media, { onDelete: 'SET NULL' }),
    (0, tslib_1.__metadata)("design:type", Array)
], MediaEntity.prototype, "service", void 0);
MediaEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('media')
], MediaEntity);
exports.MediaEntity = MediaEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/operator-role.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorRoleEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const operator_permission_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/operator-permission.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
let OperatorRoleEntity = class OperatorRoleEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], OperatorRoleEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], OperatorRoleEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('set', {
        enum: operator_permission_enum_1.OperatorPermission
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], OperatorRoleEntity.prototype, "permissions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => operator_entity_1.OperatorEntity, operator => operator.role),
    (0, tslib_1.__metadata)("design:type", Array)
], OperatorRoleEntity.prototype, "operators", void 0);
OperatorRoleEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('operator_role')
], OperatorRoleEntity);
exports.OperatorRoleEntity = OperatorRoleEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/operator.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const complaint_activity_entity_1 = __webpack_require__("./libs/database/src/lib/entities/complaint-activity.entity.ts");
const driver_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-transaction.entity.ts");
const fleet_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-transaction.entity.ts");
const fleet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet.entity.ts");
const media_entity_1 = __webpack_require__("./libs/database/src/lib/entities/media.entity.ts");
const operator_role_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator-role.entity.ts");
const provider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-transaction.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const rider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-transaction.entity.ts");
let OperatorEntity = class OperatorEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], OperatorEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], OperatorEntity.prototype, "firstName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], OperatorEntity.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], OperatorEntity.prototype, "userName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: 'admin' }),
    (0, tslib_1.__metadata)("design:type", String)
], OperatorEntity.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('bigint', {
        nullable: true,
        unique: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], OperatorEntity.prototype, "mobileNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], OperatorEntity.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], OperatorEntity.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, media => media.operator),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", media_entity_1.MediaEntity)
], OperatorEntity.prototype, "media", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], OperatorEntity.prototype, "mediaId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => operator_role_entity_1.OperatorRoleEntity, role => role.operators),
    (0, tslib_1.__metadata)("design:type", operator_role_entity_1.OperatorRoleEntity)
], OperatorEntity.prototype, "role", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], OperatorEntity.prototype, "roleId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, fleet => fleet.operators),
    (0, tslib_1.__metadata)("design:type", fleet_entity_1.FleetEntity)
], OperatorEntity.prototype, "fleet", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, request => request.operator, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    (0, tslib_1.__metadata)("design:type", Array)
], OperatorEntity.prototype, "requests", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => complaint_activity_entity_1.ComplaintActivityEntity, activity => activity.actor),
    (0, tslib_1.__metadata)("design:type", Array)
], OperatorEntity.prototype, "complaintActivities", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => rider_transaction_entity_1.RiderTransactionEntity, riderTransaction => riderTransaction.operator),
    (0, tslib_1.__metadata)("design:type", Array)
], OperatorEntity.prototype, "riderTransactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, driverTransaction => driverTransaction.operator),
    (0, tslib_1.__metadata)("design:type", Array)
], OperatorEntity.prototype, "driverTransactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => fleet_transaction_entity_1.FleetTransactionEntity, fleetTransaction => fleetTransaction.operator),
    (0, tslib_1.__metadata)("design:type", Array)
], OperatorEntity.prototype, "fleetTransactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => provider_transaction_entity_1.ProviderTransactionEntity, providerTransaction => providerTransaction.operator),
    (0, tslib_1.__metadata)("design:type", Array)
], OperatorEntity.prototype, "providerTransactions", void 0);
OperatorEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('operator')
], OperatorEntity);
exports.OperatorEntity = OperatorEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/payment-gateway.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const rider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-transaction.entity.ts");
const payment_gateway_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/payment-gateway-type.enum.ts");
const provider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-transaction.entity.ts");
let PaymentGatewayEntity = class PaymentGatewayEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], PaymentGatewayEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        default: true
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], PaymentGatewayEntity.prototype, "enabled", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentGatewayEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: payment_gateway_type_enum_1.PaymentGatewayType
    }),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentGatewayEntity.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true,
        length: 1000
    }),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentGatewayEntity.prototype, "publicKey", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentGatewayEntity.prototype, "privateKey", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentGatewayEntity.prototype, "saltKey", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentGatewayEntity.prototype, "merchantId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (order) => order.paymentGateway),
    (0, tslib_1.__metadata)("design:type", Array)
], PaymentGatewayEntity.prototype, "orders", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => rider_transaction_entity_1.RiderTransactionEntity, (userTransaction) => userTransaction.paymentGateway),
    (0, tslib_1.__metadata)("design:type", Array)
], PaymentGatewayEntity.prototype, "riderTransactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => provider_transaction_entity_1.ProviderTransactionEntity, (adminTransaction) => adminTransaction.paymentGateway),
    (0, tslib_1.__metadata)("design:type", Array)
], PaymentGatewayEntity.prototype, "adminTransactions", void 0);
PaymentGatewayEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('payment_gateway')
], PaymentGatewayEntity);
exports.PaymentGatewayEntity = PaymentGatewayEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/payment.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const Entity_1 = __webpack_require__("typeorm/decorator/entity/Entity");
const payment_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/payment-status.enum.ts");
let PaymentEntity = class PaymentEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], PaymentEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: payment_status_enum_1.PaymentStatus,
        default: payment_status_enum_1.PaymentStatus.Processing
    }),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], PaymentEntity.prototype, "amount", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentEntity.prototype, "transactionNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentEntity.prototype, "userType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentEntity.prototype, "userId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('int'),
    (0, tslib_1.__metadata)("design:type", Number)
], PaymentEntity.prototype, "gatewayId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], PaymentEntity.prototype, "returnUrl", void 0);
PaymentEntity = (0, tslib_1.__decorate)([
    (0, Entity_1.Entity)('payment')
], PaymentEntity);
exports.PaymentEntity = PaymentEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/provider-transaction.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderTransactionEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const provider_deduct_transaction_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-deduct-transaction-type.enum.ts");
const provider_recharge_transaction_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/provider-recharge-transaction-type.enum.ts");
const transaction_action_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const payment_gateway_entity_1 = __webpack_require__("./libs/database/src/lib/entities/payment-gateway.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
let ProviderTransactionEntity = class ProviderTransactionEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderTransactionEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: 'transactionTime' }),
    (0, tslib_1.__metadata)("design:type", Date)
], ProviderTransactionEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', { enum: transaction_action_enum_1.TransactionAction }),
    (0, tslib_1.__metadata)("design:type", String)
], ProviderTransactionEntity.prototype, "action", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: provider_deduct_transaction_type_enum_1.ProviderDeductTransactionType,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], ProviderTransactionEntity.prototype, "deductType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], ProviderTransactionEntity.prototype, "rechargeType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderTransactionEntity.prototype, "amount", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('char', { length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], ProviderTransactionEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentNumber' }),
    (0, tslib_1.__metadata)("design:type", String)
], ProviderTransactionEntity.prototype, "refrenceNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'details' }),
    (0, tslib_1.__metadata)("design:type", String)
], ProviderTransactionEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.providerTransactions),
    (0, tslib_1.__metadata)("design:type", operator_entity_1.OperatorEntity)
], ProviderTransactionEntity.prototype, "operator", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderTransactionEntity.prototype, "operatorId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.providerTransactions, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", request_entity_1.RequestEntity)
], ProviderTransactionEntity.prototype, "request", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderTransactionEntity.prototype, "requestId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, gateway => gateway.adminTransactions, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], ProviderTransactionEntity.prototype, "paymentGateway", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderTransactionEntity.prototype, "paymentGatewayId", void 0);
ProviderTransactionEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('admin_transaction')
], ProviderTransactionEntity);
exports.ProviderTransactionEntity = ProviderTransactionEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/provider-wallet.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderWalletEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let ProviderWalletEntity = class ProviderWalletEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderWalletEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: 0.0,
        name: 'amount'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ProviderWalletEntity.prototype, "balance", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], ProviderWalletEntity.prototype, "currency", void 0);
ProviderWalletEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('admin_wallet')
], ProviderWalletEntity);
exports.ProviderWalletEntity = ProviderWalletEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/region.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const polygon_transformer_1 = __webpack_require__("./libs/database/src/lib/transformers/polygon.transformer.ts");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
let RegionEntity = class RegionEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RegionEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], RegionEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('char', { length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], RegionEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        default: true
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], RegionEntity.prototype, "enabled", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("polygon", {
        transformer: new polygon_transformer_1.PolygonTransformer()
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], RegionEntity.prototype, "location", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.ServiceEntity, service => service.regions),
    (0, tslib_1.__metadata)("design:type", Array)
], RegionEntity.prototype, "services", void 0);
RegionEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('region')
], RegionEntity);
exports.RegionEntity = RegionEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/request-message.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const message_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/message-status.enum.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
let OrderMessageEntity = class OrderMessageEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderMessageEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], OrderMessageEntity.prototype, "sentAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], OrderMessageEntity.prototype, "sentByDriver", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        name: 'state',
        enum: message_status_enum_1.MessageStatus,
        default: message_status_enum_1.MessageStatus.Sent
    }),
    (0, tslib_1.__metadata)("design:type", String)
], OrderMessageEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], OrderMessageEntity.prototype, "content", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.conversation),
    (0, tslib_1.__metadata)("design:type", request_entity_1.RequestEntity)
], OrderMessageEntity.prototype, "request", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderMessageEntity.prototype, "requestId", void 0);
OrderMessageEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('request_chat')
], OrderMessageEntity);
exports.OrderMessageEntity = OrderMessageEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/request.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const multipoint_transformer_1 = __webpack_require__("./libs/database/src/lib/transformers/multipoint.transformer.ts");
const complaint_entity_1 = __webpack_require__("./libs/database/src/lib/entities/complaint.entity.ts");
const coupon_entity_1 = __webpack_require__("./libs/database/src/lib/entities/coupon.entity.ts");
const driver_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-transaction.entity.ts");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const order_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/order-status.enum.ts");
const feedback_entity_1 = __webpack_require__("./libs/database/src/lib/entities/feedback.entity.ts");
const fleet_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-transaction.entity.ts");
const request_message_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request-message.entity.ts");
const payment_gateway_entity_1 = __webpack_require__("./libs/database/src/lib/entities/payment-gateway.entity.ts");
const provider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-transaction.entity.ts");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
const rider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-transaction.entity.ts");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
let RequestEntity = class RequestEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: 'requestTimestamp' }),
    (0, tslib_1.__metadata)("design:type", Date)
], RequestEntity.prototype, "createdOn", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Date)
], RequestEntity.prototype, "startTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Date)
], RequestEntity.prototype, "finishTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: order_status_enum_1.OrderStatus,
        default: order_status_enum_1.OrderStatus.Requested
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RequestEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('int', { default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "distanceBest", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('int', { default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "durationBest", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Date)
], RequestEntity.prototype, "expectedTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Date)
], RequestEntity.prototype, "etaPickup", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "costBest", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
        default: '0.00'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "costAfterCoupon", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: 0,
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "paidAmount", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("float", {
        precision: 10,
        default: 0,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "providerShare", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("varchar", {
        transformer: {
            to(value) {
                return value.join('|');
            },
            from(value) {
                if (value == null)
                    return [];
                return value.split('|');
            }
        },
        length: 500
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], RequestEntity.prototype, "addresses", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('multipoint', {
        transformer: new multipoint_transformer_1.MultipointTransformer()
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], RequestEntity.prototype, "points", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, driver => driver.orders),
    (0, tslib_1.__metadata)("design:type", driver_entity_1.DriverEntity)
], RequestEntity.prototype, "driver", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "driverId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, rider => rider.orders),
    (0, tslib_1.__metadata)("design:type", rider_entity_1.RiderEntity)
], RequestEntity.prototype, "rider", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "riderId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => coupon_entity_1.CouponEntity, coupon => coupon.orders),
    (0, tslib_1.__metadata)("design:type", coupon_entity_1.CouponEntity)
], RequestEntity.prototype, "coupon", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "couponId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('char', { length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], RequestEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => request_message_entity_1.OrderMessageEntity, message => message.request),
    (0, tslib_1.__metadata)("design:type", Array)
], RequestEntity.prototype, "conversation", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, gateway => gateway.orders),
    (0, tslib_1.__metadata)("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], RequestEntity.prototype, "paymentGateway", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "paymentGatewayId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => complaint_entity_1.ComplaintEntity, complaint => complaint.request),
    (0, tslib_1.__metadata)("design:type", Array)
], RequestEntity.prototype, "complaints", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.ServiceEntity, service => service.requests),
    (0, tslib_1.__metadata)("design:type", service_entity_1.ServiceEntity)
], RequestEntity.prototype, "service", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "serviceId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.requests, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", operator_entity_1.OperatorEntity)
], RequestEntity.prototype, "operator", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "operatorId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => rider_transaction_entity_1.RiderTransactionEntity, riderTransaction => riderTransaction.request),
    (0, tslib_1.__metadata)("design:type", Array)
], RequestEntity.prototype, "riderTransactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => fleet_transaction_entity_1.FleetTransactionEntity, fleetTransaction => fleetTransaction.request),
    (0, tslib_1.__metadata)("design:type", Array)
], RequestEntity.prototype, "fleetTransactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => feedback_entity_1.FeedbackEntity, feedback => feedback.request),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", feedback_entity_1.FeedbackEntity)
], RequestEntity.prototype, "review", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], RequestEntity.prototype, "reviewId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, transaction => transaction.request),
    (0, tslib_1.__metadata)("design:type", Array)
], RequestEntity.prototype, "driverTransactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => provider_transaction_entity_1.ProviderTransactionEntity, transaction => transaction.request),
    (0, tslib_1.__metadata)("design:type", Array)
], RequestEntity.prototype, "providerTransactions", void 0);
RequestEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('request')
], RequestEntity);
exports.RequestEntity = RequestEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/rider-address.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const point_1 = __webpack_require__("./libs/database/src/lib/interfaces/point.ts");
const point_transformer_1 = __webpack_require__("./libs/database/src/lib/transformers/point.transformer.ts");
const rider_address_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-address-type.enum.ts");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
let RiderAddressEntity = class RiderAddressEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderAddressEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: rider_address_type_enum_1.RiderAddressType,
        default: rider_address_type_enum_1.RiderAddressType.Other
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderAddressEntity.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], RiderAddressEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'address' }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderAddressEntity.prototype, "details", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('point', {
        transformer: new point_transformer_1.PointTransformer()
    }),
    (0, tslib_1.__metadata)("design:type", point_1.Point)
], RiderAddressEntity.prototype, "location", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, rider => rider.addresses),
    (0, tslib_1.__metadata)("design:type", rider_entity_1.RiderEntity)
], RiderAddressEntity.prototype, "rider", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderAddressEntity.prototype, "riderId", void 0);
RiderAddressEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('rider_address')
], RiderAddressEntity);
exports.RiderAddressEntity = RiderAddressEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/rider-entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const coupon_entity_1 = __webpack_require__("./libs/database/src/lib/entities/coupon.entity.ts");
const gender_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/gender.enum.ts");
const rider_document_type_1 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-document-type.ts");
const rider_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-status.enum.ts");
const media_entity_1 = __webpack_require__("./libs/database/src/lib/entities/media.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const rider_address_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-address.entity.ts");
const rider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-transaction.entity.ts");
const rider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-wallet.entity.ts");
let RiderEntity = class RiderEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: rider_status_enum_1.RiderStatus,
        default: rider_status_enum_1.RiderStatus.Enabled
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "firstName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("bigint", {
        unique: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "mobileNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], RiderEntity.prototype, "registrationTimestamp", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: gender_enum_1.Gender,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "gender", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('varchar', {
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], RiderEntity.prototype, "isResident", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "idNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        nullable: true,
        //enum: RiderDocumentType
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "documentType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderEntity.prototype, "notificationPlayerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => rider_address_entity_1.RiderAddressEntity, address => address.rider),
    (0, tslib_1.__metadata)("design:type", Array)
], RiderEntity.prototype, "addresses", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, media => media.rider),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", media_entity_1.MediaEntity)
], RiderEntity.prototype, "media", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderEntity.prototype, "mediaId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, order => order.rider),
    (0, tslib_1.__metadata)("design:type", Array)
], RiderEntity.prototype, "orders", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => rider_wallet_entity_1.RiderWalletEntity, wallet => wallet.rider),
    (0, tslib_1.__metadata)("design:type", Array)
], RiderEntity.prototype, "wallets", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => rider_transaction_entity_1.RiderTransactionEntity, riderTransaction => riderTransaction.rider, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' }),
    (0, tslib_1.__metadata)("design:type", Array)
], RiderEntity.prototype, "transactions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => coupon_entity_1.CouponEntity, coupon => coupon.riders),
    (0, typeorm_1.JoinTable)(),
    (0, tslib_1.__metadata)("design:type", Array)
], RiderEntity.prototype, "coupons", void 0);
RiderEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('rider')
], RiderEntity);
exports.RiderEntity = RiderEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/rider-transaction.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderTransactionEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const rider_deduct_transaction_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-deduct-transaction-type.enum.ts");
const rider_recharge_transaction_type_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/rider-recharge-transaction-type.enum.ts");
const transaction_action_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-action.enum.ts");
const transaction_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/transaction-status.enum.ts");
const operator_entity_1 = __webpack_require__("./libs/database/src/lib/entities/operator.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const payment_gateway_entity_1 = __webpack_require__("./libs/database/src/lib/entities/payment-gateway.entity.ts");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
let RiderTransactionEntity = class RiderTransactionEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: 'transactionTime' }),
    (0, tslib_1.__metadata)("design:type", Date)
], RiderTransactionEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: transaction_status_enum_1.TransactionStatus,
        default: transaction_status_enum_1.TransactionStatus.Processing
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderTransactionEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', { enum: transaction_action_enum_1.TransactionAction }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderTransactionEntity.prototype, "action", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: rider_deduct_transaction_type_enum_1.RiderDeductTransactionType,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderTransactionEntity.prototype, "deductType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: rider_recharge_transaction_type_enum_1.RiderRechargeTransactionType,
        nullable: true
    }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderTransactionEntity.prototype, "rechargeType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionEntity.prototype, "amount", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('char', { length: '3' }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderTransactionEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentNumber' }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderTransactionEntity.prototype, "refrenceNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'details' }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderTransactionEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, rider => rider.transactions),
    (0, tslib_1.__metadata)("design:type", rider_entity_1.RiderEntity)
], RiderTransactionEntity.prototype, "rider", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionEntity.prototype, "riderId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, gateway => gateway.riderTransactions),
    (0, tslib_1.__metadata)("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], RiderTransactionEntity.prototype, "paymentGateway", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionEntity.prototype, "paymentGatewayId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.riderTransactions),
    (0, tslib_1.__metadata)("design:type", operator_entity_1.OperatorEntity)
], RiderTransactionEntity.prototype, "operator", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, name: 'operatorId' }),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionEntity.prototype, "operatorId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.riderTransactions),
    (0, tslib_1.__metadata)("design:type", request_entity_1.RequestEntity)
], RiderTransactionEntity.prototype, "request", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderTransactionEntity.prototype, "requestId", void 0);
RiderTransactionEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('rider_transaction')
], RiderTransactionEntity);
exports.RiderTransactionEntity = RiderTransactionEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/rider-wallet.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderWalletEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
let RiderWalletEntity = class RiderWalletEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderWalletEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: 0.0,
        name: 'amount'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderWalletEntity.prototype, "balance", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('char', { length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], RiderWalletEntity.prototype, "currency", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, rider => rider.wallets),
    (0, tslib_1.__metadata)("design:type", rider_entity_1.RiderEntity)
], RiderWalletEntity.prototype, "rider", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderWalletEntity.prototype, "riderId", void 0);
RiderWalletEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('rider_wallet')
], RiderWalletEntity);
exports.RiderWalletEntity = RiderWalletEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/service-category.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
let ServiceCategoryEntity = class ServiceCategoryEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceCategoryEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'title' }),
    (0, tslib_1.__metadata)("design:type", String)
], ServiceCategoryEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => service_entity_1.ServiceEntity, service => service.category),
    (0, tslib_1.__metadata)("design:type", Array)
], ServiceCategoryEntity.prototype, "services", void 0);
ServiceCategoryEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('service_category')
], ServiceCategoryEntity);
exports.ServiceCategoryEntity = ServiceCategoryEntity;


/***/ }),

/***/ "./libs/database/src/lib/entities/service.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const distance_multiplier_transformer_1 = __webpack_require__("./libs/database/src/lib/transformers/distance-multiplier.transformer.ts");
const time_multiplier_transformer_1 = __webpack_require__("./libs/database/src/lib/transformers/time-multiplier.transformer.ts");
const coupon_entity_1 = __webpack_require__("./libs/database/src/lib/entities/coupon.entity.ts");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const service_distance_fee_mode_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/service-distance-fee-mode.enum.ts");
const service_payment_method_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/service-payment-method.enum.ts");
const media_entity_1 = __webpack_require__("./libs/database/src/lib/entities/media.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const region_entity_1 = __webpack_require__("./libs/database/src/lib/entities/region.entity.ts");
const service_category_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service-category.entity.ts");
let ServiceEntity = class ServiceEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => service_category_entity_1.ServiceCategoryEntity, category => category.services, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", service_category_entity_1.ServiceCategoryEntity)
], ServiceEntity.prototype, "category", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "categoryId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'title' }),
    (0, tslib_1.__metadata)("design:type", String)
], ServiceEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 12,
        scale: 2,
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "baseFare", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 12,
        scale: 2,
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "perHundredMeters", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 12,
        scale: 2,
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "perMinuteDrive", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "minimumFee", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('int', {
        default: 10000
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "searchRadius", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: service_payment_method_enum_1.ServicePaymentMethod,
        default: service_payment_method_enum_1.ServicePaymentMethod.CashCredit
    }),
    (0, tslib_1.__metadata)("design:type", String)
], ServiceEntity.prototype, "paymentMethod", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('enum', {
        enum: service_distance_fee_mode_enum_1.ServiceDistanceFeeMode,
        default: service_distance_fee_mode_enum_1.ServiceDistanceFeeMode.PickupToDestination
    }),
    (0, tslib_1.__metadata)("design:type", String)
], ServiceEntity.prototype, "distanceFeeMode", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('time', {
        default: '00:00'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], ServiceEntity.prototype, "availableTimeFrom", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('time', {
        default: '23:59'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], ServiceEntity.prototype, "availableTimeTo", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('int', { default: 0, name: 'maxDestinationDistance' }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "maximumDestinationDistance", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('tinyint', { default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "prepayPercent", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "cancellationTotalFee", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "cancellationDriverShare", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('tinyint', { default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "providerSharePercent", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "providerShareFlat", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, media => media.service),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", media_entity_1.MediaEntity)
], ServiceEntity.prototype, "media", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "mediaId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
        transformer: new time_multiplier_transformer_1.TimeMultiplierTransformer()
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], ServiceEntity.prototype, "timeMultipliers", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
        transformer: new distance_multiplier_transformer_1.DistanceMultiplierTransformer()
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], ServiceEntity.prototype, "distanceMultipliers", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('float', { default: 1.0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceEntity.prototype, "touristMultiplier", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => driver_entity_1.DriverEntity, driver => driver.enabledServices),
    (0, tslib_1.__metadata)("design:type", Array)
], ServiceEntity.prototype, "drivers", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => coupon_entity_1.CouponEntity, coupon => coupon.allowedServices),
    (0, tslib_1.__metadata)("design:type", Array)
], ServiceEntity.prototype, "allowedCoupons", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => region_entity_1.RegionEntity, region => region.services),
    (0, typeorm_1.JoinTable)(),
    (0, tslib_1.__metadata)("design:type", Array)
], ServiceEntity.prototype, "regions", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, order => order.service),
    (0, tslib_1.__metadata)("design:type", Array)
], ServiceEntity.prototype, "requests", void 0);
ServiceEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('service')
], ServiceEntity);
exports.ServiceEntity = ServiceEntity;


/***/ }),

/***/ "./libs/database/src/lib/interfaces/distance-multiplier.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DistanceMultiplier = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let DistanceMultiplier = class DistanceMultiplier {
    static _GRAPHQL_METADATA_FACTORY() {
        return { distanceFrom: { type: () => Number }, distanceTo: { type: () => Number }, multiply: { type: () => Number } };
    }
};
DistanceMultiplier = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('DistanceMultiplierInput'),
    (0, graphql_1.ObjectType)()
], DistanceMultiplier);
exports.DistanceMultiplier = DistanceMultiplier;


/***/ }),

/***/ "./libs/database/src/lib/interfaces/point.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Point = class Point {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, tslib_1.__metadata)("design:type", Number)
], Point.prototype, "lat", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, tslib_1.__metadata)("design:type", Number)
], Point.prototype, "lng", void 0);
Point = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.InputType)('PointInput')
], Point);
exports.Point = Point;


/***/ }),

/***/ "./libs/database/src/lib/interfaces/time-multiplier.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeMultiplier = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let TimeMultiplier = class TimeMultiplier {
    static _GRAPHQL_METADATA_FACTORY() {
        return { startTime: { type: () => String }, endTime: { type: () => String }, multiply: { type: () => Number } };
    }
};
TimeMultiplier = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('TimeMultiplierInput'),
    (0, graphql_1.ObjectType)()
], TimeMultiplier);
exports.TimeMultiplier = TimeMultiplier;


/***/ }),

/***/ "./libs/database/src/lib/order/firebase-notification-service/driver-notification.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverNotificationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const nestjs_firebase_admin_1 = __webpack_require__("@aginix/nestjs-firebase-admin");
const common_1 = __webpack_require__("@nestjs/common");
let DriverNotificationService = class DriverNotificationService {
    constructor(firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }
    requests(driver) {
        var _a, _b;
        const tokens = driver.filter(_driver => _driver.notificationPlayerId != undefined).map(x => x.notificationPlayerId);
        this.firebaseMessaging.messaging.sendMulticast({
            tokens: tokens,
            android: {
                notification: {
                    sound: (_a = process.env.REQUEST_SOUND) !== null && _a !== void 0 ? _a : 'default',
                    titleLocKey: 'notification_new_request_title',
                    bodyLocKey: 'notification_new_request_body',
                    channelId: 'request',
                    icon: 'notification_icon'
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: (_b = process.env.REQUEST_SOUND) !== null && _b !== void 0 ? _b : 'default',
                        badge: 1,
                        alert: {
                            title: "New Request",
                            subtitle: "New request is available."
                        }
                    }
                },
                headers: {
                    "apns-push-type": "background",
                    "apns-priority": "5",
                    "apns-topic": "io.flutter.plugins.firebase.messaging",
                }
            }
        });
    }
    message(driver, message) {
        var _a;
        this.firebaseMessaging.messaging.send({
            token: (_a = driver.notificationPlayerId) !== null && _a !== void 0 ? _a : '',
            android: {
                notification: {
                    sound: 'default',
                    titleLocKey: 'notification_new_message_title',
                    bodyLocKey: message.content,
                    channelId: 'message',
                    icon: 'notification_icon'
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1,
                        contentAvailable: true,
                        alert: {
                            title: "Rider has sent a new message",
                            subtitle: message.content
                        }
                    }
                }
            }
        });
    }
    paid(driver) {
        var _a;
        this.firebaseMessaging.messaging.send({
            token: (_a = driver.notificationPlayerId) !== null && _a !== void 0 ? _a : '',
            android: {
                notification: {
                    sound: 'default',
                    title: "Paid!",
                    body: "Trip payment has been settled",
                    channelId: 'paid',
                    icon: 'notification_icon'
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1,
                        alert: {
                            title: "Paid!",
                            subtitle: "Trip payment has been settled"
                        }
                    }
                }
            }
        });
    }
};
DriverNotificationService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [nestjs_firebase_admin_1.FirebaseMessagingService])
], DriverNotificationService);
exports.DriverNotificationService = DriverNotificationService;


/***/ }),

/***/ "./libs/database/src/lib/order/firebase-notification-service/firebase-notification-service.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var FirebaseNotificationModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FirebaseNotificationModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const nestjs_firebase_admin_1 = __webpack_require__("@aginix/nestjs-firebase-admin");
const common_1 = __webpack_require__("@nestjs/common");
const admin = __webpack_require__("firebase-admin");
const fs_1 = __webpack_require__("fs");
const driver_notification_service_1 = __webpack_require__("./libs/database/src/lib/order/firebase-notification-service/driver-notification.service.ts");
const rider_notification_service_1 = __webpack_require__("./libs/database/src/lib/order/firebase-notification-service/rider-notification.service.ts");
let FirebaseNotificationModule = FirebaseNotificationModule_1 = class FirebaseNotificationModule {
    static register() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const modules = [];
            let providers = [];
            const configAddress = `${process.cwd()}/config/config.${"development"}.json`;
            if ((0, fs_1.existsSync)(configAddress)) {
                const file = yield fs_1.promises.readFile(configAddress, { encoding: 'utf-8' });
                const config = JSON.parse(file);
                const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
                if (config.firebaseProjectPrivateKey != null &&
                    (0, fs_1.existsSync)(firebaseKeyFileAddress)) {
                    modules.push(nestjs_firebase_admin_1.FirebaseAdminModule.forRootAsync({
                        useFactory: () => ({
                            credential: admin.credential.cert(firebaseKeyFileAddress),
                        }),
                    }));
                    providers = [driver_notification_service_1.DriverNotificationService, rider_notification_service_1.RiderNotificationService];
                }
            }
            return {
                module: FirebaseNotificationModule_1,
                imports: modules,
                providers: providers,
                exports: providers,
            };
        });
    }
};
FirebaseNotificationModule = FirebaseNotificationModule_1 = (0, tslib_1.__decorate)([
    (0, common_1.Module)({})
], FirebaseNotificationModule);
exports.FirebaseNotificationModule = FirebaseNotificationModule;


/***/ }),

/***/ "./libs/database/src/lib/order/firebase-notification-service/rider-notification.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderNotificationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const nestjs_firebase_admin_1 = __webpack_require__("@aginix/nestjs-firebase-admin");
const common_1 = __webpack_require__("@nestjs/common");
let RiderNotificationService = class RiderNotificationService {
    constructor(firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }
    message(rider, message) {
        if (rider.notificationPlayerId == null)
            return;
        this.firebaseMessaging.messaging.send({
            token: rider.notificationPlayerId,
            android: {
                notification: {
                    sound: 'default',
                    titleLocKey: 'notification_new_message_title',
                    bodyLocKey: message.content,
                    channelId: 'message',
                    icon: 'notification_icon'
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1,
                        alert: {
                            titleLocKey: 'notification_new_message_title',
                            subtitleLocKey: message.content
                        }
                    }
                }
            }
        });
    }
    arrived(rider) {
        if (rider.notificationPlayerId == null)
            return;
        this.firebaseMessaging.messaging.send({
            token: rider.notificationPlayerId,
            android: {
                notification: {
                    sound: 'default',
                    titleLocKey: 'notification_arrived_title',
                    bodyLocKey: 'notification_arrived_body',
                    channelId: 'tripEvents',
                    icon: 'notification_icon'
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        alert: {
                            titleLocKey: 'notification_arrived_title',
                            subtitleLocKey: 'notification_arrived_body'
                        }
                    }
                }
            }
        });
    }
    started(rider) {
        if (rider.notificationPlayerId == null)
            return;
        this.firebaseMessaging.messaging.send({
            token: rider.notificationPlayerId,
            android: {
                notification: {
                    sound: 'default',
                    titleLocKey: 'notification_started_title',
                    bodyLocKey: 'notification_started_body',
                    channelId: 'tripEvents',
                    icon: 'notification_icon'
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        alert: {
                            titleLocKey: 'notification_started_title',
                            subtitleLocKey: 'notification_started_body'
                        }
                    }
                }
            }
        });
    }
    waitingForPostPay(rider) {
        if (rider.notificationPlayerId == null)
            return;
        this.firebaseMessaging.messaging.send({
            token: rider.notificationPlayerId,
            android: {
                notification: {
                    sound: 'default',
                    titleLocKey: 'notification_waiting_for_pay_title',
                    bodyLocKey: 'notification_waiting_for_pay_body',
                    channelId: 'tripEvents',
                    icon: 'notification_icon'
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        alert: {
                            titleLocKey: 'notification_waiting_for_pay_title',
                            subtitleLocKey: 'notification_waiting_for_pay_body'
                        }
                    }
                }
            }
        });
    }
    finished(rider) {
        if (rider.notificationPlayerId == null)
            return;
        this.firebaseMessaging.messaging.send({
            token: rider.notificationPlayerId,
            android: {
                notification: {
                    sound: 'default',
                    titleLocKey: 'notification_finished_title',
                    bodyLocKey: 'notification_finished_body',
                    channelId: 'tripEvents',
                    icon: 'notification_icon'
                }
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        alert: {
                            titleLocKey: 'notification_finished_title',
                            subtitleLocKey: 'notification_finished_body'
                        }
                    }
                }
            }
        });
    }
};
RiderNotificationService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [nestjs_firebase_admin_1.FirebaseMessagingService])
], RiderNotificationService);
exports.RiderNotificationService = RiderNotificationService;


/***/ }),

/***/ "./libs/database/src/lib/order/google-services/google-services.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleServicesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const shared_configuration_service_1 = __webpack_require__("./libs/database/src/lib/shared-configuration.service.ts");
const google_services_service_1 = __webpack_require__("./libs/database/src/lib/order/google-services/google-services.service.ts");
let GoogleServicesModule = class GoogleServicesModule {
};
GoogleServicesModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        providers: [google_services_service_1.GoogleServicesService, shared_configuration_service_1.SharedConfigurationService],
        exports: [google_services_service_1.GoogleServicesService]
    })
], GoogleServicesModule);
exports.GoogleServicesModule = GoogleServicesModule;


/***/ }),

/***/ "./libs/database/src/lib/order/google-services/google-services.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleServicesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const google_maps_services_js_1 = __webpack_require__("@googlemaps/google-maps-services-js");
const common_1 = __webpack_require__("@nestjs/common");
const apollo_server_fastify_1 = __webpack_require__("apollo-server-fastify");
const shared_configuration_service_1 = __webpack_require__("./libs/database/src/lib/shared-configuration.service.ts");
let GoogleServicesService = class GoogleServicesService {
    constructor(configurationService) {
        this.configurationService = configurationService;
        this.client = new google_maps_services_js_1.Client({});
    }
    getSumDistanceAndDuration(points) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let distance = 0;
            let duration = 0;
            const config = yield this.configurationService.getConfiguration();
            for (let i = 0; i < points.length - 1; i++) {
                const matrixResponse = yield this.client.distancematrix({
                    params: {
                        origins: [points[i]],
                        destinations: [points[i + 1]],
                        key: config.backendMapsAPIKey
                    }
                });
                if (matrixResponse.statusText !== "OK") {
                    throw new apollo_server_fastify_1.ForbiddenError('NO_ROUTE_FOUND');
                }
                distance += matrixResponse.data.rows[0].elements.filter(element => element.status == 'OK').reduce((a, b) => { return a + b.distance.value; }, 0);
                duration += matrixResponse.data.rows[0].elements.filter(element => element.status == 'OK').reduce((a, b) => { return a + b.duration.value; }, 0);
            }
            return { distance, duration };
        });
    }
};
GoogleServicesService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [shared_configuration_service_1.SharedConfigurationService])
], GoogleServicesService);
exports.GoogleServicesService = GoogleServicesService;


/***/ }),

/***/ "./libs/database/src/lib/order/region/region.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const region_entity_1 = __webpack_require__("./libs/database/src/lib/entities/region.entity.ts");
const region_service_1 = __webpack_require__("./libs/database/src/lib/order/region/region.service.ts");
let RegionModule = class RegionModule {
};
RegionModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([region_entity_1.RegionEntity])],
        providers: [region_service_1.RegionService],
        exports: [region_service_1.RegionService]
    })
], RegionModule);
exports.RegionModule = RegionModule;


/***/ }),

/***/ "./libs/database/src/lib/order/region/region.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const region_entity_1 = __webpack_require__("./libs/database/src/lib/entities/region.entity.ts");
const typeorm_2 = __webpack_require__("typeorm");
let RegionService = class RegionService {
    constructor(regionRepository) {
        this.regionRepository = regionRepository;
    }
    getRegionWithPoint(point) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const regions = yield this.regionRepository.query(`SELECT * FROM region WHERE enabled=TRUE AND ST_Within(st_geomfromtext('POINT(? ?)'), region.location)`, [point.lng, point.lat]);
            return regions;
        });
    }
    getRegionServices(regionId) {
        var _a, _b;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return (_b = (_a = (yield this.regionRepository.findOne(regionId, { relations: ['services'] }))) === null || _a === void 0 ? void 0 : _a.services) !== null && _b !== void 0 ? _b : [];
        });
    }
};
RegionService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(region_entity_1.RegionEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository])
], RegionService);
exports.RegionService = RegionService;


/***/ }),

/***/ "./libs/database/src/lib/order/service.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
const typeorm_2 = __webpack_require__("typeorm");
let ServiceService = class ServiceService {
    constructor(service) {
        this.service = service;
    }
    calculateCost(service, distance, duration) {
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
    getWithId(id) {
        return this.service.findOne(id);
    }
};
ServiceService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(service_entity_1.ServiceEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository])
], ServiceService);
exports.ServiceService = ServiceService;


/***/ }),

/***/ "./libs/database/src/lib/order/shared-driver.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedDriverService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const driver_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-transaction.entity.ts");
const driver_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-wallet.entity.ts");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const driver_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/driver-status.enum.ts");
let SharedDriverService = class SharedDriverService {
    constructor(driverRepo, driverWalletRepo, driverTransactionRepo) {
        this.driverRepo = driverRepo;
        this.driverWalletRepo = driverWalletRepo;
        this.driverTransactionRepo = driverTransactionRepo;
    }
    updateDriverStatus(driverId, status) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.driverRepo.update(driverId, { status });
        });
    }
    getOnlineDriversWithServiceId(driverIds, serviceId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const driversWithService = yield this.driverRepo.find({
                where: {
                    id: (0, typeorm_2.In)(driverIds),
                    status: driver_status_enum_1.DriverStatus.Online,
                }, relations: ['enabledServices']
            });
            return driversWithService.filter(x => {
                return x.enabledServices.map(y => y.id).includes(serviceId);
            });
        });
    }
    rechargeWallet(transaction) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let wallet = yield this.driverWalletRepo.findOne({ driverId: transaction.driverId, currency: transaction.currency });
            if (wallet == null) {
                wallet = yield this.driverWalletRepo.save({ balance: transaction.amount, currency: transaction.currency, driverId: transaction.driverId });
            }
            else {
                yield this.driverWalletRepo.update(wallet.id, { balance: transaction.amount + wallet.balance });
                wallet.balance += transaction.amount;
            }
            if (transaction.amount != 0) {
                common_1.Logger.log(`Saving transaction ${JSON.stringify(transaction)}`);
                this.driverTransactionRepo.save(transaction);
            }
            return wallet;
        });
    }
};
SharedDriverService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(driver_wallet_entity_1.DriverWalletEntity)),
    (0, tslib_1.__param)(2, (0, typeorm_1.InjectRepository)(driver_transaction_entity_1.DriverTransactionEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SharedDriverService);
exports.SharedDriverService = SharedDriverService;


/***/ }),

/***/ "./libs/database/src/lib/order/shared-fleet.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedFleetService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const fleet_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-transaction.entity.ts");
const fleet_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-wallet.entity.ts");
const typeorm_2 = __webpack_require__("typeorm");
let SharedFleetService = class SharedFleetService {
    constructor(fleetWalletRepository, fleetTransactionEntity) {
        this.fleetWalletRepository = fleetWalletRepository;
        this.fleetTransactionEntity = fleetTransactionEntity;
    }
    rechargeWallet(transaction) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let wallet = yield this.fleetWalletRepository.findOne({ fleetId: transaction.fleetId, currency: transaction.currency });
            if (wallet == null) {
                wallet = yield this.fleetWalletRepository.save({ fleetId: transaction.fleetId, balance: transaction.amount, currency: transaction.currency });
            }
            else {
                yield this.fleetWalletRepository.update(wallet.id, { balance: transaction.amount + wallet.balance });
                wallet.balance += transaction.amount;
            }
            this.fleetTransactionEntity.save(transaction);
            return wallet;
        });
    }
};
SharedFleetService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(fleet_wallet_entity_1.FleetWalletEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(fleet_transaction_entity_1.FleetTransactionEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SharedFleetService);
exports.SharedFleetService = SharedFleetService;


/***/ }),

/***/ "./libs/database/src/lib/order/shared-order.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedOrderModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const database_1 = __webpack_require__("./libs/database/src/index.ts");
const driver_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-transaction.entity.ts");
const driver_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver-wallet.entity.ts");
const driver_entity_1 = __webpack_require__("./libs/database/src/lib/entities/driver.entity.ts");
const fleet_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-transaction.entity.ts");
const fleet_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/fleet-wallet.entity.ts");
const provider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-transaction.entity.ts");
const provider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-wallet.entity.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
const rider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-transaction.entity.ts");
const rider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-wallet.entity.ts");
const service_category_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service-category.entity.ts");
const service_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service.entity.ts");
const redis_helper_module_1 = __webpack_require__("./libs/database/src/lib/redis/redis-helper.module.ts");
const shared_configuration_service_1 = __webpack_require__("./libs/database/src/lib/shared-configuration.service.ts");
const firebase_notification_service_module_1 = __webpack_require__("./libs/database/src/lib/order/firebase-notification-service/firebase-notification-service.module.ts");
const google_services_module_1 = __webpack_require__("./libs/database/src/lib/order/google-services/google-services.module.ts");
const region_module_1 = __webpack_require__("./libs/database/src/lib/order/region/region.module.ts");
const service_service_1 = __webpack_require__("./libs/database/src/lib/order/service.service.ts");
const shared_driver_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-driver.service.ts");
const shared_fleet_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-fleet.service.ts");
const shared_order_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-order.service.ts");
const shared_provider_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-provider.service.ts");
const shared_rider_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-rider.service.ts");
let SharedOrderModule = class SharedOrderModule {
};
SharedOrderModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            redis_helper_module_1.RedisHelpersModule,
            typeorm_1.TypeOrmModule.forFeature([
                service_category_entity_1.ServiceCategoryEntity,
                service_entity_1.ServiceEntity,
                rider_entity_1.RiderEntity,
                driver_entity_1.DriverEntity,
                driver_wallet_entity_1.DriverWalletEntity,
                driver_transaction_entity_1.DriverTransactionEntity,
                fleet_wallet_entity_1.FleetWalletEntity,
                fleet_transaction_entity_1.FleetTransactionEntity,
                provider_wallet_entity_1.ProviderWalletEntity,
                provider_transaction_entity_1.ProviderTransactionEntity,
                rider_wallet_entity_1.RiderWalletEntity,
                rider_transaction_entity_1.RiderTransactionEntity,
                request_entity_1.RequestEntity,
            ]),
            region_module_1.RegionModule,
            google_services_module_1.GoogleServicesModule,
            firebase_notification_service_module_1.FirebaseNotificationModule.register(),
        ],
        providers: [
            database_1.RedisPubSubProvider.provider(),
            service_service_1.ServiceService,
            shared_driver_service_1.SharedDriverService,
            shared_fleet_service_1.SharedFleetService,
            shared_order_service_1.SharedOrderService,
            shared_provider_service_1.SharedProviderService,
            shared_rider_service_1.SharedRiderService,
            shared_configuration_service_1.SharedConfigurationService
        ],
        exports: [
            shared_driver_service_1.SharedDriverService,
            shared_fleet_service_1.SharedFleetService,
            shared_order_service_1.SharedOrderService,
            shared_provider_service_1.SharedProviderService,
            shared_rider_service_1.SharedRiderService,
        ],
    })
], SharedOrderModule);
exports.SharedOrderModule = SharedOrderModule;


/***/ }),

/***/ "./libs/database/src/lib/order/shared-order.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedOrderService = void 0;
const tslib_1 = __webpack_require__("tslib");
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const apollo_server_fastify_1 = __webpack_require__("apollo-server-fastify");
const graphql_redis_subscriptions_1 = __webpack_require__("graphql-redis-subscriptions");
const typeorm_2 = __webpack_require__("typeorm");
const order_status_enum_1 = __webpack_require__("./libs/database/src/lib/entities/enums/order-status.enum.ts");
const request_entity_1 = __webpack_require__("./libs/database/src/lib/entities/request.entity.ts");
const service_category_entity_1 = __webpack_require__("./libs/database/src/lib/entities/service-category.entity.ts");
const driver_redis_service_1 = __webpack_require__("./libs/database/src/lib/redis/driver-redis.service.ts");
const order_redis_service_1 = __webpack_require__("./libs/database/src/lib/redis/order-redis.service.ts");
const shared_driver_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-driver.service.ts");
const driver_notification_service_1 = __webpack_require__("./libs/database/src/lib/order/firebase-notification-service/driver-notification.service.ts");
const google_services_service_1 = __webpack_require__("./libs/database/src/lib/order/google-services/google-services.service.ts");
const region_service_1 = __webpack_require__("./libs/database/src/lib/order/region/region.service.ts");
const shared_rider_service_1 = __webpack_require__("./libs/database/src/lib/order/shared-rider.service.ts");
const service_service_1 = __webpack_require__("./libs/database/src/lib/order/service.service.ts");
let SharedOrderService = class SharedOrderService {
    constructor(orderRepository, regionService, serviceCategoryRepository, googleServices, servicesService, riderService, driverRedisService, orderRedisService, driverService, pubSub, driverNotificationService) {
        this.orderRepository = orderRepository;
        this.regionService = regionService;
        this.serviceCategoryRepository = serviceCategoryRepository;
        this.googleServices = googleServices;
        this.servicesService = servicesService;
        this.riderService = riderService;
        this.driverRedisService = driverRedisService;
        this.orderRedisService = orderRedisService;
        this.driverService = driverService;
        this.pubSub = pubSub;
        this.driverNotificationService = driverNotificationService;
    }
    calculateFare(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const regions = yield this.regionService.getRegionWithPoint(input.points[0]);
            if (regions.length < 1) {
                throw new apollo_server_fastify_1.ForbiddenError(CalculateFareError.RegionUnsupported);
            }
            const servicesInRegion = yield this.regionService.getRegionServices(regions[0].id);
            if (servicesInRegion.length < 1) {
                throw new apollo_server_fastify_1.ForbiddenError(CalculateFareError.NoServiceInRegion);
            }
            const metrics = (servicesInRegion.findIndex(x => x.perHundredMeters > 0) > -1) ?
                yield this.googleServices.getSumDistanceAndDuration(input.points) :
                { distance: 0, duration: 0 };
            const cats = yield this.serviceCategoryRepository.find({ relations: ['services', 'services.media'] });
            const _cats = cats.map(cat => {
                const { services } = cat, _cat = (0, tslib_1.__rest)(cat, ["services"]);
                const _services = services.filter(x => servicesInRegion.filter(y => y.id == x.id).length > 0).map(service => {
                    return Object.assign(Object.assign({}, service), { cost: this.servicesService.calculateCost(service, metrics.distance, metrics.duration) });
                });
                return Object.assign(Object.assign({}, _cat), { services: _services });
            }).filter(x => x.services.length > 0);
            return Object.assign(Object.assign({}, metrics), { currency: regions[0].currency, services: _cats });
        });
    }
    createOrder(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const service = yield this.servicesService.getWithId(input.serviceId);
            if (service == undefined) {
                throw new apollo_server_fastify_1.ForbiddenError('SERVICE_NOT_FOUND');
            }
            const closeDrivers = yield this.driverRedisService.getClose(input.points[0], service.searchRadius);
            const driverIds = closeDrivers.map((x) => x.driverId);
            const driversWithService = yield this.driverService.getOnlineDriversWithServiceId(driverIds, input.serviceId);
            const metrics = service.perHundredMeters > 0 ?
                yield this.googleServices.getSumDistanceAndDuration(input.points) :
                { distance: 0, duration: 0 };
            const cost = this.servicesService.calculateCost(service, metrics.distance, metrics.duration);
            const eta = new Date(new Date().getTime() + ((input.intervalMinutes | 0) * 60 * 1000));
            const regions = yield this.regionService.getRegionWithPoint(input.points[0]);
            if (service.maximumDestinationDistance != 0 && metrics.distance > service.maximumDestinationDistance) {
                throw new apollo_server_fastify_1.ForbiddenError('DISTANCE_TOO_FAR');
            }
            if (service.prepayPercent > 0) {
                const balance = yield this.riderService.getRiderCreditInCurrency(input.riderId, regions[0].currency);
                if (balance < (cost * service.prepayPercent / 100)) {
                    throw new apollo_server_fastify_1.ForbiddenError('UNSUFFICIENT_CREDIT');
                }
            }
            const order = yield this.orderRepository.save({
                serviceId: input.serviceId,
                currency: regions[0].currency,
                riderId: input.riderId,
                points: input.points,
                addresses: input.addresses.map(address => address.replace(', ', '-')),
                distanceBest: metrics.distance,
                durationBest: metrics.duration,
                status: input.intervalMinutes > 30 ? order_status_enum_1.OrderStatus.Booked : (driversWithService.length < 1 ? order_status_enum_1.OrderStatus.NoCloseFound : order_status_enum_1.OrderStatus.Requested),
                costBest: cost,
                costAfterCoupon: cost,
                expectedTimestamp: eta,
                operatorId: input.operatorId,
                providerShare: service.providerShareFlat + (service.providerSharePercent * cost / 100),
            });
            yield this.orderRedisService.add(order, input.intervalMinutes | 0);
            if (input.intervalMinutes == null || input.intervalMinutes < 30) {
                for (const driver of driversWithService) {
                    this.orderRedisService.driverNotified(order.id, driver.id);
                }
                this.pubSub.publish('orderCreated', { orderCreated: order });
                const _drivers = driversWithService.filter(x => x.notificationPlayerId != null);
                if (_drivers.length > 0) {
                    this.driverNotificationService.requests(_drivers);
                }
            }
            return order;
        });
    }
};
SharedOrderService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    (0, tslib_1.__param)(2, (0, typeorm_1.InjectRepository)(service_category_entity_1.ServiceCategoryEntity)),
    (0, tslib_1.__param)(9, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        region_service_1.RegionService,
        typeorm_2.Repository,
        google_services_service_1.GoogleServicesService,
        service_service_1.ServiceService,
        shared_rider_service_1.SharedRiderService,
        driver_redis_service_1.DriverRedisService,
        order_redis_service_1.OrderRedisService,
        shared_driver_service_1.SharedDriverService,
        graphql_redis_subscriptions_1.RedisPubSub,
        driver_notification_service_1.DriverNotificationService])
], SharedOrderService);
exports.SharedOrderService = SharedOrderService;
var CalculateFareError;
(function (CalculateFareError) {
    CalculateFareError["RegionUnsupported"] = "REGION_UNSUPPORTED";
    CalculateFareError["NoServiceInRegion"] = "NO_SERVICE_IN_REGION";
})(CalculateFareError || (CalculateFareError = {}));


/***/ }),

/***/ "./libs/database/src/lib/order/shared-provider.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedProviderService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const provider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-transaction.entity.ts");
const provider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/provider-wallet.entity.ts");
const typeorm_2 = __webpack_require__("typeorm");
let SharedProviderService = class SharedProviderService {
    constructor(providerWalletRepo, providerTransactionRepo) {
        this.providerWalletRepo = providerWalletRepo;
        this.providerTransactionRepo = providerTransactionRepo;
    }
    rechargeWallet(transaction) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let wallet = yield this.providerWalletRepo.findOne({ currency: transaction.currency });
            if (wallet == null) {
                wallet = yield this.providerWalletRepo.save({ balance: transaction.amount, currency: transaction.currency });
            }
            else {
                yield this.providerWalletRepo.update(wallet.id, { balance: transaction.amount + wallet.balance });
                wallet.balance += transaction.amount;
            }
            if (transaction.amount != 0) {
                common_1.Logger.log(`Saving transaction ${JSON.stringify(transaction)}`);
                this.providerTransactionRepo.save(transaction);
            }
            return wallet;
        });
    }
};
SharedProviderService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(provider_wallet_entity_1.ProviderWalletEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(provider_transaction_entity_1.ProviderTransactionEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SharedProviderService);
exports.SharedProviderService = SharedProviderService;


/***/ }),

/***/ "./libs/database/src/lib/order/shared-rider.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedRiderService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const rider_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-entity.ts");
const rider_transaction_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-transaction.entity.ts");
const rider_wallet_entity_1 = __webpack_require__("./libs/database/src/lib/entities/rider-wallet.entity.ts");
const typeorm_2 = __webpack_require__("typeorm");
let SharedRiderService = class SharedRiderService {
    constructor(repo, riderWalletRepo, riderTransactionRepo) {
        this.repo = repo;
        this.riderWalletRepo = riderWalletRepo;
        this.riderTransactionRepo = riderTransactionRepo;
    }
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repo.findOne(id);
        });
    }
    findUserByMobileNumber(mobileNumber) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repo.findOne({ where: { mobileNumber } });
        });
    }
    createUserWithMobileNumber(mobileNumber) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const addResult = yield this.repo.save({
                mobileNumber: mobileNumber,
            });
            return addResult;
        });
    }
    findOrCreateUserWithMobileNumber(mobileNumber) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const findResult = yield this.findUserByMobileNumber(mobileNumber);
            if (findResult == null) {
                return yield this.createUserWithMobileNumber(mobileNumber);
            }
            else {
                return findResult;
            }
        });
    }
    getRiderCreditInCurrency(riderId, currency) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const wallet = yield this.riderWalletRepo.findOne({ riderId, currency });
            return ((_a = wallet === null || wallet === void 0 ? void 0 : wallet.balance) !== null && _a !== void 0 ? _a : 0);
        });
    }
    rechargeWallet(transaction) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let wallet = yield this.riderWalletRepo.findOne({ riderId: transaction.riderId, currency: transaction.currency });
            if (wallet == null) {
                wallet = yield this.riderWalletRepo.save({ balance: transaction.amount, currency: transaction.currency, riderId: transaction.riderId });
            }
            else {
                yield this.riderWalletRepo.update(wallet.id, { balance: transaction.amount + wallet.balance });
                wallet.balance += transaction.amount;
            }
            this.riderTransactionRepo.save(transaction);
            return wallet;
        });
    }
};
SharedRiderService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(rider_entity_1.RiderEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(rider_wallet_entity_1.RiderWalletEntity)),
    (0, tslib_1.__param)(2, (0, typeorm_1.InjectRepository)(rider_transaction_entity_1.RiderTransactionEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SharedRiderService);
exports.SharedRiderService = SharedRiderService;


/***/ }),

/***/ "./libs/database/src/lib/redis-pub-sub.provider.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisPubSubProvider = void 0;
const query_graphql_1 = __webpack_require__("@nestjs-query/query-graphql");
const graphql_redis_subscriptions_1 = __webpack_require__("graphql-redis-subscriptions");
const Redis = __webpack_require__("ioredis");
class RedisPubSubProvider {
    static provider() {
        return {
            provide: (0, query_graphql_1.pubSubToken)(),
            useFactory: () => {
                const options = {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: 6379
                };
                return new graphql_redis_subscriptions_1.RedisPubSub({
                    publisher: new Redis(options),
                    subscriber: new Redis(options),
                });
            },
        };
    }
}
exports.RedisPubSubProvider = RedisPubSubProvider;


/***/ }),

/***/ "./libs/database/src/lib/redis/driver-redis.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverRedisService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const nestjs_redis_1 = __webpack_require__("@liaoliaots/nestjs-redis");
let DriverRedisService = class DriverRedisService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    setLocation(driverId, point) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield Promise.all([
                this.redisService.geoadd(RedisKeys.Driver, point.lng, point.lat, driverId.toString()),
                this.redisService.zadd(RedisKeys.DriverLocationTime, Date.now(), driverId)
            ]);
        });
    }
    getDriverCoordinate(driverId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const pos = yield this.redisService.geopos(RedisKeys.Driver, driverId.toString());
            return pos[0] ? { lat: parseFloat(pos[0][1]), lng: parseFloat(pos[0][0]) } : null;
        });
    }
    getClose(point, distance) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const bare = yield this.redisService.send_command('GEORADIUS', RedisKeys.Driver, point.lng, point.lat, distance, 'm', 'WITHCOORD');
            return bare.map((item) => ({
                driverId: parseInt(item[0]),
                location: {
                    lat: parseFloat(item[1][1]),
                    lng: parseFloat(item[1][0])
                }
            }));
        });
    }
    getCloseWithoutIds(point, distance) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const bare = yield this.redisService.send_command('GEORADIUS', RedisKeys.Driver, point.lng, point.lat, distance, 'm', 'WITHCOORD');
            return bare.map((item) => ({
                lat: parseFloat(item[1][1]),
                lng: parseFloat(item[1][0])
            }));
        });
    }
    getAllOnline() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const bare = yield this.redisService.send_command('GEORADIUS', RedisKeys.Driver, 45, 45, '22000', 'km', 'WITHCOORD');
            const times = yield this.redisService.zrangebyscore(RedisKeys.DriverLocationTime, 0, new Date().getTime(), 'WITHSCORES');
            return bare.map((x) => {
                return {
                    driverId: parseInt(x[0]),
                    location: { lat: parseFloat(x[1][1]), lng: parseFloat(x[1][0]) },
                    lastUpdatedAt: parseInt(times[times.indexOf(x[0]) + 1])
                };
            });
        });
    }
    expire(userId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.redisService.zrem(RedisKeys.Driver, userId);
            yield this.redisService.zrem(RedisKeys.DriverLocationTime, userId);
        });
    }
};
DriverRedisService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, nestjs_redis_1.InjectRedis)()),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], DriverRedisService);
exports.DriverRedisService = DriverRedisService;
var RedisKeys;
(function (RedisKeys) {
    RedisKeys["Driver"] = "driver";
    RedisKeys["DriverLocationTime"] = "driver-location-time";
})(RedisKeys || (RedisKeys = {}));


/***/ }),

/***/ "./libs/database/src/lib/redis/order-redis.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderRedisService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const nestjs_redis_1 = __webpack_require__("@liaoliaots/nestjs-redis");
let OrderRedisService = class OrderRedisService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    add(request, minutesfromNow) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const date = new Date();
            const pickupTime = date.setMinutes(date.getMinutes() + minutesfromNow);
            yield this.redisService.geoadd(RedisKeys.Request, request.points[0].lng, request.points[0].lat, request.id.toString());
            yield this.redisService.zadd(RedisKeys.RequestTime, pickupTime, request.id);
            yield this.redisService.set(`${RedisKeys.Request}:${request.id}`, JSON.stringify(request));
            return request;
        });
    }
    getForDriver(driverId, distance) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const driverLocation = yield this.redisService.geopos(RedisKeys.Driver, driverId.toString());
            if (driverLocation[0] == null) {
                return [];
            }
            const requestIds = yield this.redisService.georadius(RedisKeys.Request, parseFloat(driverLocation[0][0]), parseFloat(driverLocation[0][1]), distance, 'm');
            const requests = [];
            const ts = Math.round(new Date().getTime());
            const min = ts - (10 * 60000);
            const max = ts + (30 * 60000);
            const _requests = yield this.redisService.zrangebyscore(RedisKeys.RequestTime, min, max);
            const intersection = requestIds.filter(x => _requests.includes(x));
            for (const requestId of intersection) {
                const request = yield this.redisService.get(`${RedisKeys.Request}:${requestId}`);
                if (request)
                    requests.push(JSON.parse(request));
            }
            return requests;
        });
    }
    driverNotified(requestId, driverId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.redisService.sadd(`${RedisKeys.RequestDrivers}:${requestId}`, driverId);
        });
    }
    getDriversNotified(requestId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const driverIds = yield this.redisService.smembers(`${RedisKeys.RequestDrivers}:${requestId}`);
            return driverIds.map((x) => parseInt(x));
        });
    }
    expire(requestIds) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.redisService.zrem(RedisKeys.Request, requestIds);
            this.redisService.zrem(RedisKeys.RequestTime, requestIds);
            this.redisService.zrem(RedisKeys.RequestDrivers, requestIds);
            // for(const requestId of requestIds) {
            //     this.redis.expire(`${RedisKeys.Request}:${requestId}`, -1);
            // }
            this.redisService.del(requestIds.map(id => (`${RedisKeys.Request}:${id}`))); // # This doesn't works for some reason. expire works
        });
    }
    getAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const min = 0;
            const max = -1;
            const _requests = yield this.redisService.zrange(RedisKeys.RequestTime, min, max);
            const result = [];
            for (const requestId of _requests) {
                const request = yield this.redisService.get(`${RedisKeys.Request}:${requestId}`);
                if (request != null) {
                    result.push(JSON.parse(request !== null && request !== void 0 ? request : ''));
                }
            }
            return result;
        });
    }
};
OrderRedisService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, nestjs_redis_1.InjectRedis)()),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], OrderRedisService);
exports.OrderRedisService = OrderRedisService;
var RedisKeys;
(function (RedisKeys) {
    RedisKeys["Driver"] = "driver";
    RedisKeys["Request"] = "request";
    RedisKeys["RequestDrivers"] = "request-drivers";
    RedisKeys["RequestTime"] = "request-time";
})(RedisKeys || (RedisKeys = {}));


/***/ }),

/***/ "./libs/database/src/lib/redis/redis-helper.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisHelpersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const driver_redis_service_1 = __webpack_require__("./libs/database/src/lib/redis/driver-redis.service.ts");
const order_redis_service_1 = __webpack_require__("./libs/database/src/lib/redis/order-redis.service.ts");
let RedisHelpersModule = class RedisHelpersModule {
};
RedisHelpersModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        providers: [driver_redis_service_1.DriverRedisService, order_redis_service_1.OrderRedisService],
        exports: [driver_redis_service_1.DriverRedisService, order_redis_service_1.OrderRedisService]
    })
], RedisHelpersModule);
exports.RedisHelpersModule = RedisHelpersModule;


/***/ }),

/***/ "./libs/database/src/lib/shared-configuration.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedConfigurationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fs = __webpack_require__("fs");
let SharedConfigurationService = class SharedConfigurationService {
    constructor() { }
    getConfiguration() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const configAddress = `${process.cwd()}/config/config.${"development"}.json`;
            if (fs.existsSync(configAddress)) {
                const file = yield fs.promises.readFile(configAddress, { encoding: 'utf-8' });
                const config = JSON.parse(file);
                const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
                if (config.firebaseProjectPrivateKey != null &&
                    fs.existsSync(firebaseKeyFileAddress)) {
                    return {
                        adminPanelAPIKey: config.adminPanelAPIKey,
                        backendMapsAPIKey: config.backendMapsAPIKey,
                        purchaseCode: 'RESTRICTED',
                        firebaseProjectPrivateKey: 'RESTRICTED'
                    };
                }
                return config;
            }
            else {
                return {};
            }
        });
    }
};
SharedConfigurationService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], SharedConfigurationService);
exports.SharedConfigurationService = SharedConfigurationService;


/***/ }),

/***/ "./libs/database/src/lib/transformers/distance-multiplier.transformer.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DistanceMultiplierTransformer = void 0;
class DistanceMultiplierTransformer {
    to(value) {
        if (value == null) {
            return [];
        }
        return value.map((row) => `${row.distanceFrom}-${row.distanceTo}|${row.multiply}`);
    }
    from(value) {
        if (value == null) {
            return [];
        }
        return value.map(str => {
            return {
                distanceFrom: parseInt(str.split('|')[0].split('-')[0]),
                distanceTo: parseInt(str.split('|')[0].split('-')[1]),
                multiply: parseFloat(str.split('|')[1])
            };
        });
    }
}
exports.DistanceMultiplierTransformer = DistanceMultiplierTransformer;


/***/ }),

/***/ "./libs/database/src/lib/transformers/multipoint.transformer.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MultipointTransformer = void 0;
class MultipointTransformer {
    to(value) {
        if (value == null)
            return null;
        return `MULTIPOINT(${value.map((x) => `${x.lng} ${x.lat}`).join(',')})`;
    }
    from(value) {
        if (value == null) {
            return [];
        }
        const i = value.substring(11, value.length - 1).split(',').map(x => {
            const s = x.substring(1, x.length - 1).split(' ');
            return {
                lng: parseFloat(s[0]),
                lat: parseFloat(s[1])
            };
        });
        return i;
    }
}
exports.MultipointTransformer = MultipointTransformer;


/***/ }),

/***/ "./libs/database/src/lib/transformers/point.transformer.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointTransformer = void 0;
class PointTransformer {
    to(value) {
        if (value == null)
            return null;
        return `POINT(${value.lng} ${value.lat})`;
    }
    from(value) {
        if (value == null || value == '') {
            return null;
        }
        const a = value.substr(6, value.length - 7).split(' ');
        return {
            lng: parseFloat(a[0]),
            lat: parseFloat(a[1])
        };
    }
}
exports.PointTransformer = PointTransformer;


/***/ }),

/***/ "./libs/database/src/lib/transformers/polygon.transformer.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PolygonTransformer = void 0;
class PolygonTransformer {
    to(value) {
        if (value == null)
            return null;
        const str = value.map((x) => {
            const ar = x.map((y) => `${y.lng} ${y.lat}`);
            return ar.join(',');
        }).join('),(');
        return `POLYGON((${str}))`;
    }
    from(value) {
        return value.substring(8, value.length - 1).split('),(').map(x => {
            const res = x.substring(1, x.length - 1).split(',').map(y => {
                const s = y.split(' ');
                return {
                    lng: parseFloat(s[0]),
                    lat: parseFloat(s[1])
                };
            });
            return res;
        });
    }
}
exports.PolygonTransformer = PolygonTransformer;


/***/ }),

/***/ "./libs/database/src/lib/transformers/time-multiplier.transformer.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeMultiplierTransformer = void 0;
class TimeMultiplierTransformer {
    to(value) {
        if (value == null) {
            return [];
        }
        return value.map((row) => `${row.startTime}-${row.endTime}|${row.multiply}`);
    }
    from(value) {
        if (value == null) {
            return [];
        }
        return value.map(str => {
            return {
                startTime: str.split('|')[0].split('-')[0],
                endTime: str.split('|')[0].split('-')[1],
                multiply: parseFloat(str.split('|')[1])
            };
        });
    }
}
exports.TimeMultiplierTransformer = TimeMultiplierTransformer;


/***/ }),

/***/ "@aginix/nestjs-firebase-admin":
/***/ ((module) => {

module.exports = require("@aginix/nestjs-firebase-admin");

/***/ }),

/***/ "@googlemaps/google-maps-services-js":
/***/ ((module) => {

module.exports = require("@googlemaps/google-maps-services-js");

/***/ }),

/***/ "@liaoliaots/nestjs-redis":
/***/ ((module) => {

module.exports = require("@liaoliaots/nestjs-redis");

/***/ }),

/***/ "@nestjs-query/query-graphql":
/***/ ((module) => {

module.exports = require("@nestjs-query/query-graphql");

/***/ }),

/***/ "@nestjs-query/query-typeorm":
/***/ ((module) => {

module.exports = require("@nestjs-query/query-typeorm");

/***/ }),

/***/ "@nestjs/axios":
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/core/helpers/execution-context-host":
/***/ ((module) => {

module.exports = require("@nestjs/core/helpers/execution-context-host");

/***/ }),

/***/ "@nestjs/graphql":
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-fastify":
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "apollo-server-fastify":
/***/ ((module) => {

module.exports = require("apollo-server-fastify");

/***/ }),

/***/ "fastify":
/***/ ((module) => {

module.exports = require("fastify");

/***/ }),

/***/ "fastify-cors":
/***/ ((module) => {

module.exports = require("fastify-cors");

/***/ }),

/***/ "fastify-multipart":
/***/ ((module) => {

module.exports = require("fastify-multipart");

/***/ }),

/***/ "fastify-static":
/***/ ((module) => {

module.exports = require("fastify-static");

/***/ }),

/***/ "firebase-admin":
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),

/***/ "graphql-redis-subscriptions":
/***/ ((module) => {

module.exports = require("graphql-redis-subscriptions");

/***/ }),

/***/ "ioredis":
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),

/***/ "jwt-decode":
/***/ ((module) => {

module.exports = require("jwt-decode");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "typeorm/decorator/entity/Entity":
/***/ ((module) => {

module.exports = require("typeorm/decorator/entity/Entity");

/***/ }),

/***/ "util":
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "crypto":
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "stream":
/***/ ((module) => {

module.exports = require("stream");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const admin_api_module_1 = __webpack_require__("./apps/admin-api/src/app/admin-api.module.ts");
const platform_fastify_1 = __webpack_require__("@nestjs/platform-fastify");
const fastify_static_1 = __webpack_require__("fastify-static");
const fastify_multipart_1 = __webpack_require__("fastify-multipart");
const fastify_cors_1 = __webpack_require__("fastify-cors");
const path_1 = __webpack_require__("path");
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const adapter = new platform_fastify_1.FastifyAdapter();
        const app = yield core_1.NestFactory.create(admin_api_module_1.AdminAPIModule.register(), adapter);
        const port = process.env.ADMIN_API_PORT || 3000;
        app.enableShutdownHooks();
        app.register(fastify_cors_1.default);
        app.register(fastify_multipart_1.default);
        app.register(fastify_static_1.default, {
            prefix: '/uploads/',
            root: (0, path_1.join)(process.cwd(), 'uploads'),
        });
        yield app.listen(port, '0.0.0.0', () => {
            common_1.Logger.log(`Listening at http://localhost:${port}`, 'Admin API');
        });
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map
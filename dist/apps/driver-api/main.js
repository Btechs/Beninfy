/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 1565:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementsModule = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const common_1 = __webpack_require__(6481);
const announcement_entity_1 = __webpack_require__(8995);
const jwt_gql_auth_guard_1 = __webpack_require__(3058);
const announcement_dto_1 = __webpack_require__(1773);
let AnnouncementsModule = class AnnouncementsModule {
};
AnnouncementsModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([announcement_entity_1.AnnouncementEntity])],
                resolvers: [
                    {
                        EntityClass: announcement_entity_1.AnnouncementEntity,
                        DTOClass: announcement_dto_1.AnnouncementDTO,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard]
                    }
                ],
            })
        ]
    })
], AnnouncementsModule);
exports.AnnouncementsModule = AnnouncementsModule;


/***/ }),

/***/ 1773:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(3482);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
const anouncement_user_type_enum_1 = __webpack_require__(3482);
let AnnouncementDTO = class AnnouncementDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, description: { type: () => String }, startAt: { type: () => Date }, expireAt: { type: () => Date }, userType: { type: () => [(__webpack_require__(3482).AnnouncementUserType)] } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], AnnouncementDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => anouncement_user_type_enum_1.AnnouncementUserType),
    (0, tslib_1.__metadata)("design:type", Array)
], AnnouncementDTO.prototype, "userType", void 0);
AnnouncementDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Announcement'),
    (0, query_graphql_1.QueryOptions)({
        pagingStrategy: query_graphql_1.PagingStrategies.NONE
    }),
    (0, query_graphql_1.Authorize)({
        authorize: () => ({ userType: { in: [[anouncement_user_type_enum_1.AnnouncementUserType.Driver]] }, startAt: { gt: new Date() }, expireAt: { lt: new Date() } })
    })
], AnnouncementDTO);
exports.AnnouncementDTO = AnnouncementDTO;


/***/ }),

/***/ 8235:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(752);
const nestjs_firebase_admin_1 = __webpack_require__(1312);
const common_1 = __webpack_require__(6481);
const jwt_1 = __webpack_require__(2064);
const passport_1 = __webpack_require__(4340);
const admin = __webpack_require__(2509);
const fs_1 = __webpack_require__(7147);
const driver_module_1 = __webpack_require__(9311);
const auth_resolver_1 = __webpack_require__(538);
const auth_service_1 = __webpack_require__(8075);
const jwt_strategy_1 = __webpack_require__(8114);
let AuthModule = AuthModule_1 = class AuthModule {
    static register() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const modules = [
                driver_module_1.DriverModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    secret: 'secret_driver'
                })
            ];
            let providers = [];
            const configAddress = `${process.cwd()}/config/config.${"production"}.json`;
            if ((0, fs_1.existsSync)(configAddress)) {
                const file = yield fs_1.promises.readFile(configAddress, { encoding: 'utf-8' });
                const config = JSON.parse(file);
                if (config.firebaseProjectPrivateKey != null &&
                    (0, fs_1.existsSync)(`${process.cwd()}/config/${config.firebaseProjectPrivateKey}`)) {
                    common_1.Logger.log('Firebase Auth Module initialized');
                    modules.push(nestjs_firebase_admin_1.FirebaseAdminModule.forRootAsync({
                        useFactory: () => ({
                            credential: admin.credential.cert(`${process.cwd()}/config/${config.firebaseProjectPrivateKey}`)
                        })
                    }));
                    providers = [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, auth_resolver_1.AuthResolver];
                }
            }
            return {
                module: AuthModule_1,
                imports: modules,
                providers: providers
            };
        });
    }
};
AuthModule = AuthModule_1 = (0, tslib_1.__decorate)([
    (0, common_1.Module)({})
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ 538:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__(752);
const nestjs_firebase_admin_1 = __webpack_require__(1312);
const graphql_1 = __webpack_require__(1161);
const jwt_1 = __webpack_require__(2064);
const driver_service_1 = __webpack_require__(6922);
const login_dto_1 = __webpack_require__(9612);
const login_input_1 = __webpack_require__(5044);
let AuthResolver = class AuthResolver {
    constructor(firebaseAuth, driverService, jwtService) {
        this.firebaseAuth = firebaseAuth;
        this.driverService = driverService;
        this.jwtService = jwtService;
    }
    login(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const decodedToken = yield this.firebaseAuth.app
                .auth()
                .verifyIdToken(input.firebaseToken);
            const number = decodedToken.firebase.identities.phone[0].substring(1);
            const user = yield this.driverService.findOrCreateUserWithMobileNumber(number);
            const payload = { id: user.id };
            return {
                jwtToken: this.jwtService.sign(payload),
            };
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => login_dto_1.LoginDTO),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => login_input_1.LoginInput })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [login_input_1.LoginInput]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
AuthResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, tslib_1.__metadata)("design:paramtypes", [nestjs_firebase_admin_1.FirebaseAuthenticationService,
        driver_service_1.DriverService,
        jwt_1.JwtService])
], AuthResolver);
exports.AuthResolver = AuthResolver;


/***/ }),

/***/ 8075:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(752);
const nestjs_firebase_admin_1 = __webpack_require__(1312);
const common_1 = __webpack_require__(6481);
const jwt_1 = __webpack_require__(2064);
const driver_service_1 = __webpack_require__(6922);
let AuthService = class AuthService {
    constructor(driverService, jwtService, firebaseAuth) {
        this.driverService = driverService;
        this.jwtService = jwtService;
        this.firebaseAuth = firebaseAuth;
    }
    validateUser(firebaseToken) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const decodedToken = yield this.firebaseAuth.app.auth().verifyIdToken(firebaseToken);
            const number = decodedToken.firebase.identities.phone[0].substring(1);
            const user = yield this.driverService.findOrCreateUserWithMobileNumber(number);
            return user;
        });
    }
    loginUser(user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const payload = { id: user.id };
            return {
                token: this.jwtService.sign(payload)
            };
        });
    }
};
AuthService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [driver_service_1.DriverService,
        jwt_1.JwtService,
        nestjs_firebase_admin_1.FirebaseAuthenticationService])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ 9612:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDTO = void 0;
const tslib_1 = __webpack_require__(752);
const graphql_1 = __webpack_require__(1161);
let LoginDTO = class LoginDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { jwtToken: { type: () => String } };
    }
};
LoginDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Login')
], LoginDTO);
exports.LoginDTO = LoginDTO;


/***/ }),

/***/ 5044:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginInput = void 0;
const tslib_1 = __webpack_require__(752);
const graphql_1 = __webpack_require__(1161);
let LoginInput = class LoginInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { firebaseToken: { type: () => String } };
    }
};
LoginInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;


/***/ }),

/***/ 3058:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlAuthGuard = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const graphql_1 = __webpack_require__(1161);
const passport_1 = __webpack_require__(4340);
const apollo_server_fastify_1 = __webpack_require__(4518);
let GqlAuthGuard = class GqlAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
        //const { req, connection } = ctx.getContext();
        return ctx.req ? ctx.req : { user: ctx };
    }
    canActivate(context) {
        if (context.getArgs()[2].id != null) {
            return true;
        }
        /*const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();*/
        //const req = this.getRequest(context);
        return super.canActivate(context);
    }
    // canActivate(context: ExecutionContext) {
    //   const ctx = GqlExecutionContext.create(context);
    //   const { req } = ctx.getContext();
    //   return super.canActivate(
    //     new ExecutionContextHost([req]),
    //   );
    // }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new apollo_server_fastify_1.AuthenticationError('GqlAuthGuard');
        }
        return user;
    }
};
GqlAuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;


/***/ }),

/***/ 8114:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateToken = exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(752);
const passport_jwt_1 = __webpack_require__(136);
const passport_1 = __webpack_require__(4340);
const common_1 = __webpack_require__(6481);
const jwt_decode_1 = __webpack_require__(5567);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret_driver'
        });
    }
    validate(payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return { id: payload.id };
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

/***/ 7606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestJwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const passport_1 = __webpack_require__(4340);
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

/***/ 7156:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatModule = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const common_1 = __webpack_require__(6481);
const database_1 = __webpack_require__(1617);
const request_message_entity_1 = __webpack_require__(6429);
const request_entity_1 = __webpack_require__(2814);
const jwt_gql_auth_guard_1 = __webpack_require__(3058);
const order_module_1 = __webpack_require__(5104);
const chat_service_1 = __webpack_require__(4468);
const chat_subscription_service_1 = __webpack_require__(5607);
const order_message_dto_1 = __webpack_require__(3010);
const order_message_input_1 = __webpack_require__(1306);
let ChatModule = class ChatModule {
};
ChatModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            order_module_1.OrderModule,
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([request_message_entity_1.OrderMessageEntity, request_entity_1.RequestEntity]),
                ],
                services: [chat_service_1.ChatService],
                resolvers: [
                    {
                        EntityClass: request_message_entity_1.OrderMessageEntity,
                        DTOClass: order_message_dto_1.OrderMessageDTO,
                        CreateDTOClass: order_message_input_1.OrderMessageInput,
                        ServiceClass: chat_service_1.ChatService,
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE,
                        create: { many: { disabled: true } },
                        read: { one: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard]
                    }
                ]
            })
        ],
        providers: [
            chat_subscription_service_1.ChatSubscriptionService,
            database_1.RedisPubSubProvider.provider(),
        ]
    })
], ChatModule);
exports.ChatModule = ChatModule;


/***/ }),

/***/ 4468:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatService = void 0;
const tslib_1 = __webpack_require__(752);
const core_1 = __webpack_require__(7123);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const typeorm_1 = __webpack_require__(3399);
const request_message_entity_1 = __webpack_require__(6429);
const request_entity_1 = __webpack_require__(2814);
const graphql_redis_subscriptions_1 = __webpack_require__(9262);
const typeorm_2 = __webpack_require__(5250);
let ChatService = class ChatService extends query_typeorm_1.TypeOrmQueryService {
    constructor(repository, requestRepository, pubSub) {
        super(repository);
        this.repository = repository;
        this.requestRepository = requestRepository;
        this.pubSub = pubSub;
    }
    createOne(input) {
        const _super = Object.create(null, {
            createOne: { get: () => super.createOne }
        });
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const message = yield _super.createOne.call(this, Object.assign(Object.assign({}, input), { sentByDriver: true }));
            const order = yield this.requestRepository.findOne(message.requestId, { relations: ['rider', 'driver'] });
            this.pubSub.publish('newMessageForRider', { message, riderId: order.riderId });
            return message;
        });
    }
};
ChatService = (0, tslib_1.__decorate)([
    (0, core_1.QueryService)(request_message_entity_1.OrderMessageEntity),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(request_message_entity_1.OrderMessageEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    (0, tslib_1.__param)(2, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        graphql_redis_subscriptions_1.RedisPubSub])
], ChatService);
exports.ChatService = ChatService;


/***/ }),

/***/ 5607:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatSubscriptionService = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const common_1 = __webpack_require__(6481);
const graphql_1 = __webpack_require__(1161);
const graphql_redis_subscriptions_1 = __webpack_require__(9262);
const order_message_dto_1 = __webpack_require__(3010);
let ChatSubscriptionService = class ChatSubscriptionService {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    newMessageReceived() {
        return this.pubSub.asyncIterator('newMessageForDriver');
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => order_message_dto_1.OrderMessageDTO, {
        filter(payload, variables, context) {
            return context.connection.context.id == payload.newMessageForDriver.driverId;
        },
    }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], ChatSubscriptionService.prototype, "newMessageReceived", null);
ChatSubscriptionService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__metadata)("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], ChatSubscriptionService);
exports.ChatSubscriptionService = ChatSubscriptionService;


/***/ }),

/***/ 3010:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(2856);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
const order_dto_1 = __webpack_require__(8803);
let OrderMessageDTO = class OrderMessageDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, sentAt: { type: () => Date }, status: { type: () => (__webpack_require__(2856).MessageStatus) }, content: { type: () => String }, sentByDriver: { type: () => Boolean }, requestId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderMessageDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderMessageDTO.prototype, "requestId", void 0);
OrderMessageDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('OrderMessage'),
    (0, query_graphql_1.Relation)('request', () => order_dto_1.OrderDTO)
], OrderMessageDTO);
exports.OrderMessageDTO = OrderMessageDTO;


/***/ }),

/***/ 1306:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageInput = void 0;
const tslib_1 = __webpack_require__(752);
const graphql_1 = __webpack_require__(1161);
let OrderMessageInput = class OrderMessageInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { requestId: { type: () => Number }, content: { type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderMessageInput.prototype, "requestId", void 0);
OrderMessageInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], OrderMessageInput);
exports.OrderMessageInput = OrderMessageInput;


/***/ }),

/***/ 6933:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintModule = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const common_1 = __webpack_require__(6481);
const complaint_entity_1 = __webpack_require__(1125);
const jwt_gql_auth_guard_1 = __webpack_require__(3058);
const complaint_dto_1 = __webpack_require__(3815);
const complaint_input_1 = __webpack_require__(2247);
let ComplaintModule = class ComplaintModule {
};
ComplaintModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([complaint_entity_1.ComplaintEntity])],
                resolvers: [
                    {
                        EntityClass: complaint_entity_1.ComplaintEntity,
                        DTOClass: complaint_dto_1.ComplaintDTO,
                        CreateDTOClass: complaint_input_1.ComplaintInput,
                        read: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        create: { many: { disabled: true } },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard]
                    }
                ]
            })
        ]
    })
], ComplaintModule);
exports.ComplaintModule = ComplaintModule;


/***/ }),

/***/ 3815:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(8105);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
let ComplaintDTO = class ComplaintDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, subject: { type: () => String }, content: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__(8105).ComplaintStatus) } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintDTO.prototype, "id", void 0);
ComplaintDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Complaint')
], ComplaintDTO);
exports.ComplaintDTO = ComplaintDTO;


/***/ }),

/***/ 2247:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintInput = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
let ComplaintInput = class ComplaintInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { requestId: { type: () => Number }, subject: { type: () => String }, content: { nullable: true, type: () => String }, requestedByDriver: { nullable: true, type: () => Boolean } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ComplaintInput.prototype, "requestId", void 0);
ComplaintInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)(),
    (0, query_graphql_1.BeforeCreateOne)((input) => {
        input.input.requestedByDriver = true;
        return input;
    })
], ComplaintInput);
exports.ComplaintInput = ComplaintInput;


/***/ }),

/***/ 9576:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverAPIController = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const fastify = __webpack_require__(1442);
const rest_jwt_auth_guard_1 = __webpack_require__(7606);
const util_1 = __webpack_require__(6464);
const stream_1 = __webpack_require__(2781);
const fs_1 = __webpack_require__(7147);
const typeorm_1 = __webpack_require__(3399);
const driver_entity_1 = __webpack_require__(5956);
const media_entity_1 = __webpack_require__(3465);
const typeorm_2 = __webpack_require__(5250);
const path_1 = __webpack_require__(1423);
const pump = (0, util_1.promisify)(stream_1.pipeline);
const database_1 = __webpack_require__(1617);
const shared_driver_service_1 = __webpack_require__(7301);
const transaction_action_enum_1 = __webpack_require__(7454);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(7519);
const transaction_status_enum_1 = __webpack_require__(1376);
let DriverAPIController = class DriverAPIController {
    constructor(mediaRepository, driverRepository, cryptoService, sharedDriverService) {
        this.mediaRepository = mediaRepository;
        this.driverRepository = driverRepository;
        this.cryptoService = cryptoService;
        this.sharedDriverService = sharedDriverService;
    }
    verifyPayment(req, res) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const token = req.query.token;
            const decrypted = yield this.cryptoService.decrypt(token);
            if (decrypted.userType == 'client') {
                if (decrypted.status == 'success') {
                    yield this.sharedDriverService.rechargeWallet({
                        driverId: decrypted.userId,
                        amount: decrypted.amount,
                        currency: decrypted.currency,
                        refrenceNumber: decrypted.transactionNumber,
                        action: transaction_action_enum_1.TransactionAction.Recharge,
                        rechargeType: driver_recharge_transaction_type_enum_1.DriverRechargeTransactionType.InAppPayment,
                        paymentGatewayId: decrypted.gatewayId,
                        status: transaction_status_enum_1.TransactionStatus.Done
                    });
                    res.send('Transaction successful. Close this page and go back to the app.');
                }
                else {
                    res.send('Transaction wasn\'t successful. You can go back to the app and redo this.');
                }
            }
        });
    }
    upload(req, res) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = yield req.file();
            const dir = 'uploads';
            yield fs_1.promises.mkdir(dir, { recursive: true });
            const _fileName = (0, path_1.join)(dir, `${new Date().getTime()}-${data.filename}`);
            yield pump(data.file, (0, fs_1.createWriteStream)(_fileName));
            const insert = yield this.mediaRepository.insert({ address: _fileName });
            yield this.driverRepository.update(req.user.id, { mediaId: insert.raw.insertId });
            res.code(200).send({ id: insert.raw.insertId, address: _fileName });
        });
    }
    uploadDocuement(req, res) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = yield req.file();
            const dir = 'uploads';
            yield fs_1.promises.mkdir(dir, { recursive: true });
            const _fileName = (0, path_1.join)(dir, `${new Date().getTime()}-${data.filename}`);
            yield pump(data.file, (0, fs_1.createWriteStream)(_fileName));
            const insert = yield this.mediaRepository.insert({ address: _fileName, driverDocumentId: req.user.id });
            res.code(200).send({ id: insert.raw.insertId, address: _fileName });
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)('payment_result'),
    (0, tslib_1.__param)(0, (0, common_1.Req)()),
    (0, tslib_1.__param)(1, (0, common_1.Res)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DriverAPIController.prototype, "verifyPayment", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('upload_profile'),
    (0, common_1.UseGuards)(rest_jwt_auth_guard_1.RestJwtAuthGuard),
    (0, tslib_1.__param)(0, (0, common_1.Request)()),
    (0, tslib_1.__param)(1, (0, common_1.Res)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DriverAPIController.prototype, "upload", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('upload_document'),
    (0, common_1.UseGuards)(rest_jwt_auth_guard_1.RestJwtAuthGuard),
    (0, tslib_1.__param)(0, (0, common_1.Request)()),
    (0, tslib_1.__param)(1, (0, common_1.Res)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], DriverAPIController.prototype, "uploadDocuement", null);
DriverAPIController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(media_entity_1.MediaEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        database_1.CryptoService,
        shared_driver_service_1.SharedDriverService])
], DriverAPIController);
exports.DriverAPIController = DriverAPIController;


/***/ }),

/***/ 6683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverAPIModule = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const config_1 = __webpack_require__(5793);
const graphql_1 = __webpack_require__(1161);
const schedule_1 = __webpack_require__(1149);
const typeorm_1 = __webpack_require__(3399);
const database_1 = __webpack_require__(1617);
const nestjs_redis_1 = __webpack_require__(8312);
const path_1 = __webpack_require__(1423);
const auth_module_1 = __webpack_require__(8235);
const jwt_strategy_1 = __webpack_require__(8114);
const driver_api_controller_1 = __webpack_require__(9576);
const driver_module_1 = __webpack_require__(9311);
const order_module_1 = __webpack_require__(5104);
const upload_module_1 = __webpack_require__(7476);
const announcements_module_1 = __webpack_require__(1565);
const wallet_module_1 = __webpack_require__(5654);
const service_module_1 = __webpack_require__(5015);
const shared_driver_service_1 = __webpack_require__(7301);
const chat_module_1 = __webpack_require__(7156);
const complaint_module_1 = __webpack_require__(6933);
let DriverAPIModule = class DriverAPIModule {
};
DriverAPIModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            database_1.DatabaseModule,
            service_module_1.ServiceModule,
            config_1.ConfigModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                cors: false,
                subscriptions: {
                    'subscriptions-transport-ws': {
                        keepAlive: 5000,
                        onConnect: (connectionParams) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                            if (connectionParams.authToken) {
                                return (0, jwt_strategy_1.validateToken)(connectionParams.authToken);
                            }
                            throw new Error('Missing auth token!');
                        }),
                    },
                },
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'apps/driver-app/driver.schema.gql'),
                buildSchemaOptions: {
                    dateScalarMode: 'timestamp',
                },
                // context: ({ req, res, payload, connection }) => ({
                //   req,
                //   res,
                //   payload,
                //   connection,
                // }),
            }),
            typeorm_1.TypeOrmModule.forFeature(database_1.entities),
            auth_module_1.AuthModule.register(),
            upload_module_1.UploadModule,
            driver_module_1.DriverModule,
            chat_module_1.ChatModule,
            order_module_1.OrderModule,
            wallet_module_1.WalletModule,
            nestjs_redis_1.RedisModule.forRoot({
                closeClient: true,
                commonOptions: { db: 2 },
                config: {
                    host: (_a = process.env.REDIS_HOST) !== null && _a !== void 0 ? _a : 'localhost',
                },
            }),
            announcements_module_1.AnnouncementsModule,
            complaint_module_1.ComplaintModule,
        ],
        controllers: [driver_api_controller_1.DriverAPIController],
        providers: [database_1.CryptoService, shared_driver_service_1.SharedDriverService],
    })
], DriverAPIModule);
exports.DriverAPIModule = DriverAPIModule;


/***/ }),

/***/ 9311:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverModule = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const driver_entity_1 = __webpack_require__(5956);
const driver_service_1 = __webpack_require__(6922);
const driver_dto_1 = __webpack_require__(6097);
const query_typeorm_1 = __webpack_require__(6291);
const car_model_dto_1 = __webpack_require__(7161);
const car_model_entity_1 = __webpack_require__(9061);
const car_color_dto_1 = __webpack_require__(6755);
const car_color_entity_1 = __webpack_require__(4861);
const update_driver_input_1 = __webpack_require__(1944);
const jwt_gql_auth_guard_1 = __webpack_require__(3058);
const redis_helper_module_1 = __webpack_require__(6925);
const upload_module_1 = __webpack_require__(7476);
const media_entity_1 = __webpack_require__(3465);
let DriverModule = class DriverModule {
};
DriverModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            redis_helper_module_1.RedisHelpersModule,
            upload_module_1.UploadModule,
            typeorm_1.TypeOrmModule.forFeature([driver_entity_1.DriverEntity]),
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([driver_entity_1.DriverEntity, car_model_entity_1.CarModelEntity, car_color_entity_1.CarColorEntity, media_entity_1.MediaEntity])],
                resolvers: [
                    {
                        EntityClass: driver_entity_1.DriverEntity,
                        DTOClass: driver_dto_1.DriverDTO,
                        UpdateDTOClass: update_driver_input_1.UpdateDriverInput,
                        read: { many: { disabled: true } },
                        create: { disabled: true },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard]
                    },
                    {
                        EntityClass: car_model_entity_1.CarModelEntity,
                        DTOClass: car_model_dto_1.CarModelDTO,
                        create: { disabled: true },
                        read: { one: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE
                    },
                    {
                        EntityClass: car_color_entity_1.CarColorEntity,
                        DTOClass: car_color_dto_1.CarColorDTO,
                        create: { disabled: true },
                        read: { one: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE
                    }
                ],
            }),
        ],
        providers: [driver_service_1.DriverService],
        exports: [driver_service_1.DriverService]
    })
], DriverModule);
exports.DriverModule = DriverModule;


/***/ }),

/***/ 6922:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const driver_entity_1 = __webpack_require__(5956);
const typeorm_1 = __webpack_require__(5250);
const typeorm_2 = __webpack_require__(3399);
const driver_status_enum_1 = __webpack_require__(8142);
const driver_redis_service_1 = __webpack_require__(8911);
let DriverService = class DriverService {
    constructor(repo, driverRedisService) {
        this.repo = repo;
        this.driverRedisService = driverRedisService;
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
    findOrCreateUserWithMobileNumber(mobileNumber) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const findResult = yield this.findUserByMobileNumber(mobileNumber);
            return findResult !== null && findResult !== void 0 ? findResult : this.repo.save({
                mobileNumber: mobileNumber,
            });
        });
    }
    findByIds(ids) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repo.findByIds(ids);
        });
    }
    expireDriverStatus(driverIds) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (driverIds.length < 1) {
                return;
            }
            this.driverRedisService.expire(driverIds);
            return this.repo.update(driverIds, { status: driver_status_enum_1.DriverStatus.Offline, lastSeenTimestamp: new Date() });
        });
    }
};
DriverService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_2.InjectRepository)(driver_entity_1.DriverEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_1.Repository,
        driver_redis_service_1.DriverRedisService])
], DriverService);
exports.DriverService = DriverService;


/***/ }),

/***/ 6755:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorDTO = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
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
    (0, graphql_1.ObjectType)('CarColor')
], CarColorDTO);
exports.CarColorDTO = CarColorDTO;


/***/ }),

/***/ 7161:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelDTO = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
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
    (0, graphql_1.ObjectType)('CarModel')
], CarModelDTO);
exports.CarModelDTO = CarModelDTO;


/***/ }),

/***/ 6097:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(8142);
const eager_import_1 = __webpack_require__(3900);
const graphql_1 = __webpack_require__(1161);
const query_graphql_1 = __webpack_require__(4097);
const car_model_dto_1 = __webpack_require__(7161);
const car_color_dto_1 = __webpack_require__(6755);
const order_dto_1 = __webpack_require__(8803);
const core_1 = __webpack_require__(7123);
const order_status_enum_1 = __webpack_require__(1530);
const media_dto_1 = __webpack_require__(5565);
let DriverDTO = class DriverDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String }, certificateNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, carProductionYear: { nullable: true, type: () => Number }, carPlate: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__(8142).DriverStatus) }, gender: { nullable: true, type: () => (__webpack_require__(3900).Gender) }, registrationTimestamp: { type: () => Date }, lastSeenTimestamp: { nullable: true, type: () => Date }, accountNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, bankRoutingNumber: { nullable: true, type: () => String }, bankSwift: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, softRejectionNote: { nullable: true, type: () => String }, carModelId: { nullable: true, type: () => Number }, carColorId: { nullable: true, type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "carProductionYear", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "carModelId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverDTO.prototype, "carColorId", void 0);
DriverDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Driver'),
    (0, query_graphql_1.Authorize)({
        authorize: (context) => ({ id: { eq: context.req.user.id } })
    }),
    (0, query_graphql_1.BeforeFindOne)((input, context) => {
        return { id: context.req.user.id };
    }),
    (0, query_graphql_1.UnPagedRelation)('documents', () => media_dto_1.MediaDTO),
    (0, query_graphql_1.Relation)('car', () => car_model_dto_1.CarModelDTO, { nullable: true }),
    (0, query_graphql_1.Relation)('carColor', () => car_color_dto_1.CarColorDTO, { nullable: true }),
    (0, query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true }),
    (0, query_graphql_1.OffsetConnection)('orders', () => order_dto_1.OrderDTO, { maxResultsSize: 1, defaultFilter: { status: { in: [order_status_enum_1.OrderStatus.DriverAccepted, order_status_enum_1.OrderStatus.Arrived, order_status_enum_1.OrderStatus.Started, order_status_enum_1.OrderStatus.WaitingForPostPay] } }, defaultSort: [{ field: 'id', direction: core_1.SortDirection.DESC }], defaultResultSize: 1 })
], DriverDTO);
exports.DriverDTO = DriverDTO;


/***/ }),

/***/ 1944:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDriverInput = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(8142);
const eager_import_1 = __webpack_require__(3900);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
const driver_entity_1 = __webpack_require__(5956);
const driver_status_enum_1 = __webpack_require__(8142);
const service_entity_1 = __webpack_require__(950);
const typeorm_1 = __webpack_require__(5250);
let UpdateDriverInput = class UpdateDriverInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, status: { nullable: true, type: () => (__webpack_require__(8142).DriverStatus) }, certificateNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, carProductionYear: { nullable: true, type: () => Number }, carPlate: { nullable: true, type: () => String }, mediaId: { nullable: true, type: () => Number }, gender: { nullable: true, type: () => (__webpack_require__(3900).Gender) }, accountNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, bankRoutingNumber: { nullable: true, type: () => String }, bankSwift: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, documents: { nullable: true, type: () => [String] }, carModelId: { nullable: true, type: () => Number }, carColorId: { nullable: true, type: () => Number }, notificationPlayerId: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateDriverInput.prototype, "carProductionYear", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateDriverInput.prototype, "carModelId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateDriverInput.prototype, "carColorId", void 0);
UpdateDriverInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)(),
    (0, query_graphql_1.BeforeUpdateOne)((input, context) => {
        input.id = context.req.user.id;
        const allowedStatuses = [driver_status_enum_1.DriverStatus.Offline, driver_status_enum_1.DriverStatus.Online, driver_status_enum_1.DriverStatus.WaitingDocuments, driver_status_enum_1.DriverStatus.SoftReject];
        const isNotAllowed = allowedStatuses.filter(status => driver_status_enum_1.DriverStatus[status] == driver_status_enum_1.DriverStatus[input.update.status]).length < 1;
        if (input.update.status && isNotAllowed) {
            delete input.update.status;
        }
        if (input.update.status == driver_status_enum_1.DriverStatus.PendingApproval && process.env.DEMO_MODE != null) {
            input.update.status = driver_status_enum_1.DriverStatus.Offline;
            (0, typeorm_1.getRepository)(service_entity_1.ServiceEntity).find().then(services => (0, typeorm_1.getRepository)(driver_entity_1.DriverEntity).save({ id: input.id, enabledServices: services }));
        }
        return input;
    })
], UpdateDriverInput);
exports.UpdateDriverInput = UpdateDriverInput;


/***/ }),

/***/ 7418:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CronJobService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronJobService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const schedule_1 = __webpack_require__(1149);
const driver_status_enum_1 = __webpack_require__(8142);
const driver_notification_service_1 = __webpack_require__(8757);
const driver_redis_service_1 = __webpack_require__(8911);
const order_redis_service_1 = __webpack_require__(256);
const nestjs_redis_1 = __webpack_require__(8312);
const driver_service_1 = __webpack_require__(6922);
const order_service_1 = __webpack_require__(1749);
let CronJobService = CronJobService_1 = class CronJobService {
    constructor(orderService, driverService, redisService, driverRedisService, orderRedisService, driverNotificationService) {
        this.orderService = orderService;
        this.driverService = driverService;
        this.redisService = redisService;
        this.driverRedisService = driverRedisService;
        this.orderRedisService = orderRedisService;
        this.driverNotificationService = driverNotificationService;
    }
    cronTask() {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const logger = new common_1.Logger(CronJobService_1.name);
            logger.debug('Running expiration validation cron task.');
            const ts = Math.round(new Date().getTime());
            // Driver Locations Expire Time If Not Updated, 60 Minutes By Default
            const tsDriverMaxTime = ts - (60 * 60000);
            // Requests Expire Time, 10 Minutes By Default
            const expirationMinutes = parseInt((_a = process.env.REQUEST_EXPIRATION) !== null && _a !== void 0 ? _a : '10');
            const tsRequestMaxTime = ts - (expirationMinutes * 60000);
            const expiredDrivers = (yield this.redisService.zrangebyscore('driver-location-time', 0, tsDriverMaxTime)).map(str => parseInt(str));
            const expiredRequests = (yield this.redisService.zrangebyscore('request-time', 0, tsRequestMaxTime)).map(str => parseInt(str));
            // Expiring drivers locations with outdated location
            if (expiredDrivers.length > 0 && process.env.DRIVERS_ALWAYS_ON == null) {
                const drivers = (yield this.driverService.findByIds(expiredDrivers)).filter(driver => driver.status != driver_status_enum_1.DriverStatus.InService).map(driver => driver.id);
                this.driverService.expireDriverStatus(drivers);
            }
            // Expiring requests with expired timestamp (10 minutes ago by default)
            if (expiredRequests.length > 0) {
                this.orderService.expireOrders(expiredRequests);
            }
            // Notifying drivers of an unaccepted order or upcoming order
            const waitingMinTime = ts - (10 * 60000);
            const waitingMaxTime = ts + (30 * 60000);
            const waitingRequests = (yield this.redisService.zrangebyscore('request-time', waitingMinTime, waitingMaxTime)).map(str => parseInt(str));
            for (const waitingRequest of waitingRequests) {
                const driversNotified = yield this.orderRedisService.getDriversNotified(waitingRequest);
                const requestLocation = yield this.redisService.geopos('request', waitingRequest.toString());
                let closeDrivers = yield this.driverRedisService.getClose({ lat: parseFloat(requestLocation[0][1]), lng: parseFloat(requestLocation[0][0]) }, 10000);
                closeDrivers = closeDrivers.filter(x => {
                    return !(driversNotified.includes(x.driverId));
                });
                if (closeDrivers.length > 0) {
                    const driverIds = closeDrivers.map(x => x.driverId);
                    const drivers = yield this.driverService.findByIds(driverIds);
                    this.driverNotificationService.requests(drivers);
                }
            }
        });
    }
};
(0, tslib_1.__decorate)([
    (0, schedule_1.Interval)(500000),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CronJobService.prototype, "cronTask", null);
CronJobService = CronJobService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(2, (0, nestjs_redis_1.InjectRedis)()),
    (0, tslib_1.__metadata)("design:paramtypes", [order_service_1.OrderService,
        driver_service_1.DriverService, Object, driver_redis_service_1.DriverRedisService,
        order_redis_service_1.OrderRedisService,
        driver_notification_service_1.DriverNotificationService])
], CronJobService);
exports.CronJobService = CronJobService;


/***/ }),

/***/ 3194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverOrderQueryService = void 0;
const tslib_1 = __webpack_require__(752);
const core_1 = __webpack_require__(7123);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const common_1 = __webpack_require__(6481);
const graphql_1 = __webpack_require__(1161);
const typeorm_1 = __webpack_require__(3399);
const driver_status_enum_1 = __webpack_require__(8142);
const order_status_enum_1 = __webpack_require__(1530);
const request_entity_1 = __webpack_require__(2814);
const google_services_service_1 = __webpack_require__(9380);
const service_service_1 = __webpack_require__(5856);
const shared_driver_service_1 = __webpack_require__(7301);
const driver_redis_service_1 = __webpack_require__(8911);
const order_redis_service_1 = __webpack_require__(256);
const apollo_server_core_1 = __webpack_require__(3342);
const graphql_redis_subscriptions_1 = __webpack_require__(9262);
const typeorm_2 = __webpack_require__(5250);
const order_service_1 = __webpack_require__(1749);
let DriverOrderQueryService = class DriverOrderQueryService extends query_typeorm_1.TypeOrmQueryService {
    constructor(orderRepository, driverService, orderService, serviceService, orderRedisService, driverRedisService, googleServices, pubSub, context) {
        super(orderRepository);
        this.orderRepository = orderRepository;
        this.driverService = driverService;
        this.orderService = orderService;
        this.serviceService = serviceService;
        this.orderRedisService = orderRedisService;
        this.driverRedisService = driverRedisService;
        this.googleServices = googleServices;
        this.pubSub = pubSub;
        this.context = context;
    }
    updateOne(id, update) {
        const _super = Object.create(null, {
            updateOne: { get: () => super.updateOne }
        });
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            switch (update.status) {
                case order_status_enum_1.OrderStatus.DriverCanceled: {
                    return this.orderService.cancelOrder(id);
                }
                case order_status_enum_1.OrderStatus.DriverAccepted: {
                    const [travel, driverLocation] = yield Promise.all([
                        this.orderRepository.findOne(id),
                        this.driverRedisService.getDriverCoordinate(this.context.req.user.id)
                    ]);
                    const allowedStatuses = [order_status_enum_1.OrderStatus.Found, order_status_enum_1.OrderStatus.NoCloseFound, order_status_enum_1.OrderStatus.Requested, order_status_enum_1.OrderStatus.Booked];
                    if (travel == null || !allowedStatuses.includes(travel.status)) {
                        throw new apollo_server_core_1.ForbiddenError("Already Taken");
                    }
                    const metrics = driverLocation != null ? yield this.googleServices.getSumDistanceAndDuration([travel.points[0], driverLocation]) : { distance: 0, duration: 0 };
                    const dt = new Date();
                    const etaPickup = dt.setSeconds(dt.getSeconds() + metrics.duration);
                    this.driverService.updateDriverStatus(this.context.req.user.id, driver_status_enum_1.DriverStatus.InService);
                    //const order = await this.orderRepository.findOne(travel.id);
                    yield this.orderRedisService.expire([id]);
                    const result = yield _super.updateOne.call(this, id, { status: order_status_enum_1.OrderStatus.DriverAccepted, etaPickup: new Date(etaPickup), driverId: this.context.req.user.id });
                    result.driver = yield this.driverService.driverRepo.findOne(this.context.req.user.id, { relations: ['car', 'carColor'] });
                    result.service = yield this.serviceService.getWithId(result.serviceId);
                    this.pubSub.publish('orderUpdated', { orderUpdated: result });
                    this.pubSub.publish('orderRemoved', { orderRemoved: result }); // This one has a filter to let know all except the one accepted.
                    return result;
                }
                case order_status_enum_1.OrderStatus.Arrived:
                case order_status_enum_1.OrderStatus.Started: {
                    const result = yield _super.updateOne.call(this, id, { status: update.status });
                    //result.driver = await this.driverService.driverRepo.findOne(this.context.req.user.id, {relations: ['car', 'carColor']});
                    this.pubSub.publish('orderUpdated', { orderUpdated: result });
                    return result;
                }
                case order_status_enum_1.OrderStatus.Finished: {
                    common_1.Logger.log(`Finishing service with ${JSON.stringify(update)}`);
                    yield this.orderService.finish(id, update.paidAmount);
                    let order = yield this.orderRepository.findOne(id);
                    if (order.paidAmount < order.costAfterCoupon) {
                        order = yield _super.updateOne.call(this, id, { status: order_status_enum_1.OrderStatus.WaitingForPostPay });
                    }
                    else {
                        order = yield _super.updateOne.call(this, id, { status: order_status_enum_1.OrderStatus.WaitingForReview, finishTimestamp: new Date() });
                        this.driverService.updateDriverStatus(order.driverId, driver_status_enum_1.DriverStatus.Online);
                    }
                    //const driver = await this.driverService.driverRepo.findOne(this.context.req.user.id, {relations: ['car', 'carColor']});
                    //order.driver = driver;
                    this.pubSub.publish('orderUpdated', { orderUpdated: order });
                    return order;
                }
                default:
                    throw new apollo_server_core_1.ForbiddenError('Update status to this is not possible');
            }
        });
    }
};
DriverOrderQueryService = (0, tslib_1.__decorate)([
    (0, core_1.QueryService)(request_entity_1.RequestEntity),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    (0, tslib_1.__param)(7, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__param)(8, (0, common_1.Inject)(graphql_1.CONTEXT)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        shared_driver_service_1.SharedDriverService,
        order_service_1.OrderService,
        service_service_1.ServiceService,
        order_redis_service_1.OrderRedisService,
        driver_redis_service_1.DriverRedisService,
        google_services_service_1.GoogleServicesService,
        graphql_redis_subscriptions_1.RedisPubSub, Object])
], DriverOrderQueryService);
exports.DriverOrderQueryService = DriverOrderQueryService;


/***/ }),

/***/ 6335:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvailableOrderDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(1530);
const eager_import_1 = __webpack_require__(4958);
const graphql_1 = __webpack_require__(1161);
let AvailableOrderDTO = class AvailableOrderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdOn: { type: () => Date }, startTimestamp: { nullable: true, type: () => Date }, finishTimestamp: { nullable: true, type: () => Date }, etaPickup: { nullable: true, type: () => Date }, status: { type: () => (__webpack_require__(1530).OrderStatus) }, expectedTimestamp: { type: () => Date }, costBest: { type: () => Number }, distanceBest: { type: () => Number }, durationBest: { type: () => Number }, currency: { type: () => String }, driverId: { nullable: true, type: () => Number }, addresses: { type: () => [String] }, points: { type: () => [(__webpack_require__(4958).Point)] } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], AvailableOrderDTO.prototype, "distanceBest", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, tslib_1.__metadata)("design:type", Number)
], AvailableOrderDTO.prototype, "durationBest", void 0);
AvailableOrderDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('AvailableOrder')
], AvailableOrderDTO);
exports.AvailableOrderDTO = AvailableOrderDTO;


/***/ }),

/***/ 8803:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(1530);
const eager_import_1 = __webpack_require__(4958);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
const order_status_enum_1 = __webpack_require__(1530);
const rider_dto_1 = __webpack_require__(3549);
const service_dto_1 = __webpack_require__(675);
const order_message_dto_1 = __webpack_require__(3010);
const driver_dto_1 = __webpack_require__(6097);
let OrderDTO = class OrderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, status: { type: () => (__webpack_require__(1530).OrderStatus) }, createdOn: { type: () => Date }, distanceBest: { type: () => Number }, durationBest: { type: () => Number }, startTimestamp: { nullable: true, type: () => Date }, finishTimestamp: { nullable: true, type: () => Date }, etaPickup: { nullable: true, type: () => Date }, expectedTimestamp: { type: () => Date }, costBest: { type: () => Number }, costAfterCoupon: { type: () => Number }, paidAmount: { type: () => Number }, currency: { type: () => String }, driverId: { nullable: true, type: () => Number }, addresses: { type: () => [String] }, points: { type: () => [(__webpack_require__(4958).Point)] } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderDTO.prototype, "id", void 0);
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
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], OrderDTO.prototype, "driverId", void 0);
OrderDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Order'),
    (0, query_graphql_1.Authorize)({
        authorize: (context) => ({ driverId: { eq: context.req.user.id } })
    }),
    (0, query_graphql_1.Relation)('driver', () => driver_dto_1.DriverDTO),
    (0, query_graphql_1.Relation)('rider', () => rider_dto_1.RiderDTO),
    (0, query_graphql_1.Relation)('service', () => service_dto_1.ServiceDTO),
    (0, query_graphql_1.UnPagedRelation)('conversation', () => order_message_dto_1.OrderMessageDTO, { relationName: 'conversation' })
], OrderDTO);
exports.OrderDTO = OrderDTO;


/***/ }),

/***/ 3549:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDTO = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
const media_dto_1 = __webpack_require__(5565);
let RiderDTO = class RiderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], RiderDTO.prototype, "id", void 0);
RiderDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Rider'),
    (0, query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true })
], RiderDTO);
exports.RiderDTO = RiderDTO;


/***/ }),

/***/ 2292:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateOrderInput = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(1530);
const graphql_1 = __webpack_require__(1161);
let UpdateOrderInput = class UpdateOrderInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { type: () => (__webpack_require__(1530).OrderStatus) }, paidAmount: { nullable: true, type: () => Number } };
    }
};
UpdateOrderInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateOrderInput);
exports.UpdateOrderInput = UpdateOrderInput;


/***/ }),

/***/ 6268:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSubscriptionService = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const common_1 = __webpack_require__(6481);
const graphql_1 = __webpack_require__(1161);
const graphql_redis_subscriptions_1 = __webpack_require__(9262);
const available_order_dto_1 = __webpack_require__(6335);
const order_dto_1 = __webpack_require__(8803);
let OrderSubscriptionService = class OrderSubscriptionService {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    orderCreated() {
        return this.pubSub.asyncIterator('orderCreated');
    }
    orderUpdated() {
        return this.pubSub.asyncIterator('orderUpdated');
    }
    orderRemoved() {
        return this.pubSub.asyncIterator('orderRemoved');
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => available_order_dto_1.AvailableOrderDTO, {
    // filter(
    //   this: OrderResolver,
    //   payload: { orderCreated: AvailableOrderDTO },
    //   variables,
    //   context
    // ) {
    //   // return context.connection.context.id == payload.orderCreated.driverId;
    //   return true;
    // },
    }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], OrderSubscriptionService.prototype, "orderCreated", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => order_dto_1.OrderDTO, {
        filter(payload, variables, context) {
            return context.connection.context.id == payload.orderUpdated.driverId;
        },
    }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], OrderSubscriptionService.prototype, "orderUpdated", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => available_order_dto_1.AvailableOrderDTO, {
        filter(payload, variables, context) {
            if (payload.orderRemoved.driverId == null)
                return true;
            return context.connection.context.id != payload.orderRemoved.driverId;
        },
    }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], OrderSubscriptionService.prototype, "orderRemoved", null);
OrderSubscriptionService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__metadata)("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], OrderSubscriptionService);
exports.OrderSubscriptionService = OrderSubscriptionService;


/***/ }),

/***/ 5104:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderModule = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const database_1 = __webpack_require__(1617);
const driver_transaction_entity_1 = __webpack_require__(4439);
const driver_wallet_entity_1 = __webpack_require__(8547);
const driver_entity_1 = __webpack_require__(5956);
const request_entity_1 = __webpack_require__(2814);
const provider_transaction_entity_1 = __webpack_require__(330);
const provider_wallet_entity_1 = __webpack_require__(8806);
const rider_entity_1 = __webpack_require__(6525);
const rider_transaction_entity_1 = __webpack_require__(679);
const rider_wallet_entity_1 = __webpack_require__(9365);
const service_category_entity_1 = __webpack_require__(7005);
const service_entity_1 = __webpack_require__(950);
const firebase_notification_service_module_1 = __webpack_require__(3087);
const google_services_module_1 = __webpack_require__(4868);
const shared_order_service_1 = __webpack_require__(5697);
const shared_provider_service_1 = __webpack_require__(5792);
const shared_fleet_service_1 = __webpack_require__(9097);
const region_module_1 = __webpack_require__(5804);
const shared_rider_service_1 = __webpack_require__(9949);
const service_service_1 = __webpack_require__(5856);
const order_dto_1 = __webpack_require__(8803);
const order_resolver_1 = __webpack_require__(5542);
const driver_order_query_service_1 = __webpack_require__(3194);
const redis_helper_module_1 = __webpack_require__(6925);
const cron_job_service_1 = __webpack_require__(7418);
const driver_module_1 = __webpack_require__(9311);
const shared_driver_service_1 = __webpack_require__(7301);
const order_service_1 = __webpack_require__(1749);
const fleet_wallet_entity_1 = __webpack_require__(9310);
const fleet_transaction_entity_1 = __webpack_require__(8570);
const orde_subscription_service_1 = __webpack_require__(6268);
const rider_dto_1 = __webpack_require__(3549);
let OrderModule = class OrderModule {
};
OrderModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            redis_helper_module_1.RedisHelpersModule,
            driver_module_1.DriverModule,
            typeorm_1.TypeOrmModule.forFeature([
                request_entity_1.RequestEntity,
                service_category_entity_1.ServiceCategoryEntity,
                service_entity_1.ServiceEntity,
                rider_entity_1.RiderEntity,
                rider_wallet_entity_1.RiderWalletEntity,
                rider_transaction_entity_1.RiderTransactionEntity,
                driver_entity_1.DriverEntity,
                driver_wallet_entity_1.DriverWalletEntity,
                driver_transaction_entity_1.DriverTransactionEntity,
                provider_wallet_entity_1.ProviderWalletEntity,
                provider_transaction_entity_1.ProviderTransactionEntity,
                fleet_wallet_entity_1.FleetWalletEntity,
                fleet_transaction_entity_1.FleetTransactionEntity
            ]),
            region_module_1.RegionModule,
            firebase_notification_service_module_1.FirebaseNotificationModule.register(),
            google_services_module_1.GoogleServicesModule,
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([request_entity_1.RequestEntity, rider_entity_1.RiderEntity]),
                ],
                pubSub: database_1.RedisPubSubProvider.provider(),
                dtos: [{ DTOClass: order_dto_1.OrderDTO }],
                resolvers: [
                    {
                        DTOClass: rider_dto_1.RiderDTO,
                        EntityClass: rider_entity_1.RiderEntity,
                        read: { disabled: true },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true }
                    }
                ]
            }),
        ],
        providers: [
            orde_subscription_service_1.OrderSubscriptionService,
            shared_order_service_1.SharedOrderService,
            driver_order_query_service_1.DriverOrderQueryService,
            order_resolver_1.OrderResolver,
            order_service_1.OrderService,
            service_service_1.ServiceService,
            shared_rider_service_1.SharedRiderService,
            shared_driver_service_1.SharedDriverService,
            shared_provider_service_1.SharedProviderService,
            shared_fleet_service_1.SharedFleetService,
            database_1.RedisPubSubProvider.provider(),
            cron_job_service_1.CronJobService,
        ],
        exports: [
            driver_order_query_service_1.DriverOrderQueryService
        ]
    })
], OrderModule);
exports.OrderModule = OrderModule;


/***/ }),

/***/ 5542:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderResolver = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const common_1 = __webpack_require__(6481);
const graphql_1 = __webpack_require__(1161);
const database_1 = __webpack_require__(1617);
const driver_redis_service_1 = __webpack_require__(8911);
const order_redis_service_1 = __webpack_require__(256);
const graphql_redis_subscriptions_1 = __webpack_require__(9262);
const jwt_gql_auth_guard_1 = __webpack_require__(3058);
const driver_order_query_service_1 = __webpack_require__(3194);
const available_order_dto_1 = __webpack_require__(6335);
const order_dto_1 = __webpack_require__(8803);
const update_order_input_1 = __webpack_require__(2292);
let OrderResolver = class OrderResolver extends (0, query_graphql_1.CRUDResolver)(order_dto_1.OrderDTO, {
    UpdateDTOClass: update_order_input_1.UpdateOrderInput,
    create: { disabled: true },
    update: { many: { disabled: true } },
    delete: { disabled: true }
}) {
    constructor(driverOrderService, context, orderRedisService, driverRedisService, redisPubSub) {
        super(driverOrderService);
        this.driverOrderService = driverOrderService;
        this.context = context;
        this.orderRedisService = orderRedisService;
        this.driverRedisService = driverRedisService;
        this.redisPubSub = redisPubSub;
    }
    // @Query(() => OrderDTO)
    // async currentOrder(): Promise<OrderDTO> {
    //   return this.orderRepository.findOne({ driverId: this.context.req.user.id, status: In([OrderStatus.DriverAccepted, OrderStatus.Arrived, OrderStatus.Started, OrderStatus.WaitingForPostPay]) });
    // }
    availableOrders() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.orderRedisService.getForDriver(this.context.req.user.id, 999999999);
        });
    }
    updateDriversLocation(lat, lng) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.driverRedisService.setLocation(this.context.req.user.id, { lat, lng });
            return this.orderRedisService.getForDriver(this.context.req.user.id, 999999999);
        });
    }
    updateDriversLocationNew(point) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.redisPubSub.publish('driverLocationUpdated', { driverId: this.context.req.user.id, point });
            yield this.driverRedisService.setLocation(this.context.req.user.id, point);
            return this.orderRedisService.getForDriver(this.context.req.user.id, 999999999);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [available_order_dto_1.AvailableOrderDTO]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OrderResolver.prototype, "availableOrders", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => [available_order_dto_1.AvailableOrderDTO]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('lat', { type: () => graphql_1.Float })),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)('lng', { type: () => graphql_1.Float })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OrderResolver.prototype, "updateDriversLocation", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => [available_order_dto_1.AvailableOrderDTO]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('point', { type: () => database_1.Point })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [database_1.Point]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], OrderResolver.prototype, "updateDriversLocationNew", null);
OrderResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => order_dto_1.OrderDTO),
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    (0, tslib_1.__param)(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    (0, tslib_1.__param)(4, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__metadata)("design:paramtypes", [driver_order_query_service_1.DriverOrderQueryService, Object, order_redis_service_1.OrderRedisService,
        driver_redis_service_1.DriverRedisService,
        graphql_redis_subscriptions_1.RedisPubSub])
], OrderResolver);
exports.OrderResolver = OrderResolver;


/***/ }),

/***/ 1749:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderService = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const driver_deduct_transaction_type_enum_1 = __webpack_require__(2721);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(7519);
const driver_status_enum_1 = __webpack_require__(8142);
const order_status_enum_1 = __webpack_require__(1530);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(8756);
const rider_deduct_transaction_type_enum_1 = __webpack_require__(5652);
const service_payment_method_enum_1 = __webpack_require__(7870);
const transaction_action_enum_1 = __webpack_require__(7454);
const transaction_status_enum_1 = __webpack_require__(1376);
const request_entity_1 = __webpack_require__(2814);
const shared_driver_service_1 = __webpack_require__(7301);
const shared_fleet_service_1 = __webpack_require__(9097);
const shared_provider_service_1 = __webpack_require__(5792);
const shared_rider_service_1 = __webpack_require__(9949);
const order_redis_service_1 = __webpack_require__(256);
const apollo_server_core_1 = __webpack_require__(3342);
const graphql_redis_subscriptions_1 = __webpack_require__(9262);
const typeorm_2 = __webpack_require__(5250);
let OrderService = class OrderService {
    constructor(orderRepository, driverService, riderService, sharedProviderService, sharedFleetService, orderRedisService, pubSub) {
        this.orderRepository = orderRepository;
        this.driverService = driverService;
        this.riderService = riderService;
        this.sharedProviderService = sharedProviderService;
        this.sharedFleetService = sharedFleetService;
        this.orderRedisService = orderRedisService;
        this.pubSub = pubSub;
    }
    cancelOrder(orderId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let order = yield this.orderRepository.findOne(orderId);
            const allowedStatuses = [order_status_enum_1.OrderStatus.DriverAccepted, order_status_enum_1.OrderStatus.Arrived];
            if (order == null || !allowedStatuses.includes(order.status)) {
                throw new apollo_server_core_1.ForbiddenError("It is not allowed to cancel this order");
            }
            yield this.orderRepository.update(order.id, { status: order_status_enum_1.OrderStatus.DriverCanceled, finishTimestamp: new Date(), costAfterCoupon: 0 });
            order = yield this.orderRepository.findOne(order.id);
            this.driverService.updateDriverStatus(order.driverId, driver_status_enum_1.DriverStatus.Online);
            this.pubSub.publish('orderUpdated', { orderUpdated: order });
            return order;
        });
    }
    finish(orderId, cashAmount = 0.0) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.findOne(orderId, { relations: ['service', 'driver', 'driver.fleet'] });
            if (order.service.paymentMethod == service_payment_method_enum_1.ServicePaymentMethod.OnlyCredit && cashAmount > 0) {
                throw new apollo_server_core_1.ForbiddenError('Cash payment is not available for this service.');
            }
            const riderCredit = yield this.riderService.getRiderCreditInCurrency(order.riderId, order.currency);
            const commission = ((order.service.providerSharePercent) * order.costAfterCoupon / 100) + order.service.providerShareFlat;
            const unPaidAmount = order.costAfterCoupon - order.paidAmount;
            if ((riderCredit + cashAmount) < unPaidAmount) {
                return;
                //throw new ForbiddenError('Sum of rider\'s credit and cash payment are not enough to finish the service');
            }
            common_1.Logger.log(`Recharging driver wallet with ${-1 * commission}`);
            yield this.driverService.rechargeWallet({
                status: transaction_status_enum_1.TransactionStatus.Done,
                driverId: order.driverId,
                currency: order.currency,
                action: transaction_action_enum_1.TransactionAction.Deduct,
                deductType: driver_deduct_transaction_type_enum_1.DriverDeductTransactionType.Commission,
                amount: -1 * commission,
                requestId: order.id
            });
            let fleetShare = 0;
            if (order.driver.fleetId != null) {
                common_1.Logger.log(`Recharging fleet wallet with ${fleetShare}`);
                fleetShare = (commission * order.driver.fleet.commissionSharePercent / 100) + order.driver.fleet.commissionShareFlat;
                if (fleetShare > 0) {
                    this.sharedFleetService.rechargeWallet({
                        fleetId: order.driver.fleetId,
                        action: transaction_action_enum_1.TransactionAction.Recharge,
                        rechargeType: provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType.Commission,
                        amount: fleetShare,
                        currency: order.currency
                    });
                }
            }
            let adminShare = commission - fleetShare;
            common_1.Logger.log(`Recharging admin wallet with ${adminShare}`);
            yield this.sharedProviderService.rechargeWallet({
                action: transaction_action_enum_1.TransactionAction.Recharge,
                rechargeType: provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType.Commission,
                currency: order.currency,
                amount: commission - fleetShare
            });
            if (order.costAfterCoupon - cashAmount > 0) {
                common_1.Logger.log(`Recharging driver wallet with ${(order.costAfterCoupon - cashAmount)}`);
                yield this.driverService.rechargeWallet({
                    status: transaction_status_enum_1.TransactionStatus.Done,
                    driverId: order.driverId,
                    currency: order.currency,
                    action: transaction_action_enum_1.TransactionAction.Recharge,
                    rechargeType: driver_recharge_transaction_type_enum_1.DriverRechargeTransactionType.OrderFee,
                    amount: (order.costAfterCoupon - cashAmount)
                });
            }
            if (riderCredit > 0 && cashAmount < unPaidAmount) {
                common_1.Logger.log(`Recharging rider wallet with ${-1 * (unPaidAmount - cashAmount)}`);
                yield this.riderService.rechargeWallet({
                    status: transaction_status_enum_1.TransactionStatus.Done,
                    action: transaction_action_enum_1.TransactionAction.Deduct,
                    deductType: rider_deduct_transaction_type_enum_1.RiderDeductTransactionType.OrderFee,
                    currency: order.currency,
                    amount: -1 * (unPaidAmount - cashAmount),
                    riderId: order.riderId
                });
            }
            yield this.orderRepository.update(order.id, { paidAmount: order.costAfterCoupon });
        });
    }
    expireOrders(orderIds) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.orderRedisService.expire(orderIds);
            this.orderRepository.update(orderIds, { status: order_status_enum_1.OrderStatus.Expired });
        });
    }
};
OrderService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    (0, tslib_1.__param)(6, (0, query_graphql_1.InjectPubSub)()),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        shared_driver_service_1.SharedDriverService,
        shared_rider_service_1.SharedRiderService,
        shared_provider_service_1.SharedProviderService,
        shared_fleet_service_1.SharedFleetService,
        order_redis_service_1.OrderRedisService,
        graphql_redis_subscriptions_1.RedisPubSub])
], OrderService);
exports.OrderService = OrderService;


/***/ }),

/***/ 675:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(7870);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
const media_dto_1 = __webpack_require__(5565);
let ServiceDTO = class ServiceDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, paymentMethod: { type: () => (__webpack_require__(7870).ServicePaymentMethod) } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], ServiceDTO.prototype, "id", void 0);
ServiceDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Service'),
    (0, query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO)
], ServiceDTO);
exports.ServiceDTO = ServiceDTO;


/***/ }),

/***/ 5015:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceModule = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const common_1 = __webpack_require__(6481);
const media_entity_1 = __webpack_require__(3465);
const service_category_entity_1 = __webpack_require__(7005);
const service_entity_1 = __webpack_require__(950);
const service_service_1 = __webpack_require__(5856);
const upload_module_1 = __webpack_require__(7476);
const service_dto_1 = __webpack_require__(675);
let ServiceModule = class ServiceModule {
};
ServiceModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            upload_module_1.UploadModule,
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([service_entity_1.ServiceEntity, service_category_entity_1.ServiceCategoryEntity, media_entity_1.MediaEntity])],
                resolvers: [
                    {
                        EntityClass: service_entity_1.ServiceEntity,
                        DTOClass: service_dto_1.ServiceDTO,
                        create: { disabled: true },
                        read: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true }
                    },
                    // {
                    //     EntityClass: ServiceCategoryEntity,
                    //     DTOClass: ServiceCategoryDTO,
                    //     pagingStrategy: PagingStrategies.NONE,
                    //     create: { disabled: true },
                    //     read: { one: { disabled: true } },
                    //     update: { disabled: true },
                    //     delete: { disabled: true },
                    // }
                ],
            })
        ],
        providers: [service_service_1.ServiceService],
        exports: [service_service_1.ServiceService]
    })
], ServiceModule);
exports.ServiceModule = ServiceModule;


/***/ }),

/***/ 5565:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaDTO = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
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

/***/ 7476:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const common_1 = __webpack_require__(6481);
const driver_entity_1 = __webpack_require__(5956);
const media_entity_1 = __webpack_require__(3465);
const media_dto_1 = __webpack_require__(5565);
const upload_service_1 = __webpack_require__(6632);
let UploadModule = class UploadModule {
};
UploadModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([media_entity_1.MediaEntity, driver_entity_1.DriverEntity])],
                resolvers: [
                    {
                        EntityClass: media_entity_1.MediaEntity,
                        DTOClass: media_dto_1.MediaDTO,
                        create: { disabled: true },
                        read: { disabled: true },
                        delete: { disabled: true },
                        update: { disabled: true }
                    }
                ]
            })
        ],
        providers: [upload_service_1.UploadService],
        exports: [upload_service_1.UploadService, query_graphql_1.NestjsQueryGraphQLModule]
    })
], UploadModule);
exports.UploadModule = UploadModule;


/***/ }),

/***/ 6632:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const fs = __webpack_require__(7147);
const stream = __webpack_require__(2781);
const util = __webpack_require__(6464);
const path_1 = __webpack_require__(1423);
const typeorm_1 = __webpack_require__(3399);
const media_entity_1 = __webpack_require__(3465);
const typeorm_2 = __webpack_require__(5250);
const driver_entity_1 = __webpack_require__(5956);
let UploadService = class UploadService {
    constructor(mediaRepository, driverRepository) {
        this.mediaRepository = mediaRepository;
        this.driverRepository = driverRepository;
    }
    uploadMedia(req, res, dir, driverId, type, fileNamePrefix) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            //Check request is multipart
            if (!req.isMultipart()) {
                res.send(new common_1.BadRequestException());
                return;
            }
            let _fileName = '';
            const mp = yield req.multipart((field, file, filename, encoding, mimetype) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const pipeline = util.promisify(stream.pipeline);
                yield fs.promises.mkdir(dir, { recursive: true });
                _fileName = (0, path_1.join)(dir, fileNamePrefix != null ? `${fileNamePrefix}-${filename}` : filename);
                const writeStream = fs.createWriteStream((0, path_1.join)(process.cwd(), _fileName));
                try {
                    yield pipeline(file, writeStream);
                }
                catch (err) {
                    console.error('Pipeline failed', err);
                }
            }), (err) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (err) {
                    res.send(new common_1.HttpException('Internal server error', 500));
                    return;
                }
                if (type == 'PROFILE') {
                    const insert = yield this.mediaRepository.insert({ address: _fileName });
                    yield this.driverRepository.update(driverId, { mediaId: insert.raw.insertId });
                    res.code(200).send({ id: insert.raw.insertId, address: _fileName });
                }
                else {
                    const insert = yield this.mediaRepository.insert({ address: _fileName, driverDocumentId: driverId });
                    res.code(200).send({ id: insert.raw.insertId, address: _fileName });
                }
            }));
            // for key value pairs in request
            // mp.on('field', function (key: any, value: any) {
            //   //console.log('form-data', key, value);
            // });
        });
    }
};
UploadService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(media_entity_1.MediaEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UploadService);
exports.UploadService = UploadService;


/***/ }),

/***/ 7210:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(7454);
const eager_import_1 = __webpack_require__(2721);
const eager_import_2 = __webpack_require__(7519);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
let DriverTransactionDTO = class DriverTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, action: { type: () => (__webpack_require__(7454).TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__(2721).DriverDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__(7519).DriverRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, driverId: { type: () => Number } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverTransactionDTO.prototype, "driverId", void 0);
DriverTransactionDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)("DriverTransacion"),
    (0, query_graphql_1.Authorize)({
        authorize: (context) => ({ driverId: { eq: context.req.user.id } })
    })
], DriverTransactionDTO);
exports.DriverTransactionDTO = DriverTransactionDTO;


/***/ }),

/***/ 8277:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverWalletDTO = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
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
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], DriverWalletDTO.prototype, "driverId", void 0);
DriverWalletDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('DriverWallet'),
    (0, query_graphql_1.Authorize)({
        authorize: (context) => ({ driverId: { eq: context.req.user.id } })
    })
], DriverWalletDTO);
exports.DriverWalletDTO = DriverWalletDTO;


/***/ }),

/***/ 7516:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Datapoint = exports.StatisticsResult = exports.TimeQuery = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(7516);
const graphql_1 = __webpack_require__(1161);
var TimeQuery;
(function (TimeQuery) {
    TimeQuery["Daily"] = "daily";
    TimeQuery["Weekly"] = "weekly";
    TimeQuery["Monthly"] = "monthly";
})(TimeQuery = exports.TimeQuery || (exports.TimeQuery = {}));
(0, graphql_1.registerEnumType)(TimeQuery, { name: 'TimeQuery' });
let StatisticsResult = class StatisticsResult {
    static _GRAPHQL_METADATA_FACTORY() {
        return { currency: { type: () => String }, dataset: { type: () => [(__webpack_require__(7516).Datapoint)] } };
    }
};
StatisticsResult = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], StatisticsResult);
exports.StatisticsResult = StatisticsResult;
let Datapoint = class Datapoint {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, current: { type: () => String }, earning: { type: () => Number }, count: { type: () => Number }, distance: { type: () => Number }, time: { type: () => Number } };
    }
};
Datapoint = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], Datapoint);
exports.Datapoint = Datapoint;


/***/ }),

/***/ 5644:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayDTO = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(2082);
const query_graphql_1 = __webpack_require__(4097);
const graphql_1 = __webpack_require__(1161);
let PaymentGatewayDTO = class PaymentGatewayDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, type: { type: () => (__webpack_require__(2082).PaymentGatewayType) }, publicKey: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.IDField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], PaymentGatewayDTO.prototype, "id", void 0);
PaymentGatewayDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('PaymentGateway')
], PaymentGatewayDTO);
exports.PaymentGatewayDTO = PaymentGatewayDTO;


/***/ }),

/***/ 6835:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopUpWalletResponse = exports.TopUpWalletInput = exports.TopUpWalletStatus = void 0;
const tslib_1 = __webpack_require__(752);
const eager_import_0 = __webpack_require__(6835);
const graphql_1 = __webpack_require__(1161);
var TopUpWalletStatus;
(function (TopUpWalletStatus) {
    TopUpWalletStatus["OK"] = "ok";
    TopUpWalletStatus["Redirect"] = "redirect";
})(TopUpWalletStatus = exports.TopUpWalletStatus || (exports.TopUpWalletStatus = {}));
(0, graphql_1.registerEnumType)(TopUpWalletStatus, { name: 'TopUpWalletStatus' });
let TopUpWalletInput = class TopUpWalletInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { gatewayId: { type: () => Number }, amount: { type: () => Number }, currency: { type: () => String }, token: { nullable: true, type: () => String }, pin: { nullable: true, type: () => Number }, otp: { nullable: true, type: () => Number }, transactionId: { nullable: true, type: () => String } };
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], TopUpWalletInput.prototype, "gatewayId", void 0);
TopUpWalletInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], TopUpWalletInput);
exports.TopUpWalletInput = TopUpWalletInput;
let TopUpWalletResponse = class TopUpWalletResponse {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { type: () => (__webpack_require__(6835).TopUpWalletStatus) }, url: { type: () => String } };
    }
};
TopUpWalletResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], TopUpWalletResponse);
exports.TopUpWalletResponse = TopUpWalletResponse;


/***/ }),

/***/ 840:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EarningsService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const request_entity_1 = __webpack_require__(2814);
const typeorm_2 = __webpack_require__(5250);
const earnings_dto_1 = __webpack_require__(7516);
let EarningsService = class EarningsService {
    constructor(requestRepository) {
        this.requestRepository = requestRepository;
    }
    getStats(driverId, timeFrame) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const q = yield this.requestRepository.query('SELECT currency, COUNT(currency) as count from request where driverId = ? group by currency order by count desc LIMIT 1', [driverId]);
            if (q.length < 1) {
                return {
                    currency: 'USD',
                    dataset: []
                };
            }
            const mostUsedCurrency = q[0].currency;
            let dataset;
            const fields = 'SUM(costBest - providerShare) AS earning, COUNT(id) AS count, SUM(distanceBest) AS distance, SUM(durationBest) AS time';
            switch (timeFrame) {
                case earnings_dto_1.TimeQuery.Daily:
                    dataset = yield this.requestRepository.query(`SELECT CONCAT(ANY_VALUE(MONTH(requestTimestamp)),'/',ANY_VALUE(DAY(requestTimestamp))) as name, CONCAT(ANY_VALUE(MONTH(CURRENT_TIMESTAMP)),'/',ANY_VALUE(DAY(CURRENT_TIMESTAMP))) AS current, ${fields} from request WHERE DATEDIFF(NOW(),requestTimestamp) < 7 AND driverId = ? AND currency = ? GROUP BY DATE(requestTimestamp)`, [driverId, mostUsedCurrency]);
                    break;
                case earnings_dto_1.TimeQuery.Weekly:
                    dataset = yield this.requestRepository.query(`SELECT CONCAT(ANY_VALUE(YEAR(requestTimestamp)),',W',ANY_VALUE(WEEK(requestTimestamp))) AS name, CONCAT(ANY_VALUE(YEAR(CURRENT_TIMESTAMP)),',W',ANY_VALUE(WEEK(CURRENT_TIMESTAMP))) AS current, ${fields} FROM request WHERE driverId = ? AND currency = ? GROUP BY YEAR(requestTimestamp), WEEK(requestTimestamp)`, [driverId, mostUsedCurrency]);
                    break;
                case earnings_dto_1.TimeQuery.Monthly:
                    dataset = yield this.requestRepository.query(`SELECT CONCAT(ANY_VALUE(YEAR(requestTimestamp)),'/',ANY_VALUE(MONTH(requestTimestamp))) AS name, CONCAT(ANY_VALUE(YEAR(CURRENT_TIMESTAMP)),'/',ANY_VALUE(MONTH(CURRENT_TIMESTAMP))) AS current, ${fields} FROM request WHERE DATE(requestTimestamp) > DATE(MAKEDATE(year(now()),1)) AND driverId = ? AND currency = ? GROUP BY YEAR(requestTimestamp), MONTH(requestTimestamp)`, [driverId, mostUsedCurrency]);
                    break;
            }
            return {
                currency: mostUsedCurrency,
                dataset: dataset
            };
        });
    }
};
EarningsService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository])
], EarningsService);
exports.EarningsService = EarningsService;


/***/ }),

/***/ 1655:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletResolver = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const graphql_1 = __webpack_require__(1161);
const typeorm_1 = __webpack_require__(3399);
const payment_gateway_entity_1 = __webpack_require__(9078);
const typeorm_2 = __webpack_require__(5250);
const jwt_gql_auth_guard_1 = __webpack_require__(3058);
const earnings_dto_1 = __webpack_require__(7516);
const top_up_wallet_input_1 = __webpack_require__(6835);
const earnings_service_1 = __webpack_require__(840);
let WalletResolver = class WalletResolver {
    constructor(gatewayRepo, context, earningsService) {
        this.gatewayRepo = gatewayRepo;
        this.context = context;
        this.earningsService = earningsService;
    }
    topUpWallet(input) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const gateway = yield this.gatewayRepo.findOne(input.gatewayId);
            const params = `userType=driver&userId=${this.context.req.user.id}&paymentGatewayId=${gateway.id}&amount=${input.amount}&currency=${input.currency}&returnUrl=${process.env.DRIVER_SERVER_URL}/payment_result`;
            return {
                status: top_up_wallet_input_1.TopUpWalletStatus.Redirect,
                url: `${process.env.GATEWAY_SERVER_URL}/pay?${params}`
            };
        });
    }
    getStats(timeFrame) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.earningsService.getStats(this.context.req.user.id, timeFrame);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => top_up_wallet_input_1.TopUpWalletResponse),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => top_up_wallet_input_1.TopUpWalletInput })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [top_up_wallet_input_1.TopUpWalletInput]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WalletResolver.prototype, "topUpWallet", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => earnings_dto_1.StatisticsResult),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('timeframe', { type: () => earnings_dto_1.TimeQuery })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WalletResolver.prototype, "getStats", null);
WalletResolver = (0, tslib_1.__decorate)([
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Resolver)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(payment_gateway_entity_1.PaymentGatewayEntity)),
    (0, tslib_1.__param)(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository, Object, earnings_service_1.EarningsService])
], WalletResolver);
exports.WalletResolver = WalletResolver;


/***/ }),

/***/ 5654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletModule = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const query_typeorm_1 = __webpack_require__(6291);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const driver_transaction_entity_1 = __webpack_require__(4439);
const driver_wallet_entity_1 = __webpack_require__(8547);
const payment_gateway_entity_1 = __webpack_require__(9078);
const request_entity_1 = __webpack_require__(2814);
const jwt_gql_auth_guard_1 = __webpack_require__(3058);
const driver_transaction_dto_1 = __webpack_require__(7210);
const driver_wallet_dto_1 = __webpack_require__(8277);
const payment_gateway_dto_1 = __webpack_require__(5644);
const earnings_service_1 = __webpack_require__(840);
const wallet_resolver_1 = __webpack_require__(1655);
let WalletModule = class WalletModule {
};
WalletModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([request_entity_1.RequestEntity]),
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([driver_transaction_entity_1.DriverTransactionEntity, driver_wallet_entity_1.DriverWalletEntity, payment_gateway_entity_1.PaymentGatewayEntity])],
                resolvers: [
                    {
                        EntityClass: driver_transaction_entity_1.DriverTransactionEntity,
                        DTOClass: driver_transaction_dto_1.DriverTransactionDTO,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard]
                    },
                    {
                        EntityClass: driver_wallet_entity_1.DriverWalletEntity,
                        DTOClass: driver_wallet_dto_1.DriverWalletDTO,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE
                    },
                    {
                        EntityClass: payment_gateway_entity_1.PaymentGatewayEntity,
                        DTOClass: payment_gateway_dto_1.PaymentGatewayDTO,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: query_graphql_1.PagingStrategies.NONE
                    }
                ]
            })
        ],
        providers: [wallet_resolver_1.WalletResolver, earnings_service_1.EarningsService]
    })
], WalletModule);
exports.WalletModule = WalletModule;


/***/ }),

/***/ 1617:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(752);
(0, tslib_1.__exportStar)(__webpack_require__(670), exports);
(0, tslib_1.__exportStar)(__webpack_require__(4958), exports);
(0, tslib_1.__exportStar)(__webpack_require__(8592), exports);
(0, tslib_1.__exportStar)(__webpack_require__(2296), exports);
(0, tslib_1.__exportStar)(__webpack_require__(9537), exports);
(0, tslib_1.__exportStar)(__webpack_require__(6005), exports);


/***/ }),

/***/ 6005:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CryptoService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const crypto_1 = __webpack_require__(6113);
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

/***/ 670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.entities = exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const typeorm_2 = __webpack_require__(5250);
const car_color_entity_1 = __webpack_require__(4861);
const car_model_entity_1 = __webpack_require__(9061);
const complaint_activity_entity_1 = __webpack_require__(3051);
const complaint_entity_1 = __webpack_require__(1125);
const coupon_entity_1 = __webpack_require__(5892);
const driver_transaction_entity_1 = __webpack_require__(4439);
const driver_wallet_entity_1 = __webpack_require__(8547);
const driver_entity_1 = __webpack_require__(5956);
const feedback_parameter_entity_1 = __webpack_require__(5480);
const feedback_entity_1 = __webpack_require__(2241);
const fleet_transaction_entity_1 = __webpack_require__(8570);
const fleet_wallet_entity_1 = __webpack_require__(9310);
const fleet_entity_1 = __webpack_require__(5202);
const media_entity_1 = __webpack_require__(3465);
const operator_role_entity_1 = __webpack_require__(9314);
const operator_entity_1 = __webpack_require__(2089);
const request_message_entity_1 = __webpack_require__(6429);
const request_entity_1 = __webpack_require__(2814);
const payment_gateway_entity_1 = __webpack_require__(9078);
const provider_transaction_entity_1 = __webpack_require__(330);
const provider_wallet_entity_1 = __webpack_require__(8806);
const region_entity_1 = __webpack_require__(3457);
const rider_address_entity_1 = __webpack_require__(2003);
const rider_entity_1 = __webpack_require__(6525);
const rider_transaction_entity_1 = __webpack_require__(679);
const rider_wallet_entity_1 = __webpack_require__(9365);
const service_category_entity_1 = __webpack_require__(7005);
const service_entity_1 = __webpack_require__(950);
const payment_entity_1 = __webpack_require__(5437);
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

/***/ 8995:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const anouncement_user_type_enum_1 = __webpack_require__(3482);
const media_entity_1 = __webpack_require__(3465);
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

/***/ 4861:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const driver_entity_1 = __webpack_require__(5956);
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

/***/ 9061:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const driver_entity_1 = __webpack_require__(5956);
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

/***/ 3051:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const complaint_entity_1 = __webpack_require__(1125);
const complaint_activity_type_enum_1 = __webpack_require__(1078);
const operator_entity_1 = __webpack_require__(2089);
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

/***/ 1125:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const complaint_activity_entity_1 = __webpack_require__(3051);
const complaint_status_enum_1 = __webpack_require__(8105);
const request_entity_1 = __webpack_require__(2814);
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

/***/ 5892:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const request_entity_1 = __webpack_require__(2814);
const rider_entity_1 = __webpack_require__(6525);
const service_entity_1 = __webpack_require__(950);
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

/***/ 4439:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const driver_entity_1 = __webpack_require__(5956);
const driver_deduct_transaction_type_enum_1 = __webpack_require__(2721);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(7519);
const transaction_action_enum_1 = __webpack_require__(7454);
const transaction_status_enum_1 = __webpack_require__(1376);
const operator_entity_1 = __webpack_require__(2089);
const request_entity_1 = __webpack_require__(2814);
const payment_gateway_entity_1 = __webpack_require__(9078);
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

/***/ 8547:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverWalletEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const driver_entity_1 = __webpack_require__(5956);
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

/***/ 5956:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const car_color_entity_1 = __webpack_require__(4861);
const car_model_entity_1 = __webpack_require__(9061);
const driver_transaction_entity_1 = __webpack_require__(4439);
const driver_wallet_entity_1 = __webpack_require__(8547);
const driver_status_enum_1 = __webpack_require__(8142);
const gender_enum_1 = __webpack_require__(3900);
const feedback_entity_1 = __webpack_require__(2241);
const fleet_transaction_entity_1 = __webpack_require__(8570);
const fleet_entity_1 = __webpack_require__(5202);
const media_entity_1 = __webpack_require__(3465);
const request_entity_1 = __webpack_require__(2814);
const service_entity_1 = __webpack_require__(950);
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

/***/ 3482:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementUserType = void 0;
const graphql_1 = __webpack_require__(1161);
var AnnouncementUserType;
(function (AnnouncementUserType) {
    AnnouncementUserType["Driver"] = "Driver";
    AnnouncementUserType["Rider"] = "Rider";
    AnnouncementUserType["Operator"] = "Operator";
})(AnnouncementUserType = exports.AnnouncementUserType || (exports.AnnouncementUserType = {}));
(0, graphql_1.registerEnumType)(AnnouncementUserType, { name: 'AnnouncementUserType' });


/***/ }),

/***/ 1078:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityType = void 0;
const graphql_1 = __webpack_require__(1161);
var ComplaintActivityType;
(function (ComplaintActivityType) {
    ComplaintActivityType["AssignToOperator"] = "AssignedToOperator";
    ComplaintActivityType["Update"] = "Update";
    ComplaintActivityType["Resolved"] = "Resolved";
})(ComplaintActivityType = exports.ComplaintActivityType || (exports.ComplaintActivityType = {}));
(0, graphql_1.registerEnumType)(ComplaintActivityType, { name: 'ComplaintActivityType' });


/***/ }),

/***/ 8105:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintStatus = void 0;
const graphql_1 = __webpack_require__(1161);
var ComplaintStatus;
(function (ComplaintStatus) {
    ComplaintStatus["Submitted"] = "Submitted";
    ComplaintStatus["UnderInvestigation"] = "UnderInvestigation";
    ComplaintStatus["Resolved"] = "Resolved";
})(ComplaintStatus = exports.ComplaintStatus || (exports.ComplaintStatus = {}));
(0, graphql_1.registerEnumType)(ComplaintStatus, { name: 'ComplaintStatus' });


/***/ }),

/***/ 2721:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(1161);
var DriverDeductTransactionType;
(function (DriverDeductTransactionType) {
    DriverDeductTransactionType["Withdraw"] = "Withdraw";
    DriverDeductTransactionType["Commission"] = "Commission";
    DriverDeductTransactionType["Correction"] = "Correction";
})(DriverDeductTransactionType = exports.DriverDeductTransactionType || (exports.DriverDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(DriverDeductTransactionType, { name: 'DriverDeductTransactionType' });


/***/ }),

/***/ 7519:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(1161);
var DriverRechargeTransactionType;
(function (DriverRechargeTransactionType) {
    DriverRechargeTransactionType["OrderFee"] = "OrderFee";
    DriverRechargeTransactionType["BankTransfer"] = "BankTransfer";
    DriverRechargeTransactionType["InAppPayment"] = "InAppPayment";
    DriverRechargeTransactionType["Gift"] = "Gift";
})(DriverRechargeTransactionType = exports.DriverRechargeTransactionType || (exports.DriverRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(DriverRechargeTransactionType, { name: 'DriverRechargeTransactionType' });


/***/ }),

/***/ 8142:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverStatus = void 0;
const graphql_1 = __webpack_require__(1161);
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

/***/ 3900:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
const graphql_1 = __webpack_require__(1161);
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Unknown"] = "unknown";
})(Gender = exports.Gender || (exports.Gender = {}));
(0, graphql_1.registerEnumType)(Gender, { name: 'Gender' });


/***/ }),

/***/ 2856:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageStatus = void 0;
const graphql_1 = __webpack_require__(1161);
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["Sent"] = "sent";
    MessageStatus["Delivered"] = "delivered";
    MessageStatus["Seen"] = "seen";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
(0, graphql_1.registerEnumType)(MessageStatus, { name: 'MessageStatus' });


/***/ }),

/***/ 4549:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorPermission = void 0;
const graphql_1 = __webpack_require__(1161);
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

/***/ 1530:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderStatus = void 0;
const graphql_1 = __webpack_require__(1161);
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

/***/ 2082:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayType = void 0;
const graphql_1 = __webpack_require__(1161);
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

/***/ 7163:
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

/***/ 8486:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(1161);
var ProviderDeductTransactionType;
(function (ProviderDeductTransactionType) {
    ProviderDeductTransactionType["Withdraw"] = "Withdraw";
})(ProviderDeductTransactionType = exports.ProviderDeductTransactionType || (exports.ProviderDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(ProviderDeductTransactionType, { name: 'ProviderDeductTransactionType' });


/***/ }),

/***/ 8756:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(1161);
var ProviderRechargeTransactionType;
(function (ProviderRechargeTransactionType) {
    ProviderRechargeTransactionType["Commission"] = "Commission";
})(ProviderRechargeTransactionType = exports.ProviderRechargeTransactionType || (exports.ProviderRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(ProviderRechargeTransactionType, { name: 'ProviderRechargeTransactionType' });


/***/ }),

/***/ 44:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressType = void 0;
const graphql_1 = __webpack_require__(1161);
var RiderAddressType;
(function (RiderAddressType) {
    RiderAddressType["Home"] = "Home";
    RiderAddressType["Work"] = "Work";
    RiderAddressType["Partner"] = "Partner";
    RiderAddressType["Other"] = "Other";
})(RiderAddressType = exports.RiderAddressType || (exports.RiderAddressType = {}));
(0, graphql_1.registerEnumType)(RiderAddressType, { name: 'RiderAddressType' });


/***/ }),

/***/ 5652:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(1161);
var RiderDeductTransactionType;
(function (RiderDeductTransactionType) {
    RiderDeductTransactionType["OrderFee"] = "OrderFee";
    RiderDeductTransactionType["Withdraw"] = "Withdraw";
    RiderDeductTransactionType["Correction"] = "Correction";
})(RiderDeductTransactionType = exports.RiderDeductTransactionType || (exports.RiderDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(RiderDeductTransactionType, { name: 'RiderDeductTransactionType' });


/***/ }),

/***/ 6251:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDocumentType = void 0;
const graphql_1 = __webpack_require__(1161);
var RiderDocumentType;
(function (RiderDocumentType) {
    RiderDocumentType["ID"] = "ID";
    RiderDocumentType["Passport"] = "Passport";
    RiderDocumentType["DriverLicense"] = "DriverLicense";
    RiderDocumentType["ResidentPermitID"] = "ResidentPermitID";
})(RiderDocumentType = exports.RiderDocumentType || (exports.RiderDocumentType = {}));
(0, graphql_1.registerEnumType)(RiderDocumentType, { name: 'RiderDocumentType' });


/***/ }),

/***/ 1570:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(1161);
var RiderRechargeTransactionType;
(function (RiderRechargeTransactionType) {
    RiderRechargeTransactionType["BankTransfer"] = "BankTransfer";
    RiderRechargeTransactionType["Gift"] = "Gift";
    RiderRechargeTransactionType["Correction"] = "Correction";
    RiderRechargeTransactionType["InAppPayment"] = "InAppPayment";
})(RiderRechargeTransactionType = exports.RiderRechargeTransactionType || (exports.RiderRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(RiderRechargeTransactionType, { name: 'RiderRechargeTransactionType' });


/***/ }),

/***/ 535:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderStatus = void 0;
const graphql_1 = __webpack_require__(1161);
var RiderStatus;
(function (RiderStatus) {
    RiderStatus["Enabled"] = "enabled";
    RiderStatus["Disabled"] = "blocked";
})(RiderStatus = exports.RiderStatus || (exports.RiderStatus = {}));
(0, graphql_1.registerEnumType)(RiderStatus, { name: 'RiderStatus' });


/***/ }),

/***/ 3755:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDistanceFeeMode = void 0;
const graphql_1 = __webpack_require__(1161);
var ServiceDistanceFeeMode;
(function (ServiceDistanceFeeMode) {
    ServiceDistanceFeeMode["None"] = "None";
    ServiceDistanceFeeMode["PickupToDestination"] = "PickupToDestination";
    ServiceDistanceFeeMode["Radial"] = "Radial";
})(ServiceDistanceFeeMode = exports.ServiceDistanceFeeMode || (exports.ServiceDistanceFeeMode = {}));
(0, graphql_1.registerEnumType)(ServiceDistanceFeeMode, { name: 'ServiceDistanceFeeMode' });


/***/ }),

/***/ 7870:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicePaymentMethod = void 0;
const graphql_1 = __webpack_require__(1161);
var ServicePaymentMethod;
(function (ServicePaymentMethod) {
    ServicePaymentMethod["CashCredit"] = "CashCredit";
    ServicePaymentMethod["OnlyCredit"] = "OnlyCredit";
    ServicePaymentMethod["OnlyCash"] = "OnlyCash";
})(ServicePaymentMethod = exports.ServicePaymentMethod || (exports.ServicePaymentMethod = {}));
(0, graphql_1.registerEnumType)(ServicePaymentMethod, { name: 'ServicePaymentMethod' });


/***/ }),

/***/ 7454:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionAction = void 0;
const graphql_1 = __webpack_require__(1161);
var TransactionAction;
(function (TransactionAction) {
    TransactionAction["Recharge"] = "Recharge";
    TransactionAction["Deduct"] = "Deduct";
})(TransactionAction = exports.TransactionAction || (exports.TransactionAction = {}));
(0, graphql_1.registerEnumType)(TransactionAction, { name: 'TransactionAction' });


/***/ }),

/***/ 1376:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionStatus = void 0;
const graphql_1 = __webpack_require__(1161);
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Processing"] = "Processing";
    TransactionStatus["Done"] = "Done";
    TransactionStatus["Canceled"] = "Canceled";
    TransactionStatus["Rejected"] = "Rejected";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
(0, graphql_1.registerEnumType)(TransactionStatus, { name: 'TransactionStatus' });


/***/ }),

/***/ 5480:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const feedback_entity_1 = __webpack_require__(2241);
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

/***/ 2241:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const driver_entity_1 = __webpack_require__(5956);
const feedback_parameter_entity_1 = __webpack_require__(5480);
const request_entity_1 = __webpack_require__(2814);
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

/***/ 8570:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetTransactionEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const driver_entity_1 = __webpack_require__(5956);
const provider_deduct_transaction_type_enum_1 = __webpack_require__(8486);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(8756);
const transaction_action_enum_1 = __webpack_require__(7454);
const fleet_entity_1 = __webpack_require__(5202);
const operator_entity_1 = __webpack_require__(2089);
const request_entity_1 = __webpack_require__(2814);
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

/***/ 9310:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetWalletEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const fleet_entity_1 = __webpack_require__(5202);
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

/***/ 5202:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const driver_entity_1 = __webpack_require__(5956);
const fleet_transaction_entity_1 = __webpack_require__(8570);
const fleet_wallet_entity_1 = __webpack_require__(9310);
const operator_entity_1 = __webpack_require__(2089);
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

/***/ 3465:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const announcement_entity_1 = __webpack_require__(8995);
const driver_entity_1 = __webpack_require__(5956);
const operator_entity_1 = __webpack_require__(2089);
const rider_entity_1 = __webpack_require__(6525);
const service_entity_1 = __webpack_require__(950);
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

/***/ 9314:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorRoleEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const operator_permission_enum_1 = __webpack_require__(4549);
const operator_entity_1 = __webpack_require__(2089);
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

/***/ 2089:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const complaint_activity_entity_1 = __webpack_require__(3051);
const driver_transaction_entity_1 = __webpack_require__(4439);
const fleet_transaction_entity_1 = __webpack_require__(8570);
const fleet_entity_1 = __webpack_require__(5202);
const media_entity_1 = __webpack_require__(3465);
const operator_role_entity_1 = __webpack_require__(9314);
const provider_transaction_entity_1 = __webpack_require__(330);
const request_entity_1 = __webpack_require__(2814);
const rider_transaction_entity_1 = __webpack_require__(679);
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

/***/ 9078:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const request_entity_1 = __webpack_require__(2814);
const rider_transaction_entity_1 = __webpack_require__(679);
const payment_gateway_type_enum_1 = __webpack_require__(2082);
const provider_transaction_entity_1 = __webpack_require__(330);
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

/***/ 5437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const Entity_1 = __webpack_require__(2253);
const payment_status_enum_1 = __webpack_require__(7163);
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

/***/ 330:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderTransactionEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const provider_deduct_transaction_type_enum_1 = __webpack_require__(8486);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(8756);
const transaction_action_enum_1 = __webpack_require__(7454);
const operator_entity_1 = __webpack_require__(2089);
const payment_gateway_entity_1 = __webpack_require__(9078);
const request_entity_1 = __webpack_require__(2814);
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

/***/ 8806:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderWalletEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
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

/***/ 3457:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const polygon_transformer_1 = __webpack_require__(521);
const service_entity_1 = __webpack_require__(950);
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

/***/ 6429:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const message_status_enum_1 = __webpack_require__(2856);
const request_entity_1 = __webpack_require__(2814);
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

/***/ 2814:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const multipoint_transformer_1 = __webpack_require__(9907);
const complaint_entity_1 = __webpack_require__(1125);
const coupon_entity_1 = __webpack_require__(5892);
const driver_transaction_entity_1 = __webpack_require__(4439);
const driver_entity_1 = __webpack_require__(5956);
const order_status_enum_1 = __webpack_require__(1530);
const feedback_entity_1 = __webpack_require__(2241);
const fleet_transaction_entity_1 = __webpack_require__(8570);
const request_message_entity_1 = __webpack_require__(6429);
const payment_gateway_entity_1 = __webpack_require__(9078);
const provider_transaction_entity_1 = __webpack_require__(330);
const rider_entity_1 = __webpack_require__(6525);
const rider_transaction_entity_1 = __webpack_require__(679);
const service_entity_1 = __webpack_require__(950);
const operator_entity_1 = __webpack_require__(2089);
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

/***/ 2003:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const point_1 = __webpack_require__(4958);
const point_transformer_1 = __webpack_require__(2578);
const rider_address_type_enum_1 = __webpack_require__(44);
const rider_entity_1 = __webpack_require__(6525);
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

/***/ 6525:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const coupon_entity_1 = __webpack_require__(5892);
const gender_enum_1 = __webpack_require__(3900);
const rider_document_type_1 = __webpack_require__(6251);
const rider_status_enum_1 = __webpack_require__(535);
const media_entity_1 = __webpack_require__(3465);
const request_entity_1 = __webpack_require__(2814);
const rider_address_entity_1 = __webpack_require__(2003);
const rider_transaction_entity_1 = __webpack_require__(679);
const rider_wallet_entity_1 = __webpack_require__(9365);
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

/***/ 679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderTransactionEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const rider_deduct_transaction_type_enum_1 = __webpack_require__(5652);
const rider_recharge_transaction_type_enum_1 = __webpack_require__(1570);
const transaction_action_enum_1 = __webpack_require__(7454);
const transaction_status_enum_1 = __webpack_require__(1376);
const operator_entity_1 = __webpack_require__(2089);
const request_entity_1 = __webpack_require__(2814);
const payment_gateway_entity_1 = __webpack_require__(9078);
const rider_entity_1 = __webpack_require__(6525);
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

/***/ 9365:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderWalletEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const rider_entity_1 = __webpack_require__(6525);
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

/***/ 7005:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const service_entity_1 = __webpack_require__(950);
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

/***/ 950:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceEntity = void 0;
const tslib_1 = __webpack_require__(752);
const typeorm_1 = __webpack_require__(5250);
const distance_multiplier_transformer_1 = __webpack_require__(8435);
const time_multiplier_transformer_1 = __webpack_require__(2575);
const coupon_entity_1 = __webpack_require__(5892);
const driver_entity_1 = __webpack_require__(5956);
const service_distance_fee_mode_enum_1 = __webpack_require__(3755);
const service_payment_method_enum_1 = __webpack_require__(7870);
const media_entity_1 = __webpack_require__(3465);
const request_entity_1 = __webpack_require__(2814);
const region_entity_1 = __webpack_require__(3457);
const service_category_entity_1 = __webpack_require__(7005);
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

/***/ 8592:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DistanceMultiplier = void 0;
const tslib_1 = __webpack_require__(752);
const graphql_1 = __webpack_require__(1161);
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

/***/ 4958:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point = void 0;
const tslib_1 = __webpack_require__(752);
const graphql_1 = __webpack_require__(1161);
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

/***/ 2296:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeMultiplier = void 0;
const tslib_1 = __webpack_require__(752);
const graphql_1 = __webpack_require__(1161);
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

/***/ 8757:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverNotificationService = void 0;
const tslib_1 = __webpack_require__(752);
const nestjs_firebase_admin_1 = __webpack_require__(1312);
const common_1 = __webpack_require__(6481);
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

/***/ 3087:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var FirebaseNotificationModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FirebaseNotificationModule = void 0;
const tslib_1 = __webpack_require__(752);
const nestjs_firebase_admin_1 = __webpack_require__(1312);
const common_1 = __webpack_require__(6481);
const admin = __webpack_require__(2509);
const fs_1 = __webpack_require__(7147);
const driver_notification_service_1 = __webpack_require__(8757);
const rider_notification_service_1 = __webpack_require__(486);
let FirebaseNotificationModule = FirebaseNotificationModule_1 = class FirebaseNotificationModule {
    static register() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const modules = [];
            let providers = [];
            const configAddress = `${process.cwd()}/config/config.${"production"}.json`;
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

/***/ 486:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderNotificationService = void 0;
const tslib_1 = __webpack_require__(752);
const nestjs_firebase_admin_1 = __webpack_require__(1312);
const common_1 = __webpack_require__(6481);
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

/***/ 4868:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleServicesModule = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const shared_configuration_service_1 = __webpack_require__(9121);
const google_services_service_1 = __webpack_require__(9380);
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

/***/ 9380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleServicesService = void 0;
const tslib_1 = __webpack_require__(752);
const google_maps_services_js_1 = __webpack_require__(8147);
const common_1 = __webpack_require__(6481);
const apollo_server_fastify_1 = __webpack_require__(4518);
const shared_configuration_service_1 = __webpack_require__(9121);
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

/***/ 5804:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionModule = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const region_entity_1 = __webpack_require__(3457);
const region_service_1 = __webpack_require__(5767);
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

/***/ 5767:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const region_entity_1 = __webpack_require__(3457);
const typeorm_2 = __webpack_require__(5250);
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

/***/ 5856:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const service_entity_1 = __webpack_require__(950);
const typeorm_2 = __webpack_require__(5250);
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

/***/ 7301:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedDriverService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const typeorm_2 = __webpack_require__(5250);
const driver_transaction_entity_1 = __webpack_require__(4439);
const driver_wallet_entity_1 = __webpack_require__(8547);
const driver_entity_1 = __webpack_require__(5956);
const driver_status_enum_1 = __webpack_require__(8142);
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

/***/ 9097:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedFleetService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const fleet_transaction_entity_1 = __webpack_require__(8570);
const fleet_wallet_entity_1 = __webpack_require__(9310);
const typeorm_2 = __webpack_require__(5250);
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

/***/ 5697:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedOrderService = void 0;
const tslib_1 = __webpack_require__(752);
const query_graphql_1 = __webpack_require__(4097);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const apollo_server_fastify_1 = __webpack_require__(4518);
const graphql_redis_subscriptions_1 = __webpack_require__(9262);
const typeorm_2 = __webpack_require__(5250);
const order_status_enum_1 = __webpack_require__(1530);
const request_entity_1 = __webpack_require__(2814);
const service_category_entity_1 = __webpack_require__(7005);
const driver_redis_service_1 = __webpack_require__(8911);
const order_redis_service_1 = __webpack_require__(256);
const shared_driver_service_1 = __webpack_require__(7301);
const driver_notification_service_1 = __webpack_require__(8757);
const google_services_service_1 = __webpack_require__(9380);
const region_service_1 = __webpack_require__(5767);
const shared_rider_service_1 = __webpack_require__(9949);
const service_service_1 = __webpack_require__(5856);
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

/***/ 5792:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedProviderService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const provider_transaction_entity_1 = __webpack_require__(330);
const provider_wallet_entity_1 = __webpack_require__(8806);
const typeorm_2 = __webpack_require__(5250);
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

/***/ 9949:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedRiderService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const typeorm_1 = __webpack_require__(3399);
const rider_entity_1 = __webpack_require__(6525);
const rider_transaction_entity_1 = __webpack_require__(679);
const rider_wallet_entity_1 = __webpack_require__(9365);
const typeorm_2 = __webpack_require__(5250);
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

/***/ 9537:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisPubSubProvider = void 0;
const query_graphql_1 = __webpack_require__(4097);
const graphql_redis_subscriptions_1 = __webpack_require__(9262);
const Redis = __webpack_require__(1495);
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

/***/ 8911:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverRedisService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const nestjs_redis_1 = __webpack_require__(8312);
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

/***/ 256:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderRedisService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const nestjs_redis_1 = __webpack_require__(8312);
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

/***/ 6925:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisHelpersModule = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const driver_redis_service_1 = __webpack_require__(8911);
const order_redis_service_1 = __webpack_require__(256);
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

/***/ 9121:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedConfigurationService = void 0;
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const fs = __webpack_require__(7147);
let SharedConfigurationService = class SharedConfigurationService {
    constructor() { }
    getConfiguration() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const configAddress = `${process.cwd()}/config/config.${"production"}.json`;
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

/***/ 8435:
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

/***/ 9907:
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

/***/ 2578:
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

/***/ 521:
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

/***/ 2575:
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

/***/ 1312:
/***/ ((module) => {

module.exports = require("@aginix/nestjs-firebase-admin");

/***/ }),

/***/ 8147:
/***/ ((module) => {

module.exports = require("@googlemaps/google-maps-services-js");

/***/ }),

/***/ 8312:
/***/ ((module) => {

module.exports = require("@liaoliaots/nestjs-redis");

/***/ }),

/***/ 7123:
/***/ ((module) => {

module.exports = require("@nestjs-query/core");

/***/ }),

/***/ 4097:
/***/ ((module) => {

module.exports = require("@nestjs-query/query-graphql");

/***/ }),

/***/ 6291:
/***/ ((module) => {

module.exports = require("@nestjs-query/query-typeorm");

/***/ }),

/***/ 6481:
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ 5793:
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ 143:
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ 1161:
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ 2064:
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ 4340:
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ 1890:
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),

/***/ 1149:
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),

/***/ 3399:
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ 3342:
/***/ ((module) => {

module.exports = require("apollo-server-core");

/***/ }),

/***/ 4518:
/***/ ((module) => {

module.exports = require("apollo-server-fastify");

/***/ }),

/***/ 1442:
/***/ ((module) => {

module.exports = require("fastify");

/***/ }),

/***/ 3140:
/***/ ((module) => {

module.exports = require("fastify-multipart");

/***/ }),

/***/ 7087:
/***/ ((module) => {

module.exports = require("fastify-static");

/***/ }),

/***/ 2509:
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),

/***/ 9262:
/***/ ((module) => {

module.exports = require("graphql-redis-subscriptions");

/***/ }),

/***/ 1495:
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),

/***/ 5567:
/***/ ((module) => {

module.exports = require("jwt-decode");

/***/ }),

/***/ 136:
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 752:
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ 5250:
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ 2253:
/***/ ((module) => {

module.exports = require("typeorm/decorator/entity/Entity");

/***/ }),

/***/ 6464:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 2781:
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
const tslib_1 = __webpack_require__(752);
const common_1 = __webpack_require__(6481);
const core_1 = __webpack_require__(143);
const platform_fastify_1 = __webpack_require__(1890);
const fastify_static_1 = __webpack_require__(7087);
const fastify_multipart_1 = __webpack_require__(3140);
const path_1 = __webpack_require__(1423);
const driver_api_module_1 = __webpack_require__(6683);
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const adapter = new platform_fastify_1.FastifyAdapter();
        const app = yield core_1.NestFactory.create(driver_api_module_1.DriverAPIModule, adapter);
        const port = process.env.DRIVER_API_PORT || 3000;
        app.enableShutdownHooks();
        app.enableCors();
        app.register(fastify_multipart_1.default);
        app.register(fastify_static_1.default, {
            prefix: '/uploads/',
            root: (0, path_1.join)(process.cwd(), 'uploads'),
        });
        yield app.listen(port, '0.0.0.0', () => {
            common_1.Logger.log('Listening at http://localhost:' + port, 'Driver API');
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
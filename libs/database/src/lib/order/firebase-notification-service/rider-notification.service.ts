import { FirebaseMessagingService } from "@aginix/nestjs-firebase-admin";
import { Injectable } from "@nestjs/common";
import { OrderMessageEntity } from "@beninfy/database/request-message.entity";
import { RiderEntity } from "@beninfy/database/rider-entity";

@Injectable()
export class RiderNotificationService {
    constructor(
        private firebaseMessaging: FirebaseMessagingService
    ) { }
    
    message(rider: RiderEntity, message: OrderMessageEntity) {
        if(rider.notificationPlayerId == null) return;
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

    arrived(rider: RiderEntity) {
        if(rider.notificationPlayerId == null) return;
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

    started(rider: RiderEntity) {
        if(rider.notificationPlayerId == null) return;
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

    waitingForPostPay(rider: RiderEntity) {
        if(rider.notificationPlayerId == null) return;
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

    finished(rider: RiderEntity) {
        if(rider.notificationPlayerId == null) return;
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
}
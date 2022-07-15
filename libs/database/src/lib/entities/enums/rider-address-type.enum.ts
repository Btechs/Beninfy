import { registerEnumType } from "@nestjs/graphql";

export enum RiderAddressType {
    Home = 'Home',
    Work = 'Work',
    Partner = 'Partner',
    Other = 'Other'
}

registerEnumType(RiderAddressType, { name: 'RiderAddressType' });
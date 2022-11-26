import { CreateOrderItemDto } from "./create-orderitem.dto";

export class CreateOrderDto {
    readonly names: string;
    readonly orderNumber: number;
    readonly userId: number;
    readonly idCard: string;
    // readonly email: string;
    readonly homeDelivery: boolean;
    readonly address: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly reference: string;
    readonly payment: string;
    readonly receipt?: string;
    readonly type: string;
    readonly products: CreateOrderItemDto[];
}

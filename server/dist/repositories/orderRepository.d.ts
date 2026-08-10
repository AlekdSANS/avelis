import { Prisma } from "../generated/prisma/client.js";
import type { PaymentMethod, ProductFormat, ShippingMethod } from "../generated/prisma/enums.js";
import type { OrderListQuery } from "../schemas/orderSchemas.js";
import { type OrderDetailRecord } from "../utils/orderMapper.js";
export type MergedOrderItem = {
    variantId: string;
    quantity: number;
};
export type CreateOrderPersistenceInput = {
    userId: string | null;
    idempotencyScope: string | null;
    idempotencyKey: string | null;
    customer: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
    };
    shippingAddress: {
        country: string;
        city: string;
        postalCode: string;
        street: string;
        building: string;
        apartment: string | null;
        deliveryNotes: string | null;
    };
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod;
    items: MergedOrderItem[];
};
export type CreateOrderPersistenceResult = {
    order: OrderDetailRecord;
    replayed: boolean;
};
export declare function createOrderAtomically(input: CreateOrderPersistenceInput): Promise<CreateOrderPersistenceResult>;
export declare function findCustomerOrderPage(userId: string, query: OrderListQuery): Promise<[number, {
    _count: {
        items: number;
    };
    createdAt: Date;
    currency: string;
    id: string;
    items: {
        id: string;
        imageUrl: string | null;
        productName: string;
        quantity: number;
    }[];
    orderNumber: string;
    paymentStatus: import("../generated/prisma/enums.js").PaymentStatus;
    status: import("../generated/prisma/enums.js").OrderStatus;
    total: import("@prisma/client-runtime-utils").Decimal;
}[]]>;
export declare function findCustomerOrderByNumber(userId: string, orderNumber: string): Prisma.Prisma__OrderClient<{
    cancelledAt: Date | null;
    confirmedAt: Date | null;
    createdAt: Date;
    currency: string;
    customerEmail: string;
    customerFirstName: string;
    customerLastName: string;
    customerPhone: string;
    deliveryNotes: string | null;
    discountTotal: import("@prisma/client-runtime-utils").Decimal;
    id: string;
    items: {
        format: ProductFormat;
        id: string;
        imageUrl: string | null;
        lineTotal: import("@prisma/client-runtime-utils").Decimal;
        productId: string | null;
        productName: string;
        productSlug: string;
        quantity: number;
        sku: string;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        variantId: string | null;
        volumeMl: number;
    }[];
    orderNumber: string;
    paymentMethod: PaymentMethod;
    paymentStatus: import("../generated/prisma/enums.js").PaymentStatus;
    shippingApartment: string | null;
    shippingBuilding: string;
    shippingCity: string;
    shippingCountry: string;
    shippingMethod: ShippingMethod;
    shippingPostalCode: string;
    shippingStreet: string;
    shippingTotal: import("@prisma/client-runtime-utils").Decimal;
    status: import("../generated/prisma/enums.js").OrderStatus;
    subtotal: import("@prisma/client-runtime-utils").Decimal;
    total: import("@prisma/client-runtime-utils").Decimal;
    updatedAt: Date;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
//# sourceMappingURL=orderRepository.d.ts.map
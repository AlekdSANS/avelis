import type { Prisma } from "../generated/prisma/client.js";
export declare const orderDetailSelect: {
    id: true;
    orderNumber: true;
    status: true;
    paymentStatus: true;
    paymentMethod: true;
    shippingMethod: true;
    customerEmail: true;
    customerFirstName: true;
    customerLastName: true;
    customerPhone: true;
    shippingCountry: true;
    shippingCity: true;
    shippingPostalCode: true;
    shippingStreet: true;
    shippingBuilding: true;
    shippingApartment: true;
    deliveryNotes: true;
    subtotal: true;
    shippingTotal: true;
    discountTotal: true;
    total: true;
    currency: true;
    confirmedAt: true;
    cancelledAt: true;
    createdAt: true;
    updatedAt: true;
    items: {
        select: {
            id: true;
            productId: true;
            variantId: true;
            productName: true;
            productSlug: true;
            sku: true;
            format: true;
            volumeMl: true;
            unitPrice: true;
            quantity: true;
            lineTotal: true;
            imageUrl: true;
        };
        orderBy: {
            id: "asc";
        }[];
    };
};
export declare const orderSummarySelect: {
    id: true;
    orderNumber: true;
    status: true;
    paymentStatus: true;
    total: true;
    currency: true;
    createdAt: true;
    _count: {
        select: {
            items: true;
        };
    };
    items: {
        select: {
            imageUrl: true;
        };
        orderBy: {
            id: "asc";
        }[];
        take: number;
    };
};
export type OrderDetailRecord = Prisma.OrderGetPayload<{
    select: typeof orderDetailSelect;
}>;
export type OrderSummaryRecord = Prisma.OrderGetPayload<{
    select: typeof orderSummarySelect;
}>;
export declare function mapOrderDetail(order: OrderDetailRecord): {
    id: string;
    orderNumber: string;
    status: import("../generated/prisma/enums.js").OrderStatus;
    paymentStatus: import("../generated/prisma/enums.js").PaymentStatus;
    paymentMethod: import("../generated/prisma/enums.js").PaymentMethod;
    shippingMethod: import("../generated/prisma/enums.js").ShippingMethod;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
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
    items: {
        id: string;
        productId: string | null;
        variantId: string | null;
        productName: string;
        productSlug: string;
        sku: string;
        format: import("../generated/prisma/enums.js").ProductFormat;
        volumeMl: number;
        unitPrice: number;
        quantity: number;
        lineTotal: number;
        imageUrl: string | null;
    }[];
    subtotal: number;
    shippingTotal: number;
    discountTotal: number;
    total: number;
    currency: string;
    confirmedAt: string | null;
    cancelledAt: string | null;
    createdAt: string;
    updatedAt: string;
};
export declare function mapOrderSummary(order: OrderSummaryRecord): {
    id: string;
    orderNumber: string;
    status: import("../generated/prisma/enums.js").OrderStatus;
    paymentStatus: import("../generated/prisma/enums.js").PaymentStatus;
    itemCount: number;
    total: number;
    currency: string;
    firstItemImageUrl: string | null;
    createdAt: string;
};
//# sourceMappingURL=orderMapper.d.ts.map
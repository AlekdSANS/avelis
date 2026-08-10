import type { Prisma } from "../generated/prisma/client.js";
export declare const adminOrderSummarySelect: {
    orderNumber: true;
    customerFirstName: true;
    customerLastName: true;
    customerEmail: true;
    status: true;
    paymentStatus: true;
    paymentMethod: true;
    shippingMethod: true;
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
export declare const adminOrderDetailSelect: {
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
    user: {
        select: {
            firstName: true;
            lastName: true;
            email: true;
        };
    };
    items: {
        select: {
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
export type AdminOrderSummaryRecord = Prisma.OrderGetPayload<{
    select: typeof adminOrderSummarySelect;
}>;
export type AdminOrderDetailRecord = Prisma.OrderGetPayload<{
    select: typeof adminOrderDetailSelect;
}>;
export declare function mapAdminOrderSummary(order: AdminOrderSummaryRecord): {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    status: import("../generated/prisma/enums.js").OrderStatus;
    paymentStatus: import("../generated/prisma/enums.js").PaymentStatus;
    paymentMethod: import("../generated/prisma/enums.js").PaymentMethod;
    shippingMethod: import("../generated/prisma/enums.js").ShippingMethod;
    itemCount: number;
    total: number;
    currency: string;
    firstItemImageUrl: string | null;
    createdAt: string;
};
export declare function mapAdminOrderDetail(order: AdminOrderDetailRecord): {
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
    linkedAccount: {
        firstName: string;
        lastName: string;
        email: string;
    } | null;
    shippingAddress: {
        country: string;
        city: string;
        postalCode: string;
        street: string;
        building: string;
        apartment: string | null;
    };
    deliveryNotes: string | null;
    items: {
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
    allowedTransitions: {
        orderStatus: import("../generated/prisma/enums.js").OrderStatus[];
        paymentStatus: import("../generated/prisma/enums.js").PaymentStatus[];
    };
};
//# sourceMappingURL=adminOrderMapper.d.ts.map
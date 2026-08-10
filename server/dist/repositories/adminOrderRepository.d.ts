import { Prisma } from "../generated/prisma/client.js";
import type { AdminOrderListQuery } from "../schemas/adminOrderSchemas.js";
import type { OrderStatus, PaymentStatus } from "../generated/prisma/enums.js";
export declare function findAdminOrderPage(query: AdminOrderListQuery): Promise<[number, {
    _count: {
        items: number;
    };
    createdAt: Date;
    currency: string;
    customerEmail: string;
    customerFirstName: string;
    customerLastName: string;
    items: {
        imageUrl: string | null;
    }[];
    orderNumber: string;
    paymentMethod: import("../generated/prisma/enums.js").PaymentMethod;
    paymentStatus: PaymentStatus;
    shippingMethod: import("../generated/prisma/enums.js").ShippingMethod;
    status: OrderStatus;
    total: import("@prisma/client-runtime-utils").Decimal;
}[]]>;
export declare function findAdminOrderByNumber(orderNumber: string): Prisma.Prisma__OrderClient<{
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
    items: {
        format: import("../generated/prisma/enums.js").ProductFormat;
        imageUrl: string | null;
        lineTotal: import("@prisma/client-runtime-utils").Decimal;
        productName: string;
        productSlug: string;
        quantity: number;
        sku: string;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        volumeMl: number;
    }[];
    orderNumber: string;
    paymentMethod: import("../generated/prisma/enums.js").PaymentMethod;
    paymentStatus: PaymentStatus;
    shippingApartment: string | null;
    shippingBuilding: string;
    shippingCity: string;
    shippingCountry: string;
    shippingMethod: import("../generated/prisma/enums.js").ShippingMethod;
    shippingPostalCode: string;
    shippingStreet: string;
    shippingTotal: import("@prisma/client-runtime-utils").Decimal;
    status: OrderStatus;
    subtotal: import("@prisma/client-runtime-utils").Decimal;
    total: import("@prisma/client-runtime-utils").Decimal;
    updatedAt: Date;
    user: {
        email: string;
        firstName: string;
        lastName: string;
    } | null;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
declare const transitionStateSelect: {
    id: true;
    status: true;
    paymentStatus: true;
    paymentMethod: true;
    confirmedAt: true;
    cancelledAt: true;
};
export type AdminOrderTransitionState = Prisma.OrderGetPayload<{
    select: typeof transitionStateSelect;
}>;
export declare function updateAdminOrderStatusAtomically(orderNumber: string, nextStatus: OrderStatus, validate: (order: AdminOrderTransitionState) => void): Promise<{
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
    items: {
        format: import("../generated/prisma/enums.js").ProductFormat;
        imageUrl: string | null;
        lineTotal: import("@prisma/client-runtime-utils").Decimal;
        productName: string;
        productSlug: string;
        quantity: number;
        sku: string;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        volumeMl: number;
    }[];
    orderNumber: string;
    paymentMethod: import("../generated/prisma/enums.js").PaymentMethod;
    paymentStatus: PaymentStatus;
    shippingApartment: string | null;
    shippingBuilding: string;
    shippingCity: string;
    shippingCountry: string;
    shippingMethod: import("../generated/prisma/enums.js").ShippingMethod;
    shippingPostalCode: string;
    shippingStreet: string;
    shippingTotal: import("@prisma/client-runtime-utils").Decimal;
    status: OrderStatus;
    subtotal: import("@prisma/client-runtime-utils").Decimal;
    total: import("@prisma/client-runtime-utils").Decimal;
    updatedAt: Date;
    user: {
        email: string;
        firstName: string;
        lastName: string;
    } | null;
}>;
export declare function updateAdminPaymentStatusAtomically(orderNumber: string, nextStatus: PaymentStatus, validate: (order: AdminOrderTransitionState) => void): Promise<{
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
    items: {
        format: import("../generated/prisma/enums.js").ProductFormat;
        imageUrl: string | null;
        lineTotal: import("@prisma/client-runtime-utils").Decimal;
        productName: string;
        productSlug: string;
        quantity: number;
        sku: string;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        volumeMl: number;
    }[];
    orderNumber: string;
    paymentMethod: import("../generated/prisma/enums.js").PaymentMethod;
    paymentStatus: PaymentStatus;
    shippingApartment: string | null;
    shippingBuilding: string;
    shippingCity: string;
    shippingCountry: string;
    shippingMethod: import("../generated/prisma/enums.js").ShippingMethod;
    shippingPostalCode: string;
    shippingStreet: string;
    shippingTotal: import("@prisma/client-runtime-utils").Decimal;
    status: OrderStatus;
    subtotal: import("@prisma/client-runtime-utils").Decimal;
    total: import("@prisma/client-runtime-utils").Decimal;
    updatedAt: Date;
    user: {
        email: string;
        firstName: string;
        lastName: string;
    } | null;
}>;
export {};
//# sourceMappingURL=adminOrderRepository.d.ts.map
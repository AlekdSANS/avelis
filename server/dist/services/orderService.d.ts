import { type MergedOrderItem } from "../repositories/orderRepository.js";
import type { CreateOrderInput, OrderListQuery } from "../schemas/orderSchemas.js";
export declare function mergeOrderItems(items: CreateOrderInput["items"]): MergedOrderItem[];
export declare function getIdempotencyScope(userId: string | null, email: string, phone: string): string;
export declare function createOrder(input: CreateOrderInput, userId: string | null): Promise<{
    data: {
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
        promotionCode: string | null;
        total: number;
        currency: string;
        confirmedAt: string | null;
        cancelledAt: string | null;
        createdAt: string;
        updatedAt: string;
    };
    replayed: boolean;
}>;
export declare function listCustomerOrders(userId: string, query: OrderListQuery): Promise<{
    data: {
        id: string;
        orderNumber: string;
        status: import("../generated/prisma/enums.js").OrderStatus;
        paymentStatus: import("../generated/prisma/enums.js").PaymentStatus;
        itemCount: number;
        total: number;
        currency: string;
        firstItemImageUrl: string | null;
        itemPreviews: {
            id: string;
            productName: string;
            imageUrl: string | null;
            quantity: number;
        }[];
        createdAt: string;
    }[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}>;
export declare function getCustomerOrder(userId: string, orderNumber: string): Promise<{
    data: {
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
        promotionCode: string | null;
        total: number;
        currency: string;
        confirmedAt: string | null;
        cancelledAt: string | null;
        createdAt: string;
        updatedAt: string;
    };
}>;
//# sourceMappingURL=orderService.d.ts.map
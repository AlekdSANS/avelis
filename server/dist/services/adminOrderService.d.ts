import type { AdminOrderListQuery, AdminOrderStatusUpdateInput, AdminPaymentStatusUpdateInput } from "../schemas/adminOrderSchemas.js";
export declare function listAdminOrders(query: AdminOrderListQuery): Promise<{
    data: {
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
    }[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}>;
export declare function getAdminOrder(orderNumber: string): Promise<{
    data: {
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
}>;
export declare function setAdminOrderStatus(orderNumber: string, input: AdminOrderStatusUpdateInput): Promise<{
    data: {
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
    message: string;
}>;
export declare function setAdminPaymentStatus(orderNumber: string, input: AdminPaymentStatusUpdateInput): Promise<{
    data: {
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
    message: string;
}>;
//# sourceMappingURL=adminOrderService.d.ts.map
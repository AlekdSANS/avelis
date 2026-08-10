import type { ReviewCreateInput, ReviewModerationInput } from "../schemas/growthSchemas.js";
export declare function listProductReviews(slug: string): Promise<{
    data: {
        id: any;
        rating: any;
        title: any;
        content: any;
        status: any;
        verifiedPurchase: any;
        reviewerName: string;
        product: any;
        createdAt: any;
        updatedAt: any;
    }[];
}>;
export declare function submitProductReview(slug: string, userId: string, input: ReviewCreateInput): Promise<{
    data: {
        id: any;
        rating: any;
        title: any;
        content: any;
        status: any;
        verifiedPurchase: any;
        reviewerName: string;
        product: any;
        createdAt: any;
        updatedAt: any;
    };
    message: string;
}>;
export declare function listAdminReviews(): Promise<{
    data: {
        id: any;
        rating: any;
        title: any;
        content: any;
        status: any;
        verifiedPurchase: any;
        reviewerName: string;
        product: any;
        createdAt: any;
        updatedAt: any;
    }[];
}>;
export declare function moderateReview(id: string, input: ReviewModerationInput): Promise<{
    data: {
        id: any;
        rating: any;
        title: any;
        content: any;
        status: any;
        verifiedPurchase: any;
        reviewerName: string;
        product: any;
        createdAt: any;
        updatedAt: any;
    };
}>;
//# sourceMappingURL=reviewService.d.ts.map
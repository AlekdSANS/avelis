export type OperationCategory = "admin" | "checkout" | "payment" | "request";
type FailureRecord = {
    category: OperationCategory;
    method: string;
    path: string;
    requestId: string;
    statusCode: number;
    timestamp: string;
};
export declare function classifyOperation(path: string): OperationCategory;
export declare function recordRequest(): void;
export declare function recordFailure(record: FailureRecord): void;
export declare function getMetricsSnapshot(): {
    requests: number;
    responses4xx: number;
    responses5xx: number;
    adminFailures: number;
    checkoutFailures: number;
    paymentFailures: number;
    lastFailureAt: string | null;
};
export declare function getDiagnosticsSnapshot(): {
    counters: {
        requests: number;
        responses4xx: number;
        responses5xx: number;
        adminFailures: number;
        checkoutFailures: number;
        paymentFailures: number;
        lastFailureAt: string | null;
    };
    recentFailures: FailureRecord[];
};
export {};
//# sourceMappingURL=metrics.d.ts.map
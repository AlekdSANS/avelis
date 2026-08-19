import type { OperationCategory } from "./metrics.js";
type IncidentPayload = {
    category: OperationCategory;
    event: "exception" | "operation_failure";
    message: string;
    method: string;
    path: string;
    requestId: string;
    statusCode: number;
    timestamp: string;
};
export declare function reportIncident(payload: IncidentPayload): void;
export {};
//# sourceMappingURL=reporter.d.ts.map
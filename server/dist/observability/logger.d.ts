export type LogLevel = "debug" | "info" | "warn" | "error";
export type LogFields = Record<string, unknown>;
export declare function log(level: LogLevel, event: string, fields?: LogFields): void;
export declare function logError(event: string, error: unknown, fields?: LogFields): void;
//# sourceMappingURL=logger.d.ts.map
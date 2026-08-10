import "dotenv/config";
export declare const env: Readonly<{
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    SESSION_COOKIE_NAME?: string | undefined;
    SESSION_TTL_DAYS: number;
    S3_ENDPOINT?: string | undefined;
    S3_REGION?: string | undefined;
    S3_BUCKET?: string | undefined;
    S3_ACCESS_KEY_ID?: string | undefined;
    S3_SECRET_ACCESS_KEY?: string | undefined;
    S3_PUBLIC_BASE_URL?: string | undefined;
    S3_FORCE_PATH_STYLE: boolean;
    CLIENT_ORIGIN: string;
    IMAGE_STORAGE_PROVIDER: "local" | "s3";
}>;
export type ServerEnvironment = typeof env;
//# sourceMappingURL=env.d.ts.map
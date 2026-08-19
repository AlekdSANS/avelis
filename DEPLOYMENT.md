# AVELIS staging deployment

The repository includes a Render Blueprint for a free-tier practice staging environment and Vercel/Netlify-compatible SPA rewrites for the client.

## 1. Create durable object storage

Create a Cloudflare R2 bucket (or another S3-compatible bucket), generate a bucket-scoped read/write token, and expose the bucket through a public custom domain. Configure the API with:

- `IMAGE_STORAGE_PROVIDER=s3`
- `S3_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
- `S3_REGION=auto`
- `S3_BUCKET=<bucket name>`
- `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY`
- `S3_PUBLIC_BASE_URL=https://assets.example.com`

Never commit access credentials. Uploaded objects use opaque UUID keys under `products/`, are validated by file signature before upload, and receive immutable cache headers.

## 2. Configure the API

Set every variable from `server/.env.example`. Production startup and build validation deliberately fail when the database, client origin, or object-storage configuration is missing. Set the platform health check to `/api/health/ready`; `/api/health/live` is the process liveness endpoint.

## 3. Configure the storefront

Set every required value from `client/.env.example`. A production build fails if the API URL, site URL, demonstration status, operator identity, postal address, legal email, or support email is missing. Set `VITE_IS_DEMO_STORE=false` only after real payment, fulfilment, operator and legal details have been approved.

The client contains SPA fallbacks for Render (`render.yaml`), Vercel (`client/vercel.json`) and Netlify-compatible static hosts (`client/public/_redirects`). Test a nested URL such as `/delivery-returns` directly after each deployment.

## 4. Release check

1. Run `npm ci` and `npm run build` in both `client` and `server`.
2. Deploy the API and confirm `/api/health/live` and `/api/health/ready` return HTTP 200.
3. Upload an image in the admin area, redeploy the API, and confirm the image URL still resolves from object storage.
4. Open each footer and checkout policy link from a direct URL.
5. Keep analytics disabled until consent behavior and the deployed cookie inventory have been reviewed.

## 5. SEO discovery and monitoring

The storefront build creates `/robots.txt` and `/sitemap.xml`. The sitemap index points to the API's database-backed `/api/seo/sitemap.xml`, so published products, collections and journal articles appear without editing a static list.

Every API response includes `X-Request-ID`. Logs are emitted as one JSON object per line and failed checkout, payment and admin requests are counted at `/api/health/metrics`. Set `OBSERVABILITY_TOKEN` to protect detailed records at `/api/health/diagnostics`, then send it as `Authorization: Bearer <token>`. Set `OBSERVABILITY_WEBHOOK_URL` to deliver unexpected exceptions and alert-worthy operation failures to an external collector.

The included GitHub Actions uptime check calls `/api/health/ready` every ten minutes. Add a repository variable named `AVELIS_API_URL` containing the deployed API origin, for example `https://avelis-api.onrender.com`. GitHub will notify repository watchers when the workflow fails; a free UptimeRobot or Better Stack monitor can use the same readiness URL if faster or multi-channel alerts are wanted.

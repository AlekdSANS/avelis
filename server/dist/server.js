import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";
import { log } from "./observability/logger.js";
if (process.env.VERCEL === undefined) {
    app.listen(env.PORT, () => {
        log("info", "server.started", { port: env.PORT, environment: env.NODE_ENV });
    });
}
export default app;
//# sourceMappingURL=server.js.map
import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";

if (process.env.VERCEL === undefined) {
	app.listen(env.PORT, () => {
		console.log(`Server running on http://localhost:${env.PORT}`);
	});
}

export default app;

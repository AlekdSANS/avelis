import "dotenv/config";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 4000;

if (process.env.VERCEL === undefined) {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

export default app;

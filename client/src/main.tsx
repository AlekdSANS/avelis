import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";

import { AppProviders } from "./app/providers";
import { initializeGoogleTagManager } from "./services/analytics";

initializeGoogleTagManager();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProviders />
	</StrictMode>,
);

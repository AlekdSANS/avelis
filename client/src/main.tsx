import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";

import { AppProviders } from "./app/providers";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProviders />
	</StrictMode>,
);

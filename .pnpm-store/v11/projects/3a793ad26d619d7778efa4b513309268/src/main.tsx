import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";

import { AppProviders } from "./app/providers";
import {
  hydrateCookiePreferences,
  initializeGoogleConsentMode,
  initializeGoogleTagManager,
} from "./services/analytics";

initializeGoogleConsentMode();
hydrateCookiePreferences();
initializeGoogleTagManager();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProviders />
	</StrictMode>,
);

import { useMemo } from "react";

import { homepageThemes } from "../data/homepageThemes";
import type { HomepageTheme } from "../types";

const STORAGE_KEY = "avelis-featured-theme";

export function useFeaturedTheme(): HomepageTheme {
	return useMemo(() => {
		const storedThemeId = sessionStorage.getItem(STORAGE_KEY);

		const storedTheme = homepageThemes.find(
			(theme) => theme.id === storedThemeId,
		);

		if (storedTheme) {
			return storedTheme;
		}

		const randomIndex = Math.floor(Math.random() * homepageThemes.length);
		const selectedTheme = homepageThemes[randomIndex];

		sessionStorage.setItem(STORAGE_KEY, selectedTheme.id);

		return selectedTheme;
	}, []);
}

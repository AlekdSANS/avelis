import { useState } from "react";

import { homepageThemes } from "../data/homepageThemes";
import type { HomepageTheme } from "../types";

const STORAGE_KEY = "avelis-featured-theme";

function selectSessionTheme(): HomepageTheme {
	if (typeof window === "undefined") {
		return homepageThemes[0];
	}

	try {
		const storedThemeId = window.sessionStorage.getItem(STORAGE_KEY);
		const storedTheme = homepageThemes.find(
			(theme) => theme.id === storedThemeId,
		);

		if (storedTheme) {
			return storedTheme;
		}

		const randomIndex = Math.floor(Math.random() * homepageThemes.length);
		const selectedTheme = homepageThemes[randomIndex] ?? homepageThemes[0];
		window.sessionStorage.setItem(STORAGE_KEY, selectedTheme.id);

		return selectedTheme;
	} catch {
		return homepageThemes[0];
	}
}

export function useFeaturedTheme(): HomepageTheme {
	const [theme] = useState<HomepageTheme>(selectSessionTheme);

	return theme;
}

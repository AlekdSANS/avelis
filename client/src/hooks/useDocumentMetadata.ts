import { useEffect } from "react";

type DocumentMetadata = {
	canonicalPath: string;
	description: string;
	title: string;
};

export function useDocumentMetadata({
	canonicalPath,
	description,
	title,
}: DocumentMetadata) {
	useEffect(() => {
		const previousTitle = document.title;
		const existingDescription = document.querySelector<HTMLMetaElement>(
			'meta[name="description"]',
		);
		const existingCanonical = document.querySelector<HTMLLinkElement>(
			'link[rel="canonical"]',
		);
		const previousDescription = existingDescription?.content;
		const previousCanonical = existingCanonical?.href;
		const descriptionElement =
			existingDescription ?? document.createElement("meta");
		const canonicalElement =
			existingCanonical ?? document.createElement("link");

		if (!existingDescription) {
			descriptionElement.name = "description";
			document.head.append(descriptionElement);
		}
		if (!existingCanonical) {
			canonicalElement.rel = "canonical";
			document.head.append(canonicalElement);
		}

		document.title = title;
		descriptionElement.content = description;
		canonicalElement.href = new URL(canonicalPath, window.location.origin).href;

		return () => {
			document.title = previousTitle;
			if (existingDescription) {
				existingDescription.content = previousDescription ?? "";
			} else {
				descriptionElement.remove();
			}
			if (existingCanonical) {
				existingCanonical.href = previousCanonical ?? "";
			} else {
				canonicalElement.remove();
			}
		};
	}, [canonicalPath, description, title]);
}

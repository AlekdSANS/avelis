import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

import { usePresence } from "../../../hooks/usePresence";
import { IconButton } from "../IconButton/IconButton";
import styles from "./Modal.module.scss";

type ModalProps = {
	children: ReactNode;
	className?: string;
	description?: string;
	footer?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title: string;
};

const focusableSelector =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
	children,
	className,
	description,
	footer,
	isOpen,
	onClose,
	title,
}: ModalProps) {
	const titleId = useId();
	const descriptionId = useId();
	const panelRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const onCloseRef = useRef(onClose);
	const { isClosing, isMounted } = usePresence(isOpen, 180);

	useEffect(() => {
		onCloseRef.current = onClose;
	}, [onClose]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const previousActiveElement = document.activeElement as HTMLElement | null;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		closeRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onCloseRef.current();
				return;
			}

			if (event.key !== "Tab" || panelRef.current === null) {
				return;
			}

			const focusable = [
				...panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
			];
			const first = focusable[0];
			const last = focusable.at(-1);

			if (first === undefined || last === undefined) {
				event.preventDefault();
				return;
			}

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
			previousActiveElement?.focus();
		};
	}, [isOpen]);

	if (!isMounted) {
		return null;
	}

	return (
		<section
			aria-describedby={description === undefined ? undefined : descriptionId}
			aria-labelledby={titleId}
			aria-modal="true"
			className={[
				styles.layer,
				isClosing ? styles.closing : "",
			]
				.filter(Boolean)
				.join(" ")}
			role="dialog"
		>
			<button
				aria-label="Close dialog"
				className={styles.backdrop}
				onClick={onClose}
				type="button"
			/>
			<div
				className={[styles.modal, className ?? ""].filter(Boolean).join(" ")}
				ref={panelRef}
			>
				<header className={styles.header}>
					<div>
						<h2 id={titleId}>{title}</h2>
						{description === undefined ? null : (
							<p id={descriptionId}>{description}</p>
						)}
					</div>
					<IconButton
						aria-label="Close dialog"
						onClick={onClose}
						ref={closeRef}
					>
						<X aria-hidden="true" />
					</IconButton>
				</header>
				<div className={styles.content}>{children}</div>
				{footer === undefined ? null : (
					<footer className={styles.footer}>{footer}</footer>
				)}
			</div>
		</section>
	);
}

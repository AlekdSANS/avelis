import { ArrowLeft, FilePenLine, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import styles from "./AdminProductFormPlaceholderPage.module.scss";

export function AdminProductFormPlaceholderPage() {
	const { id } = useParams();
	const isEdit = id !== undefined;
	const Icon = isEdit ? FilePenLine : Plus;

	return (
		<section className={styles.page}>
			<div className={styles.icon}>
				<Icon aria-hidden="true" />
			</div>
			<p className={styles.eyebrow}>Admin Part 2B</p>
			<h2>{isEdit ? "Product editing" : "Product creation"} comes next.</h2>
			<p>
				The secure API contract is ready, but the complete product form,
				variant editor, image metadata editor, notes, and collection controls
				will be built in Part 2B.
			</p>
			<Link to="/admin/products">
				<ArrowLeft aria-hidden="true" />
				Return to products
			</Link>
		</section>
	);
}

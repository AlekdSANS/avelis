import { Plus, RefreshCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Skeleton } from "../../../../components/ui/Skeleton/Skeleton";
import { Select } from "../../../../components/ui/Select/Select";
import { useAdminProductReferenceNotes } from "../../hooks/useAdminProducts";
import type { FragranceNoteType } from "../../../../types/product";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import styles from "./ProductForm.module.scss";

const groups: Array<{ type: FragranceNoteType; label: string }> = [
	{ type: "TOP", label: "Top notes" },
	{ type: "HEART", label: "Heart notes" },
	{ type: "BASE", label: "Base notes" },
];

export function ProductNotesSection() {
	const { control, getValues } = useFormContext<AdminProductFormValues>();
	const { append, fields, remove } = useFieldArray({
		control,
		name: "notes",
		keyName: "fieldKey",
	});
	const notesQuery = useAdminProductReferenceNotes();
	const [selected, setSelected] = useState<Record<FragranceNoteType, string>>({
		TOP: "",
		HEART: "",
		BASE: "",
	});
	const [selectionError, setSelectionError] = useState<string | null>(null);
	const availableNotes = notesQuery.data?.data ?? [];

	const addNote = (type: FragranceNoteType) => {
		const noteId = selected[type];
		if (noteId.length === 0) {
			return;
		}

		if (
			getValues("notes").some(
				(note) => note.type === type && note.noteId === noteId,
			)
		) {
			setSelectionError("This note is already selected in that group.");
			return;
		}

		const reference = availableNotes.find((note) => note.id === noteId);
		append({
			noteId,
			name: reference?.name,
			isActive: reference?.isActive,
			type,
			position: fields.filter((field) => field.type === type).length,
		});
		setSelected((current) => ({ ...current, [type]: "" }));
		setSelectionError(null);
	};

	return (
		<section aria-labelledby="product-notes-title" className={styles.section}>
			<header className={styles.sectionHeading}>
				<div>
					<p>Fragrance pyramid</p>
					<h2 id="product-notes-title">Notes</h2>
				</div>
				<span>Existing notes only</span>
			</header>

			{notesQuery.isLoading ? (
				<div aria-label="Loading fragrance notes" className={styles.referenceLoading} role="status">
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : null}

			{notesQuery.isError ? (
				<div className={styles.referenceError} role="alert">
					<p>Available fragrance notes could not be loaded.</p>
					<button onClick={() => void notesQuery.refetch()} type="button">
						<RefreshCcw aria-hidden="true" />
						Try again
					</button>
				</div>
			) : null}

			{selectionError === null ? null : (
				<p className={styles.sectionError} role="alert">
					{selectionError}
				</p>
			)}

			<div className={styles.noteGroups}>
				{groups.map((group) => {
					const groupFields = fields
						.map((field, index) => ({ field, index }))
						.filter(({ field }) => field.type === group.type);

					return (
						<fieldset key={group.type}>
							<legend>{group.label}</legend>
							<div className={styles.notePicker}>
								<Select
									aria-label={`Available ${group.label.toLowerCase()}`}
									disabled={notesQuery.isLoading || notesQuery.isError}
									onChange={(event) =>
										setSelected((current) => ({
											...current,
											[group.type]: event.target.value,
										}))
									}
									value={selected[group.type]}
								>
									<option value="">Select a note</option>
									{availableNotes.filter((note) => note.isActive).map((note) => (
										<option key={note.id} value={note.id}>
											{note.name}
										</option>
									))}
								</Select>
								<button
									disabled={selected[group.type].length === 0}
									onClick={() => addNote(group.type)}
									type="button"
								>
									<Plus aria-hidden="true" />
									Add
								</button>
							</div>

							{groupFields.length === 0 ? (
								<p className={styles.groupEmpty}>No {group.label.toLowerCase()} selected.</p>
							) : (
								<ul className={styles.selectedNotes}>
									{groupFields.map(({ field, index }) => {
										const name =
											field.name ??
											availableNotes.find(
												(note) => note.id === field.noteId,
											)?.name ??
											"Unavailable note";
										const isActive =
											availableNotes.find(
												(note) => note.id === field.noteId,
											)?.isActive ??
											field.isActive ??
											false;

										return (
											<li key={field.fieldKey}>
												<span>
													{name}
													{isActive ? null : " (Inactive)"}
												</span>
												<button
													aria-label={`Remove ${name} from ${group.label.toLowerCase()}`}
													onClick={() => remove(index)}
													type="button"
												>
													<Trash2 aria-hidden="true" />
													Remove
												</button>
											</li>
										);
									})}
								</ul>
							)}
						</fieldset>
					);
				})}
			</div>
		</section>
	);
}

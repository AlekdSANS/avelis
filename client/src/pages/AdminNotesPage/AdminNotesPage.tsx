import { Edit3, Leaf, Plus, RefreshCcw, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { Modal } from "../../components/ui/Modal/Modal";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { Select } from "../../components/ui/Select/Select";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import {
	useAdminNotes,
	useCreateAdminNote,
	useDeleteAdminNote,
	useUpdateAdminNote,
} from "../../features/admin/hooks/useAdminNotes";
import { ApiClientError } from "../../services/apiClient";
import type {
	AdminNote,
	AdminReferenceStatus,
} from "../../types/adminNote";
import styles from "../AdminReferencePage/AdminReferencePage.module.scss";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	month: "short",
	year: "numeric",
});

function safePage(value: string | null) {
	const page = Number(value);
	return Number.isInteger(page) && page > 0 ? page : 1;
}

function mutationMessage(error: unknown) {
	return error instanceof ApiClientError
		? error.message
		: "The fragrance note could not be saved.";
}

export function AdminNotesPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search") ?? "";
	const statusParam = searchParams.get("status");
	const status: AdminReferenceStatus =
		statusParam === "active" || statusParam === "inactive"
			? statusParam
			: "all";
	const page = safePage(searchParams.get("page"));
	const notesQuery = useAdminNotes({
		...(search.length === 0 ? {} : { search }),
		status,
		page,
		limit: 20,
	});
	const createMutation = useCreateAdminNote();
	const updateMutation = useUpdateAdminNote();
	const deleteMutation = useDeleteAdminNote();
	const [editor, setEditor] = useState<AdminNote | "new" | null>(null);
	const [name, setName] = useState("");
	const [isActive, setIsActive] = useState(true);
	const [editorError, setEditorError] = useState<string | null>(null);
	const [deactivateTarget, setDeactivateTarget] = useState<AdminNote | null>(
		null,
	);
	const [feedback, setFeedback] = useState<string | null>(null);

	const updateParams = (
		updates: Record<string, string | undefined>,
	) => {
		setSearchParams((current) => {
			const next = new URLSearchParams(current);
			Object.entries(updates).forEach(([key, value]) => {
				if (
					value === undefined ||
					value.length === 0 ||
					(key === "status" && value === "all") ||
					(key === "page" && value === "1")
				) {
					next.delete(key);
				} else {
					next.set(key, value);
				}
			});
			if (!("page" in updates)) next.delete("page");
			return next;
		});
	};

	const openEditor = (note?: AdminNote) => {
		setEditor(note ?? "new");
		setName(note?.name ?? "");
		setIsActive(note?.isActive ?? true);
		setEditorError(null);
	};

	const saveNote = async (event: FormEvent) => {
		event.preventDefault();
		const normalizedName = name.trim().replace(/\s+/g, " ");
		if (normalizedName.length === 0) {
			setEditorError("Note name is required.");
			return;
		}

		try {
			if (editor === "new") {
				await createMutation.mutateAsync({
					name: normalizedName,
					isActive,
				});
				setFeedback("Fragrance note created.");
			} else if (editor !== null) {
				await updateMutation.mutateAsync({
					id: editor.id,
					input: { name: normalizedName, isActive },
				});
				setFeedback("Fragrance note updated.");
			}
			setEditor(null);
		} catch (error) {
			setEditorError(mutationMessage(error));
		}
	};

	const deactivateNote = async () => {
		if (deactivateTarget === null) return;
		try {
			await deleteMutation.mutateAsync(deactivateTarget.id);
			setFeedback("Fragrance note deactivated.");
			setDeactivateTarget(null);
		} catch (error) {
			setEditorError(mutationMessage(error));
		}
	};

	const notes = notesQuery.data?.data ?? [];

	return (
		<section className={styles.page}>
			<header className={styles.heading}>
				<div>
					<p>Product reference data</p>
					<h2>Fragrance notes</h2>
					<span>
						Manage the reusable note vocabulary used by product fragrance
						pyramids.
					</span>
				</div>
				<Button onClick={() => openEditor()}>
					<Plus aria-hidden="true" />
					Add note
				</Button>
			</header>

			{feedback === null ? null : (
				<p className={styles.feedback} role="status">
					{feedback}
				</p>
			)}

			<div className={styles.toolbar}>
				<form
					className={styles.search}
					onSubmit={(event) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						updateParams({
							search: String(formData.get("search") ?? "").trim(),
						});
					}}
					role="search"
				>
					<Search aria-hidden="true" />
					<Input
						aria-label="Search fragrance notes"
						defaultValue={search}
						key={search}
						name="search"
						placeholder="Search notes"
					/>
					<Button size="sm" type="submit" variant="secondary">
						Search
					</Button>
				</form>
				<label>
					<span>Status</span>
					<Select
						aria-label="Filter fragrance notes by status"
						onChange={(event) =>
							updateParams({ status: event.target.value })
						}
						value={status}
					>
						<option value="all">All statuses</option>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</Select>
				</label>
			</div>

			{notesQuery.isLoading ? (
				<div
					aria-label="Loading fragrance notes"
					className={styles.loading}
					role="status"
				>
					{Array.from({ length: 5 }, (_, index) => (
						<Skeleton key={index} />
					))}
				</div>
			) : null}

			{notesQuery.isError ? (
				<div className={styles.state} role="alert">
					<RefreshCcw aria-hidden="true" />
					<h3>Fragrance notes could not be loaded</h3>
					<p>Check the connection and try this request again.</p>
					<Button onClick={() => void notesQuery.refetch()} variant="secondary">
						Try again
					</Button>
				</div>
			) : null}

			{!notesQuery.isLoading && !notesQuery.isError && notes.length === 0 ? (
				<div className={styles.state}>
					<Leaf aria-hidden="true" />
					<h3>
						{search.length > 0 || status !== "all"
							? "No notes match these filters"
							: "No fragrance notes yet"}
					</h3>
					<p>
						{search.length > 0 || status !== "all"
							? "Adjust the search or status filter."
							: "Create the first reusable fragrance note."}
					</p>
				</div>
			) : null}

			{notes.length > 0 ? (
				<>
					<div className={styles.tableWrap}>
						<table>
							<thead>
								<tr>
									<th scope="col">Note</th>
									<th scope="col">Status</th>
									<th scope="col">Products</th>
									<th scope="col">Updated</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								{notes.map((note) => (
									<tr key={note.id}>
										<td>
											<strong>{note.name}</strong>
										</td>
										<td>
											<span
												className={[
													styles.status,
													note.isActive ? styles.active : styles.inactive,
												].join(" ")}
											>
												{note.isActive ? "Active" : "Inactive"}
											</span>
										</td>
										<td>{note.productCount}</td>
										<td>{dateFormatter.format(new Date(note.updatedAt))}</td>
										<td>
											<div className={styles.rowActions}>
												<button onClick={() => openEditor(note)} type="button">
													<Edit3 aria-hidden="true" />
													Edit
												</button>
												{note.isActive ? (
													<button
														onClick={() => setDeactivateTarget(note)}
														type="button"
													>
														Deactivate
													</button>
												) : (
													<button
														onClick={() =>
															void updateMutation
																.mutateAsync({
																	id: note.id,
																	input: { isActive: true },
																})
																.then(() =>
																	setFeedback(
																		"Fragrance note activated.",
																	),
																)
														}
														type="button"
													>
														Activate
													</button>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className={styles.cards}>
						{notes.map((note) => (
							<article key={note.id}>
								<header>
									<strong>{note.name}</strong>
									<span
										className={[
											styles.status,
											note.isActive ? styles.active : styles.inactive,
										].join(" ")}
									>
										{note.isActive ? "Active" : "Inactive"}
									</span>
								</header>
								<dl>
									<div>
										<dt>Products</dt>
										<dd>{note.productCount}</dd>
									</div>
									<div>
										<dt>Updated</dt>
										<dd>{dateFormatter.format(new Date(note.updatedAt))}</dd>
									</div>
								</dl>
								<div className={styles.rowActions}>
									<button onClick={() => openEditor(note)} type="button">
										<Edit3 aria-hidden="true" />
										Edit
									</button>
									{note.isActive ? (
										<button
											onClick={() => setDeactivateTarget(note)}
											type="button"
										>
											Deactivate
										</button>
									) : null}
								</div>
							</article>
						))}
					</div>

					<Pagination
						ariaLabel="Fragrance note pages"
						currentPage={notesQuery.data?.page ?? page}
						onPageChange={(nextPage) =>
							updateParams({ page: String(nextPage) })
						}
						totalPages={notesQuery.data?.totalPages ?? 1}
					/>
				</>
			) : null}

			<Modal
				description="Names are reused across product fragrance pyramids."
				footer={
					<>
						<Button onClick={() => setEditor(null)} variant="secondary">
							Cancel
						</Button>
						<Button
							disabled={
								createMutation.isPending || updateMutation.isPending
							}
							form="admin-note-form"
							type="submit"
						>
							{createMutation.isPending || updateMutation.isPending
								? "Saving…"
								: "Save note"}
						</Button>
					</>
				}
				isOpen={editor !== null}
				onClose={() => setEditor(null)}
				title={editor === "new" ? "Add fragrance note" : "Edit fragrance note"}
			>
				<form
					className={styles.editorForm}
					id="admin-note-form"
					onSubmit={(event) => void saveNote(event)}
				>
					<label>
						<span>Name</span>
						<Input
							autoComplete="off"
							autoFocus
							maxLength={120}
							onChange={(event) => setName(event.target.value)}
							value={name}
						/>
					</label>
					<label className={styles.check}>
						<input
							checked={isActive}
							onChange={(event) => setIsActive(event.target.checked)}
							type="checkbox"
						/>
						<span>Available for new product selections</span>
					</label>
					{editorError === null ? null : (
						<p className={styles.error} role="alert">
							{editorError}
						</p>
					)}
				</form>
			</Modal>

			<Modal
				description="Existing product relations will remain intact."
				footer={
					<>
						<Button
							onClick={() => setDeactivateTarget(null)}
							variant="secondary"
						>
							Cancel
						</Button>
						<Button
							disabled={deleteMutation.isPending}
							onClick={() => void deactivateNote()}
						>
							{deleteMutation.isPending ? "Deactivating…" : "Deactivate note"}
						</Button>
					</>
				}
				isOpen={deactivateTarget !== null}
				onClose={() => setDeactivateTarget(null)}
				title="Deactivate fragrance note?"
			>
				<p>
					{deactivateTarget?.name} will no longer be available for new product
					selections.
				</p>
			</Modal>
		</section>
	);
}

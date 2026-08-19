import { ArrowLeft, RefreshCcw } from "lucide-react";
import { useState } from "react";
import {
	Link,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import {
	CollectionForm,
} from "../../features/admin/collections/components/CollectionForm";
import { collectionFormValuesToInput } from "../../features/admin/collections/utils/collectionFormMappers";
import type { AdminCollectionFormValues } from "../../features/admin/collections/schemas/adminCollectionFormSchema";
import {
	useAdminCollection,
	useCreateAdminCollection,
	useUpdateAdminCollection,
} from "../../features/admin/hooks/useAdminCollections";
import styles from "./AdminCollectionFormPage.module.scss";

export function AdminCollectionFormPage() {
	const { collectionId } = useParams();
	const isEditing = Boolean(collectionId);
	const navigate = useNavigate();
	const location = useLocation();
	const collectionQuery = useAdminCollection(collectionId);
	const createMutation = useCreateAdminCollection();
	const updateMutation = useUpdateAdminCollection();
	const [feedback, setFeedback] = useState<string | null>(null);
	const navigationFeedback =
		typeof location.state === "object" &&
		location.state !== null &&
		"feedback" in location.state &&
		typeof location.state.feedback === "string"
			? location.state.feedback
			: null;

	const saveCollection = async (values: AdminCollectionFormValues) => {
		const input = collectionFormValuesToInput(values);
		if (collectionId) {
			await updateMutation.mutateAsync({ id: collectionId, input });
			setFeedback("Collection changes saved.");
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		const response = await createMutation.mutateAsync(input);
		navigate(`/admin/collections/${response.data.id}/edit`, {
			replace: true,
			state: { feedback: "Collection created." },
		});
	};

	if (isEditing && collectionQuery.isLoading) {
		return (
			<div
				aria-busy="true"
				aria-label="Loading collection editor"
				className={styles.loading}
				role="status"
			>
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</div>
		);
	}

	if (isEditing && collectionQuery.isError) {
		return (
			<section className={styles.state} role="alert">
				<p>Collection editor</p>
				<h2>The collection could not be loaded.</h2>
				<span>It may no longer exist, or the request was interrupted.</span>
				<div>
					<Button
						onClick={() => void collectionQuery.refetch()}
						variant="secondary"
					>
						<RefreshCcw aria-hidden="true" />
						Try again
					</Button>
					<Link to="/admin/collections">Back to collections</Link>
				</div>
			</section>
		);
	}

	return (
		<section className={styles.page}>
			<header className={styles.heading}>
				<div>
					<Link to="/admin/collections">
						<ArrowLeft aria-hidden="true" />
						Collections
					</Link>
					<p>{isEditing ? "Collection editor" : "New collection"}</p>
					<h2>
						{isEditing
							? collectionQuery.data?.data.name
							: "Create collection"}
					</h2>
					<span>
						Compose the story, imagery, product order and storefront
						visibility in one place.
					</span>
				</div>
			</header>

			{feedback ?? navigationFeedback ? (
				<p className={styles.feedback} role="status">
					{feedback ?? navigationFeedback}
				</p>
			) : null}

			<CollectionForm
				initialCollection={collectionQuery.data?.data}
				isSaving={createMutation.isPending || updateMutation.isPending}
				onSubmit={saveCollection}
			/>
		</section>
	);
}

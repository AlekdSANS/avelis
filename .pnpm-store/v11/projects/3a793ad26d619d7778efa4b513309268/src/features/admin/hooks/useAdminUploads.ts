import { useMutation } from "@tanstack/react-query";
import { adminUploadService } from "../../../services/adminUploadService";

export function useUploadAdminProductImages() {
	return useMutation({
		mutationFn: ({
			files,
			onProgress,
		}: {
			files: File[];
			onProgress?: (progress: number) => void;
		}) => adminUploadService.uploadProductImages(files, onProgress),
		retry: false,
	});
}

export function useDeleteAdminProductUpload() {
	return useMutation({
		mutationFn: (storageKey: string) =>
			adminUploadService.deleteProductImage(storageKey),
		retry: false,
	});
}

export function useUploadAdminCollectionImages() {
	return useMutation({
		mutationFn: ({
			files,
			onProgress,
		}: {
			files: File[];
			onProgress?: (progress: number) => void;
		}) => adminUploadService.uploadCollectionImages(files, onProgress),
		retry: false,
	});
}

import { useCurrentUser } from "../../auth/hooks/useAuth";
import { useOrderByNumber } from "./useOrderByNumber";

export function useOrderConfirmation(orderNumber: string | undefined) {
  const currentUser = useCurrentUser();
  const query = useOrderByNumber(orderNumber, {
    enabled:
      !currentUser.isLoading &&
      !currentUser.isError &&
      currentUser.data !== null &&
      currentUser.data !== undefined,
  });

  return {
    ...query,
    authError: currentUser.isError,
    authLoading: currentUser.isLoading,
    currentUser: currentUser.data,
    refetchAuth: currentUser.refetch,
    guestConfirmationUnavailable:
      query.validOrderNumber &&
      !currentUser.isLoading &&
      !currentUser.isError &&
      currentUser.data === null &&
      query.data === undefined,
  };
}

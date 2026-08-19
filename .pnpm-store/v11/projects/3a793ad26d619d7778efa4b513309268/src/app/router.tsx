import { createBrowserRouter } from "react-router-dom";

import { StoreLayout } from "../layouts/StoreLayout/StoreLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { ShopPage } from "../pages/ShopPage/ShopPage";
import { AccountLayout } from "../layouts/AccountLayout/AccountLayout";
import { AdminLayout } from "../layouts/AdminLayout/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";
import { PlaceholderPage } from "../pages/PlaceholderPage/PlaceholderPage";
import { RequireAuth } from "../features/auth/components/RequireAuth";
import { GuestOnlyRoute } from "../features/auth/components/GuestOnlyRoute";
import { RequireAdmin } from "../features/auth/components/RequireAdmin";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { CheckoutPage } from "../pages/CheckoutPage/CheckoutPage";
import { OrderConfirmationPage } from "../pages/OrderConfirmationPage/OrderConfirmationPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { OrdersPage } from "../pages/OrdersPage/OrdersPage";
import { OrderDetailsPage } from "../pages/OrderDetailsPage/OrderDetailsPage";
import { WishlistPage } from "../pages/WishlistPage/WishlistPage";
import { AdminDashboardPage } from "../pages/AdminDashboardPage/AdminDashboardPage";
import { AdminProductsPage } from "../pages/AdminProductsPage/AdminProductsPage";
import { AdminOrdersPage } from "../pages/AdminOrdersPage/AdminOrdersPage";
import { AdminProductFormPage } from "../pages/AdminProductFormPage/AdminProductFormPage";
import { AdminNotesPage } from "../pages/AdminNotesPage/AdminNotesPage";
import { AdminCollectionsPage } from "../pages/AdminCollectionsPage/AdminCollectionsPage";
import { AdminOrderDetailPage } from "../pages/AdminOrderDetailPage/AdminOrderDetailPage";
import { CollectionsPage } from "../pages/CollectionsPage/CollectionsPage";
import { CollectionPage } from "../pages/CollectionPage/CollectionPage";
import { AdminCollectionFormPage } from "../pages/AdminCollectionFormPage/AdminCollectionFormPage";
import { FragranceGuidePage } from "../pages/FragranceGuidePage/FragranceGuidePage";
import { AboutPage } from "../pages/AboutPage/AboutPage";
import { InformationPage } from "../pages/InformationPage/InformationPage";
import { informationPages } from "../pages/InformationPage/informationPages";
import { ScentFinderPage } from "../pages/ScentFinderPage/ScentFinderPage";
import { JournalPage } from "../pages/JournalPage/JournalPage";
import { JournalArticlePage } from "../pages/JournalArticlePage/JournalArticlePage";
import { AdminJournalPage } from "../pages/AdminJournalPage/AdminJournalPage";
import { AdminReviewsPage } from "../pages/AdminReviewsPage/AdminReviewsPage";
import { GiftSetsPage } from "../pages/GiftSetsPage/GiftSetsPage";
import { AdminMerchandisingPage } from "../pages/AdminMerchandisingPage/AdminMerchandisingPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
	{
		element: <StoreLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/shop",
				element: <ShopPage />,
			},
			{
				path: "/products/:slug",
				element: <ProductPage />,
			},
			{
				path: "/collections",
				element: <CollectionsPage />,
			},
			{
				path: "/collections/:slug",
				element: <CollectionPage />,
			},
			{
				path: "/fragrance-guide",
				element: <FragranceGuidePage />,
			},
			{ path: "/scent-finder", element: <ScentFinderPage /> },
			{ path: "/gift-sets", element: <GiftSetsPage /> },
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/contact",
				element: <InformationPage content={informationPages.contact} />,
			},
			{
				path: "/delivery-returns",
				element: <InformationPage content={informationPages.deliveryReturns} />,
			},
			{
				path: "/faq",
				element: <InformationPage content={informationPages.faq} />,
			},
			{
				path: "/materials",
				element: <InformationPage content={informationPages.materials} />,
			},
			{ path: "/journal", element: <JournalPage /> },
			{ path: "/journal/:slug", element: <JournalArticlePage /> },
			{
				path: "/privacy",
				element: <InformationPage content={informationPages.privacy} />,
			},
			{
				path: "/terms",
				element: <InformationPage content={informationPages.terms} />,
			},
			{
				path: "/cookies",
				element: <InformationPage content={informationPages.cookies} />,
			},
			{
				path: "/cart",
				element: <PlaceholderPage title="Cart" />,
			},
			{
				path: "/checkout",
				element: <CheckoutPage />,
			},
			{
				path: "/checkout/success/:orderNumber",
				element: <OrderConfirmationPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: (
					<GuestOnlyRoute>
						<LoginPage />
					</GuestOnlyRoute>
				),
			},
			{
				path: "/register",
				element: (
					<GuestOnlyRoute>
						<RegisterPage />
					</GuestOnlyRoute>
				),
			},
		],
	},
	{
		path: "/account",
		element: (
			<RequireAuth>
				<AccountLayout />
			</RequireAuth>
		),
		children: [
			{
				index: true,
				element: <AccountPage />,
			},
			{
				path: "orders",
				element: <OrdersPage />,
			},
			{
				path: "orders/:orderNumber",
				element: <OrderDetailsPage />,
			},
			{
				path: "wishlist",
				element: <WishlistPage />,
			},
		],
	},
	{
		path: "/admin",
		element: (
			<RequireAdmin>
				<AdminLayout />
			</RequireAdmin>
		),
		children: [
			{
				index: true,
				element: <AdminDashboardPage />,
			},
			{
				path: "products",
				element: <AdminProductsPage />,
			},
			{
				path: "products/new",
				element: <AdminProductFormPage />,
			},
			{
				path: "products/:id/edit",
				element: <AdminProductFormPage />,
			},
			{
				path: "orders",
				element: <AdminOrdersPage />,
			},
			{
				path: "orders/:orderNumber",
				element: <AdminOrderDetailPage />,
			},
			{
				path: "notes",
				element: <AdminNotesPage />,
			},
			{
				path: "collections",
				element: <AdminCollectionsPage />,
			},
			{
				path: "collections/new",
				element: <AdminCollectionFormPage />,
			},
			{
				path: "collections/:collectionId/edit",
				element: <AdminCollectionFormPage />,
			},
			{ path: "journal", element: <AdminJournalPage /> },
			{ path: "reviews", element: <AdminReviewsPage /> },
			{ path: "merchandising", element: <AdminMerchandisingPage /> },
		],
	},
]);

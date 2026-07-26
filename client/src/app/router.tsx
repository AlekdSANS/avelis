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
				element: <PlaceholderPage title="Fragrance Guide" />,
			},
			{
				path: "/about",
				element: <PlaceholderPage title="About Avelis" />,
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
		],
	},
	{
		path: "*",
		element: <PlaceholderPage title="Page Not Found" />,
	},
]);

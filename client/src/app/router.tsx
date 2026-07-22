import { createBrowserRouter } from "react-router-dom";

import { StoreLayout } from "../layouts/StoreLayout/StoreLayout";
import { AccountLayout } from "../layouts/AccountLayout/AccountLayout";
import { AdminLayout } from "../layouts/AdminLayout/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";

const PlaceholderPage = ({ title }: { title: string }) => (
	<section>
		<h1>{title}</h1>
	</section>
);

export const router = createBrowserRouter([
	{
		element: <StoreLayout />,
		children: [
			{
				path: "/",
				element: <PlaceholderPage title="AVELIS Home" />,
			},
			{
				path: "/shop",
				element: <PlaceholderPage title="Shop" />,
			},
			{
				path: "/products/:slug",
				element: <PlaceholderPage title="Product" />,
			},
			{
				path: "/collections",
				element: <PlaceholderPage title="Collections" />,
			},
			{
				path: "/collections/:slug",
				element: <PlaceholderPage title="Collection" />,
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
				element: <PlaceholderPage title="Checkout" />,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <PlaceholderPage title="Login" />,
			},
			{
				path: "/register",
				element: <PlaceholderPage title="Register" />,
			},
		],
	},
	{
		path: "/account",
		element: <AccountLayout />,
		children: [
			{
				index: true,
				element: <PlaceholderPage title="Account" />,
			},
			{
				path: "orders",
				element: <PlaceholderPage title="Orders" />,
			},
		],
	},
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <PlaceholderPage title="Admin Dashboard" />,
			},
		],
	},
	{
		path: "*",
		element: <PlaceholderPage title="Page Not Found" />,
	},
]);

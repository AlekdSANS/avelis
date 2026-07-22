import { createBrowserRouter } from "react-router-dom";

const PlaceholderPage = ({ title }: { title: string }) => (
	<main>
		<h1>{title}</h1>
	</main>
);

export const router = createBrowserRouter([
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
		path: "/login",
		element: <PlaceholderPage title="Login" />,
	},
	{
		path: "/register",
		element: <PlaceholderPage title="Register" />,
	},
	{
		path: "/cart",
		element: <PlaceholderPage title="Cart" />,
	},
	{
		path: "/checkout",
		element: <PlaceholderPage title="Checkout" />,
	},
	{
		path: "/account",
		element: <PlaceholderPage title="Account" />,
	},
	{
		path: "/account/orders",
		element: <PlaceholderPage title="Orders" />,
	},
	{
		path: "/admin",
		element: <PlaceholderPage title="Admin" />,
	},
	{
		path: "*",
		element: <PlaceholderPage title="Page Not Found" />,
	},
]);

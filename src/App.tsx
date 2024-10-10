import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./_root/pages/Home";
import { SigninForm, SignupForm } from "./_auth/forms";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "./components/ui/toaster";
import CreatePost from "./_root/pages/CreatePost";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "explore",
				element: <div>explore</div>,
			},
			{
				path: "all-users",
				element: <div>all users</div>,
			},
			{
				path: "saved",
				element: <div>saves</div>,
			},
			{
				path: "create-post",
				element: <CreatePost />,
			},
			{
				path: `profile/:userId`,
				element: <div>profile</div>,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "sign-in",
				element: <SigninForm />,
			},
			{
				path: "sign-up",
				element: <SignupForm />,
			},
		],
	},
]);

function App() {
	return (
		<main className="h-screen flex">
			<RouterProvider router={router} />
			<Toaster />
		</main>
	);
}

export default App;

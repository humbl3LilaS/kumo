import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./_root/pages/Home";
import { SigninForm, SignupForm } from "./_auth/forms";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "./components/ui/toaster";
import CreatePost from "./_root/pages/CreatePost";
import EditPost from "./_root/pages/EditPost";
import PostDetails from "./_root/pages/PostDetails";
import Explore from "./_root/pages/Explore";
import Save from "./_root/pages/Save";
import AllUsers from "./_root/pages/AllUsers";

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
				element: <Explore />,
			},
			{
				path: "all-users",
				element: <AllUsers />,
			},
			{
				path: "saved",
				element: <Save />,
			},
			{
				path: "posts/:postId",
				element: <PostDetails />,
			},
			{
				path: "create-post",
				element: <CreatePost />,
			},
			{
				path: "update-post/:postId",
				element: <EditPost />,
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

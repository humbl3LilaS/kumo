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
import Profile from "./_root/pages/Profile";
import EditProfile from "./_root/pages/EditProfile";
import { authRouteGuard, routeGuard } from "./loader";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		loader: routeGuard,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "explore",
				element: <Explore />,
				loader: routeGuard,
			},
			{
				path: "all-users",
				element: <AllUsers />,
				loader: routeGuard,
			},
			{
				path: "saved",
				element: <Save />,
				loader: routeGuard,
			},
			{
				path: "posts/:postId",
				element: <PostDetails />,
				loader: routeGuard,
			},
			{
				path: "create-post",
				element: <CreatePost />,
				loader: routeGuard,
			},
			{
				path: "update-post/:postId",
				element: <EditPost />,
				loader: routeGuard,
			},
			{
				path: `profile/:userId`,
				element: <Profile />,
				loader: routeGuard,
			},
			{
				path: "profile/edit/:userId",
				element: <EditProfile />,
				loader: routeGuard,
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
				loader: authRouteGuard,
			},
			{
				path: "sign-up",
				element: <SignupForm />,
				loader: authRouteGuard,
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

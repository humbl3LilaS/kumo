import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./_root/pages/Home";
import { SigninForm, SignupForm } from "./_auth/forms";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
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
		</main>
	);
}

export default App;

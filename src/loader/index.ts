import { LoaderFunction, redirect } from "react-router-dom";

export const routeGuard: LoaderFunction = () => {
	if (
		localStorage.getItem("cookieFallback") === "[]" ||
		localStorage.getItem("cookieFallback") === null
	) {
		console.log("user is not authenticated");
		return redirect("/auth/sign-in");
	}
	console.log("user is authenticated");
	return true;
};

export const authRouteGuard: LoaderFunction = () => {
	if (
		!(localStorage.getItem("cookieFallback") === "[]") &&
		!(localStorage.getItem("cookieFallback") === null)
	) {
		console.log("user is authenticated");
		return redirect("/");
	}
	console.log("user is not authenticated");
	return true;
};

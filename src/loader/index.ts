import { LoaderFunction, redirect } from "react-router-dom";

export const routeGuard: LoaderFunction = () => {
	if (
		localStorage.getItem("cookieFallback") === "[]" ||
		localStorage.getItem("cookieFallback") === null
	) {
		return redirect("/auth/sign-in");
	}
	return true;
};

export const authRouteGuard: LoaderFunction = () => {
	if (
		!(localStorage.getItem("cookieFallback") === "[]") &&
		!(localStorage.getItem("cookieFallback") === null)
	) {
		return redirect("/");
	}
	return true;
};

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const checkIsAuthenticated = useUserStore(
		(state) => state.checkIsAuthenticated,
	);

	useEffect(() => {
		if (
			localStorage.getItem("cookieFallback") === "[]" ||
			localStorage.getItem("cookieFallback") === null
		) {
			return navigate("/auth/sign-in");
		}
		checkIsAuthenticated();
	}, []);

	return (
		<div>
			<h1>home</h1>
			<Button>Hello</Button>
		</div>
	);
};

export default Home;

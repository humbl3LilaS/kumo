import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (
			localStorage.getItem("cookieFallback") === "[]" ||
			localStorage.getItem("cookieFallback") === null
		) {
			return navigate("/auth/sign-in");
		}
	}, []);

	return (
		<div>
			<h1>home</h1>
			<Button>Hello</Button>
		</div>
	);
};

export default Home;

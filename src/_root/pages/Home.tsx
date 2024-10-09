import { useUserQuery } from "@/lib/query/query";
import { useUserStore } from "@/lib/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const setUser = useUserStore((state) => state.setUser);
	const { data: user } = useUserQuery();

	useEffect(() => {
		if (
			localStorage.getItem("cookieFallback") === "[]" ||
			localStorage.getItem("cookieFallback") === null
		) {
			navigate("/auth/sign-in");
			return;
		}
		if (user) {
			setUser({
				id: user.$id,
				name: user?.name,
				email: user?.email,
				username: user?.username,
				imageUrl: user?.imageUrl,
				bio: user?.bio,
			});
		}
	}, []);

	return (
		<div>
			<h1>home</h1>
		</div>
	);
};

export default Home;

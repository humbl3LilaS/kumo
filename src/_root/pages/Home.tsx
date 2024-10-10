import Post from "@/components/shared/Post";
import { useGetRecentPosts, useUserQuery } from "@/lib/query/query";
import { useUserStore } from "@/lib/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const setUser = useUserStore((state) => state.setUser);
	const { data: user } = useUserQuery();
	const { data: posts } = useGetRecentPosts();

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
				id: user?.$id,
				name: user?.name,
				email: user?.email,
				username: user?.username,
				imageUrl: user?.imageUrl,
				bio: user?.bio,
			});
		}
	}, []);

	return (
		<div className="flex flex-1">
			<div className="home-container">
				<div className="home-posts">
					<h2 className="w-full h3-bold text-left md:h2-bold ">Home Feed</h2>
					{posts ? (
						<ul className="w-full flex-1 flex flex-col gap-y-9">
							{posts &&
								posts.documents.map((item) => (
									<Post
										data={item}
										key={item?.$id}
									/>
								))}
						</ul>
					) : (
						<div>loading</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;

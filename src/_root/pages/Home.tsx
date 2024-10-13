import Post from "@/components/shared/Post";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { useGetRecentPosts } from "@/lib/query/query";

const Home = () => {
	const { data: posts } = useGetRecentPosts();

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
						<PostSkeleton />
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;

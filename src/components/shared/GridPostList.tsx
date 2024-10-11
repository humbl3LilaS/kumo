import { useUserQuery } from "@/lib/query/query";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type GridPostListProp = {
	posts: Models.Document[];
};

const GridPostList = ({ posts }: GridPostListProp) => {
	const { data: user } = useUserQuery();
	return (
		<ul className="grid-container">
			{posts.map((post: Models.Document) => {
				return (
					<li
						key={post.$id}
						className="min-w-80 h-80 block relative">
						<Link
							to={`/posts/${post.$id}`}
							className="grid-post_link">
							<img
								src={post.imageUrl}
								alt="post image"
								className="w-full h-full object-cover"
							/>
						</Link>

						<div className="grid-post_user">
							<div className="flex items-center justify-start gap-2 flex-1">
								<img
									src={
										post.creator.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt="creator"
									className="w-8 h-8 rounded-full"
								/>
								<p className="line-clamp-1">{post.creator.name}</p>
							</div>
							<PostStats
								data={post}
								userId={user?.$id}
							/>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default GridPostList;

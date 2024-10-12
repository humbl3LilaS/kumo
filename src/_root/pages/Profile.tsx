import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import { useGetUserById, useUserQuery } from "@/lib/query/query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
	const { userId } = useParams();
	const { data: user } = useGetUserById(userId ?? "");
	console.log(user);
	const { data: currUser } = useUserQuery();
	const [showLikedPost, setShowLikedPost] = useState(false);
	const postHandler = () => {
		if (showLikedPost) {
			setShowLikedPost(false);
		}
	};
	const likedPostHandler = () => {
		if (!showLikedPost) {
			setShowLikedPost(true);
		}
	};

	return (
		<div className="py-10 px-5 flex flex-col flex-1 items-center overflow-scroll md:p-14 custom-scrollbar">
			<div className="w-full max-w-5xl flex flex-col items-center gap-6 md:gap-9">
				<p className="w-full px-4 flex items-center justify-between">
					<div className="flex gap-x-4 items-center">
						<img
							src={user?.imageUrl ?? "/assets/images/profile-placeholder.svg"}
							alt="profile"
							className="aspect-square w-10 rounded-full md:w-16 lg:w-32"
						/>
						<div className="flex flex-col items-start lg:gap-y-3">
							<p className="font-bold text-center lg:text-5xl">{user?.name}</p>
							<p className="font-thin text-center text-xs lg:text-xl text-off-white">
								@{user?.username}
							</p>
						</div>
					</div>
					{user?.$id === currUser?.$id && (
						<Link
							className="py-2 px-2 bg-stone-600 flex rounded-xl lg:py-4 lg:px-4"
							to={`/profile/edit/${userId}`}>
							<img
								src="/assets/icons/edit.svg"
								alt="edit"
								className="aspect-square w-6 mr-2"
							/>
							<span className="font-semibold">Edit Profile</span>
						</Link>
					)}
				</p>

				<div className="w-full flex justify-start">
					{user?.bio && <p> &ldquo; {user.bio} &rdquo;</p>}
				</div>

				<div className="mt-8 w-full flex justify-start gap-x-4 ">
					<Button
						className="w-40 py-6 px-6 bg-dark-3 flex items-center justify-center rounded-xl lg:w-60 "
						onClick={postHandler}>
						<img
							src="/assets/icons/posts.svg"
							alt="edit"
							className="aspect-square w-6 mr-2"
						/>
						<span>Post</span>
					</Button>
					<Button
						className="w-40 py-6 px-6 bg-dark-4 flex items-center justify-center rounded-xl lg:w-60"
						onClick={likedPostHandler}>
						<img
							src="/assets/icons/like.svg"
							alt="edit"
							className="aspect-square w-6 mr-2"
						/>
						<span>Liked Posts</span>
					</Button>
				</div>

				<div className="w-full max-w-5xl flex flex-wrap gap-9">
					{user && showLikedPost ? (
						<GridPostList posts={user?.liked} />
					) : (
						<GridPostList posts={user?.posts} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;

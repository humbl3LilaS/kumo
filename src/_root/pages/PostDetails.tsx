import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/lib/query/mutation";
import { useGetPostById, useUserQuery } from "@/lib/query/query";
import { cn, multiFormatDateString } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
	const { postId } = useParams();
	const { data: post } = useGetPostById(postId ?? "");
	const { data: user } = useUserQuery();
	const { mutateAsync: deletePost } = useDeletePost();
	const navigate = useNavigate();

	const deleteHandler = async () => {
		if (post) {
			console.log("deleting");
			await deletePost({ postId: post.$id, imageId: post?.imageId });
			return navigate("/");
		}
	};

	return (
		<div className="post_details-container">
			{!post && <p>Loading</p>}
			{post && (
				<div className="post_details-card ">
					<img
						src={post.imageUrl}
						alt="post image"
						className="post_details-img"
					/>

					<div className="post_details-info">
						<div className="w-full flex-between">
							<Link
								to={`/profile/${post.creator?.$id}`}
								className="w-full flex items-center gap-x-4">
								<img
									src={
										post?.creator?.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									height={40}
									width={40}
									className="aspect-square w-10 rounded-full"
								/>

								<div className="flex flex-col">
									<p className="base-medium text-light-1 lg:body-bold">
										{post.creator.name}
									</p>
									<div className="flex-left gap-2 text-light-3">
										<p className="subtle-semibold lg:small-regular">
											{multiFormatDateString(post.$createdAt)}
										</p>
										{post.location && (
											<p className="subtle-semibold lg:small-regular">
												{" - " + post.location}
											</p>
										)}
									</div>
								</div>
							</Link>
							<div className="flex-center gap-x-1">
								<Link to={`/update-post/${post.$id}`}>
									<img
										src="/assets/icons/edit.svg"
										alt="edit"
										className={cn(
											"aspect-square w-8",
											user?.$id !== post.creator.$id && "hidden",
										)}
									/>
								</Link>

								<Button
									onClick={deleteHandler}
									className={cn(
										"ghost_details-delete_btn",
										user?.$id !== post.creator.$id && "hidden",
									)}>
									<img
										src="/assets/icons/delete.svg"
										alt="delete"
										className="aspect-squer w-8"
									/>
								</Button>
							</div>
						</div>
						<hr className="w-full border border-dark-4" />
						<div className=" flex-1 flex flex-col small-medium lg:base-regular">
							<p className="text-left">{post.caption}</p>
							<ul className="mt-2 flex gap-1">
								{post.tags.map((tag: string) => (
									<li
										key={tag}
										className="text-light-3">
										#{tag}
									</li>
								))}
							</ul>
						</div>
						<div className="w-full">
							<PostStats
								data={post}
								userId={user?.$id}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostDetails;

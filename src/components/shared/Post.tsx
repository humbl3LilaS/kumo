import { useUserQuery } from "@/lib/query/query";
import { cn, multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostProp = {
	data: Models.Document;
};

const Post = ({ data }: PostProp) => {
	const { data: user } = useUserQuery();

	return (
		<div className="post-card">
			<div className="flex-between">
				<div className="flex items-center gap-x-5">
					<Link to={`profile/${data.creator.$id}`}>
						<img
							src={
								data?.creator?.imageUrl ||
								"/assets/icons/profile-placeholder.svg"
							}
							className="aspect-square w-10 rounded-full"
						/>
					</Link>
					<div className="flex flex-col">
						<p className="base-medium text-light-1 lg:body-bold">
							{data.creator.name}
						</p>
						<div className="flex-center gap-2 text-light-3">
							<p className="subtle-semibold lg:small-regular">
								{multiFormatDateString(data.$createdAt)}
							</p>
							{data.location && (
								<p className="subtle-semibold lg:small-regular">
									{" - " + data.location}
								</p>
							)}
						</div>
					</div>
				</div>
				<Link
					to={`/update-post/${data.$id}`}
					className={cn(user?.$id !== data.creator.$id && "hidden")}>
					<img
						src="/assets/icons/edit.svg"
						alt="edit"
						className="aspect-square w-5"
					/>
				</Link>
			</div>
			<Link
				to={`/posts/${data.$id}`}
				is="div">
				<div className="py-5 small-medium lg:base-medium">
					<p className="text-left">{data.caption}</p>
					<ul className="mt-2 flex gap-1">
						{data.tags.map((tag: string) => (
							<li
								key={tag}
								className="text-light-3">
								#{tag}
							</li>
						))}
					</ul>
				</div>
				<img
					src={data.imageUrl}
					className="post-card_img"
					alt="post image"
				/>
			</Link>
			<PostStats
				data={data}
				userId={user?.$id}
			/>
		</div>
	);
};

export default Post;

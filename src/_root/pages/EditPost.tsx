import PostForm from "@/components/form/PostForm";
import { useGetPostById } from "@/lib/query/query";
import { useParams } from "react-router-dom";

const EditPost = () => {
	const { postId } = useParams();
	const { data: post } = useGetPostById(postId ?? "");

	const tags = post?.tags as string[];

	return (
		<div className="flex flex-1">
			<div className="common-container">
				<div className="w-full max-w-5xl flex-start justify-start gap-x-3">
					<img
						src="/assets/icons/add-post.svg"
						className="aspect-square w-10"
						alt="addpost"
					/>
					<h2 className="w-full h3-bold text-left md:h2-bold">Edit Post</h2>
				</div>
				{post && (
					<PostForm
						post={{ ...post, tags: tags.join(", ") }}
						action="Update"
					/>
				)}
			</div>
		</div>
	);
};

export default EditPost;

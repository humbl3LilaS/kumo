import PostForm from "@/components/form/PostForm";

const CreatePost = () => {
	return (
		<div className="flex flex-1">
			<div className="common-container">
				<div className="w-full max-w-5xl flex-start justify-start gap-x-3">
					<img
						src="/assets/icons/add-post.svg"
						className="aspect-square w-10"
						alt="addpost"
					/>
					<h2 className="w-full h3-bold text-left md:h2-bold">Create Post</h2>
				</div>
				<PostForm />
			</div>
		</div>
	);
};

export default CreatePost;

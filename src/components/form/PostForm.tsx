import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Input } from "../ui/input";
import { PostFormSchema, PostFromSchemaType } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserQuery } from "@/lib/query/query";
import {
	useCreatePostMutation,
	useDeletePost,
	useUpdatePost,
} from "@/lib/query/mutation";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type PostFormProps = {
	post?: Models.Document;
	action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
	const { data: user } = useUserQuery();

	const navigate = useNavigate();

	const { toast } = useToast();

	const form = useForm<PostFromSchemaType>({
		resolver: zodResolver(PostFormSchema),
		defaultValues: {
			caption: post ? post?.caption : "",
			file: [],
			location: post ? post?.location : "",
			tags: post ? post.tags : "",
		},
	});

	const { mutateAsync: createPost } = useCreatePostMutation();

	const { mutateAsync: updatePost } = useUpdatePost();

	const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();

	const onSubmit: SubmitHandler<PostFromSchemaType> = async (value) => {
		if (post && action === "Update") {
			const updatedPost = await updatePost({
				...value,
				postId: post?.$id,
				imageId: post?.imageId,
				imageUrl: post?.imageUrl,
			});

			if (!updatedPost) {
				toast({ title: "Update Failed Try again" });
			}

			return navigate(`/posts/${post.$id}`);
		}
		const newPost = await createPost({
			...value,
			userId: user?.$id ?? "",
		});

		if (!newPost) {
			toast({ title: "Post creation failed" });
		}

		navigate("/");
	};

	const cancelBtnHandler = async () => {
		if (action === "Update") {
			console.log("action delete");
			await deletePost({ postId: post?.$id ?? "", imageId: post?.imageId });
		}
		return navigate("/");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-5xl flex flex-col">
				<FormField
					control={form.control}
					name="caption"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel className="shad-form_label">Caption</FormLabel>
							<FormControl>
								<Textarea
									placeholder="What is on you mind?"
									className="shad-textarea custom-scrollbar"
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_textmessage" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel className="shad-form_label">File</FormLabel>
							<FormControl>
								<FileUploader
									onChange={field.onChange}
									mediaUrl={post?.imageUrl}
								/>
							</FormControl>
							<FormMessage className="shad-form_textmessage" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel className="shad-form_label">Add location</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="shad-input"
									placeholder="Add location..."
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_textmessage" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel className="shad-form_label">
								Add Tags (separated by comma ", " )
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="shad-input"
									placeholder="art, expression, learn"
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_textmessage" />
						</FormItem>
					)}
				/>

				<div className="flex items-center justify-end gap-x-4">
					<Button
						type="button"
						className="w-[6rem] shad-button_dark_4  md:w-[8rem]"
						onClick={cancelBtnHandler}>
						{isDeleting ? (
							<span className="w-full flex items-center gap-x-2">
								<img
									src="/assets/icons/loader.svg"
									alt="loading"
									className="aspect-square w-5"
								/>
								<span>Submitting</span>
							</span>
						) : (
							<span>{action === "Update" ? "Delete" : "Cancel"}</span>
						)}
					</Button>

					<Button
						type="submit"
						className="w-[6rem] shad-button_dark_4 !bg-primary-500 whitespace-nowrap md:w-[8rem]"
						disabled={form.formState.isSubmitting || !form.formState.isValid}>
						{form.formState.isSubmitting ? (
							<span className="w-full flex items-center gap-x-2">
								<img
									src="/assets/icons/loader.svg"
									alt="loading"
									className="aspect-square w-5"
								/>
								<span>Submitting</span>
							</span>
						) : (
							<span>{action}</span>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PostForm;

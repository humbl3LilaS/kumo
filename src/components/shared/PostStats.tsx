import {
	useDeleteSavePost,
	useLikePost,
	useSavePost,
} from "@/lib/query/mutation";
import { useUserQuery } from "@/lib/query/query";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { produce } from "immer";
import { useEffect, useState } from "react";

type PostStatsProps = {
	data: Models.Document;
	userId: string | undefined;
};

const PostStats = ({ data, userId }: PostStatsProps) => {
	const likesList = data.likes.map((user: Models.Document) => user.$id);
	const [likes, setLikes] = useState<string[]>(likesList ?? []);
	const [isSaved, setIsSaved] = useState(false);
	const { data: user } = useUserQuery();
	const { mutate: likePost } = useLikePost();
	const { mutate: savePost } = useSavePost();
	const { mutate: deleteSavePost } = useDeleteSavePost();

	useEffect(() => {
		const savedPostRecord = user?.save.find(
			(record: Models.Document) => record.post.$id === data.$id,
		);
		const likesList = data.likes.map((user: Models.Document) => user.$id);
		setIsSaved(!!savedPostRecord);
		setLikes(likesList);
	}, [user, data]);

	const likePostHandler = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (checkIsLiked(likes, userId ?? "")) {
			setLikes(
				produce((draft) => {
					const newLikes = draft.filter((item) => item !== userId);
					console.log("newLikes", newLikes);
					likePost({ postId: data.$id, likesArray: newLikes });
					draft = newLikes;
				}),
			);
		} else {
			setLikes(
				produce((draft) => {
					const newLikes = [...draft];
					newLikes.push(userId ?? "");
					likePost({ postId: data.$id, likesArray: newLikes });
					draft.push(userId ?? "");
				}),
			);
		}
	};

	const savePostHandler = () => {
		const savedRecord = user?.save?.find(
			(record: Models.Document) => record.post.$id === data.$id,
		);
		if (savedRecord) {
			deleteSavePost(savedRecord.$id);
		} else {
			savePost({ postId: data.$id, userId: userId ?? "" });
		}
	};

	return (
		<div className="flex justify-between items-center gap-x-5 z-20">
			<div className="flex gap-2">
				<img
					src={
						checkIsLiked(likes, userId ?? "")
							? "/assets/icons/liked.svg"
							: "/assets/icons/like.svg"
					}
					alt="heart"
					className="aspect-square w-5 cursor-pointer"
					onClick={likePostHandler}
				/>
				<span className="small-medium lg:base-medium">{likes.length}</span>
			</div>
			<div className=" flex gap-2">
				<img
					src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
					alt="heart"
					className="aspect-square w-5 cursor-pointer"
					onClick={savePostHandler}
				/>
			</div>
		</div>
	);
};

export default PostStats;

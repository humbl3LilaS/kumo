import { Skeleton } from "../ui/skeleton";
import ProfileSkeleton from "./ProfileSkeleton";

const PostSkeleton = () => {
	return (
		<div className="post-card">
			<div className="w-full mb-4 flex justify-between items-center">
				<ProfileSkeleton className="w-1/2" />
				<Skeleton className="aspect-square w-8 rounded-xl bg-neutral-200/15" />
			</div>
			<Skeleton className="w-full h-6 mb-4 bg-neutral-200/15 lg:h-8" />
			<Skeleton className="post-card_img bg-neutral-200/15" />
			<div className="w-full mt-4 flex justify-between items-center">
				<Skeleton className="aspect-square w-8 rounded-xl bg-neutral-200/15" />
				<Skeleton className="aspect-square w-8 rounded-xl bg-neutral-200/15" />
			</div>
		</div>
	);
};

export default PostSkeleton;

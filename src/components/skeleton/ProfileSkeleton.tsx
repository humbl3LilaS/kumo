import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type ProfileSkeletonProp = {
	className?: string;
	size?: "samll" | "large";
};

const ProfileSkeleton = ({ className, size }: ProfileSkeletonProp) => {
	return (
		<div className={cn("flex items-center justify-start gap-x-4", className)}>
			<Skeleton
				className={cn(
					"aspect-square w-20 bg-neutral-200/15 rounded-full",
					size === "large" && "lg:w-48",
				)}
			/>
			<div className="w-full flex flex-col gap-y-2">
				<Skeleton
					className={cn(
						" h-[20px] bg-neutral-200/15",
						size === "large" && "lg:min-w-60 lg:h-8",
					)}
				/>
				<Skeleton
					className={cn(
						" h-[20px] bg-neutral-200/15",
						size === "large" && "lg:min-w-60 lg:h-8",
					)}
				/>
			</div>
		</div>
	);
};

export default ProfileSkeleton;

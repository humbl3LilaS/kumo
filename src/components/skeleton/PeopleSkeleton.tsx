import { Skeleton } from "../ui/skeleton";

const PeopleSkeleton = () => {
	return (
		<Skeleton className="w-full p-10 rounded-xl lg:w-[310px] bg-neutral-200/15">
			<div className="flex flex-col items-center justify-center gap-y-2">
				<Skeleton className="aspect-square w-14 rounded-full bg-neutral-200/15 lg:w-20" />
				<Skeleton className="w-3/5 h-6 bg-neutral-200/15 lg:w-4/5 lg:h-8" />
				<Skeleton className="w-3/5 h-4 bg-neutral-200/15 lg:h-6" />
				<Skeleton className="w-24 h-8 bg-neutral-200/15 lg:w-36" />
			</div>
		</Skeleton>
	);
};

export default PeopleSkeleton;

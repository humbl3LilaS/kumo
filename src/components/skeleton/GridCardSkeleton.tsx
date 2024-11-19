import { Skeleton } from "../ui/skeleton";

const GridCardSkeleton = () => {
	return (
		<div className="grid-container">
			<Skeleton className="min-w-50 h-80 block rounded-3xl bg-neutral-200/15" />
			<Skeleton className="min-w-50 h-80 block rounded-3xl bg-neutral-200/15" />
			<Skeleton className="min-w-50 h-80 block rounded-3xl bg-neutral-200/15" />
		</div>
	);
};

export default GridCardSkeleton;

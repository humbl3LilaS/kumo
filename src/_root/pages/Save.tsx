import GridPostList from "@/components/shared/GridPostList";
import GridCardSkeleton from "@/components/skeleton/GridCardSkeleton";
import { useSavedPostByUserId, useUserQuery } from "@/lib/query/query";
import { Models } from "appwrite";

export const Save = () => {
	const { data: user } = useUserQuery();
	const { data: savedPost } = useSavedPostByUserId(user?.$id ?? "");
	const documents = savedPost
		?.map((item) => item.post)
		.filter((item) => item != null) as unknown as Models.Document[];
	return (
		<div className="py-10 px-5 flex flex-col flex-1 items-center overflow-scroll md:p-14 custom-scrollbar">
			<div className="w-full max-w-5xl flex flex-col items-center  gap-6 md:gap-9">
				<h2 className="w-full flex items-center gap-x-4  h3-bold md:h2-bold ">
					<img
						src="/assets/icons/save.svg"
						alt="save"
						className="aspect-square w-8"
					/>
					<span>Saved Post</span>
				</h2>
				<div className="w-full max-w-5xl flex flex-wrap gap-9">
					{documents ? (
						<GridPostList posts={documents} />
					) : (
						<GridCardSkeleton />
					)}
					{documents.length === 0 && (
						<div className="w-full h-40 flex justify-center items-center bg-dark-3 rounded-3xl lg:h-60">
							<p className="text-lg font-bold text-white">No saved post yet</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Save;

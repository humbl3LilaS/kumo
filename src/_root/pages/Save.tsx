import GridPostList from "@/components/shared/GridPostList";
import { useSavedPostByUserId, useUserQuery } from "@/lib/query/query";
import { Models } from "appwrite";

export const Save = () => {
	const { data: user } = useUserQuery();
	const { data: savedPost } = useSavedPostByUserId(user?.$id ?? "");
	const documents = savedPost?.documents
		.map((item) => item.post)
		.filter((item) => item != null) as unknown as Models.Document[];
	return (
		<div className="py-10 px-5 flex flex-col flex-1 items-center overflow-scroll md:p-14 custom-scrollbar">
			<div className="w-full max-w-5xl flex flex-col items-center  gap-6 md:gap-9">
				<h2 className="w-full h3-bold md:h2-bold ">Saved Post</h2>
				<div className="w-full max-w-5xl flex flex-wrap gap-9">
					{documents && <GridPostList posts={documents} />}
				</div>
			</div>
		</div>
	);
};

export default Save;

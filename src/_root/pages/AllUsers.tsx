import UserCard from "@/components/shared/UserCard";
import { useGetAllUser, useUserQuery } from "@/lib/query/query";

const AllUsers = () => {
	const { data: currentUser } = useUserQuery();
	const { data: users } = useGetAllUser(currentUser?.$id);

	return (
		<div className="py-10 px-5 flex flex-col flex-1 items-center overflow-scroll md:p-14 custom-scrollbar">
			<div className="w-full max-w-5xl flex flex-col items-center  gap-6 md:gap-9">
				<h2 className="w-full h3-bold md:h2-bold ">Nearby Users</h2>
				<div className="w-full max-w-5xl flex flex-wrap gap-9">
					{users &&
						users.documents.map((item) => (
							<UserCard
								user={item}
								key={item.$id}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default AllUsers;

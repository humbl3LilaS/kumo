import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const UserCard = ({ user }: { user: Models.Document }) => {
	return (
		<Link
			to={`/profile/${user.$id}`}
			className="max-w-[320px] h-[280px] p-10 flex-1 bg-dark-4 rounded-xl">
			<div className="flex flex-col items-center justify-center gap-y-2">
				<img
					src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
					alt="creator"
					className="aspect-square w-14 rounded-full"
				/>
				<p className="font-bold text-center">{user.name}</p>
				<p className="font-thin text-center text-xs text-off-white">
					@{user.username}
				</p>
				{/* //Todo: add follow functionality later */}
				<Button className="mt-4 bg-primary-500 font-extrabold">Follow</Button>
			</div>
		</Link>
	);
};

export default UserCard;

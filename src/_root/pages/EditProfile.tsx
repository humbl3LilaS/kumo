import ProfileForm from "@/components/form/ProfileForm";
import { useGetUserById } from "@/lib/query/query";
import { useParams } from "react-router-dom";

const EditProfile = () => {
	const { userId } = useParams();
	const { data: user } = useGetUserById(userId ?? "");
	return (
		<div className="py-10 px-5 flex flex-col flex-1 items-center overflow-scroll md:p-14 custom-scrollbar">
			<div className="w-full max-w-5xl flex flex-col items-center gap-6 md:gap-9">
				<h2 className="w-full flex items-center gap-x-4 h3-bold md:h2-bold ">
					<img
						src="/assets/icons/edit.svg"
						alt="save"
						className="aspect-square w-8"
					/>
					<span>Edit Profile</span>
				</h2>
			</div>
			{user && <ProfileForm data={user} />}
		</div>
	);
};

export default EditProfile;

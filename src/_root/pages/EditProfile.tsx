import { useParams } from "react-router-dom";

const EditProfile = () => {
	const { userId } = useParams();

	return <div>Edit profile for user {userId}</div>;
};

export default EditProfile;

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

type ProfileUploaderProp = {
	mediaId?: string;
	mediaUrl?: string;
	onChange: (files: File[]) => void;
};

const ProfileUploader = ({
	mediaId,
	mediaUrl,
	onChange,
}: ProfileUploaderProp) => {
	const [, setFile] = useState<File[]>([]);
	const [fileUrl, setFileUrl] = useState(mediaUrl);

	const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(Array.from(e.target.files));
			onChange(Array.from(e.target.files));
			setFileUrl(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<div className="flex  justify-start items-center gap-x-4">
			<img
				src={fileUrl}
				className="aspect-square w-20 rounded-full"
			/>
			{mediaId ? (
				<Label
					className=""
					htmlFor="file">
					Change Profile
				</Label>
			) : (
				<Label
					className="px-4 py-3 bg-blue-400 rounded-lg text-xs font-bold lg:text-base"
					htmlFor="file">
					Upload Profile
				</Label>
			)}
			<Input
				type="file"
				id="file"
				accept=".png, .svg, .jpg"
				className="hidden"
				onChange={fileUploadHandler}
			/>
		</div>
	);
};

export default ProfileUploader;

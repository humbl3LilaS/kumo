import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FileUploaderProp = {
	mediaUrl?: string;
	onChange: (files: File[]) => void;
};

const FileUploader = ({ mediaUrl, onChange }: FileUploaderProp) => {
	const [file, setFile] = useState<File[]>([]);
	const [fileUrl, setFileUrl] = useState(mediaUrl);

	const onDrop = useCallback(
		(acceptedFile: FileWithPath[]) => {
			setFile(acceptedFile);
			onChange(acceptedFile);
			setFileUrl(URL.createObjectURL(acceptedFile[0]));
		},
		[file],
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
	});

	return (
		<div
			{...getRootProps()}
			className="flex flex-center flex-col rounded-3xl cursor-pointer bg-dark-3">
			<Input
				{...getInputProps()}
				className="cursor-pointer"
			/>
			{fileUrl ? (
				<>
					<div className="w-full p-5 flex flex-1 justify-center lg:p-10">
						<img
							src={fileUrl}
							alt="image"
							className="file_uploader-img"
						/>
					</div>
					<p className="file_uploader-label">Click or drag photo to replace</p>
				</>
			) : (
				<div className="file_uploader-box">
					<img
						src="/assets/icons/file-upload.svg"
						alt="file upload"
						width={96}
						height={77}
					/>
					<h3 className="mb-2 mt-6 base-medium">Drag photo here</h3>
					<p className="mb-6 small-regular text-light-4">SVG, PNG, JPEG</p>
					<Button
						className="shad-button_dark_4"
						type="button">
						Select from computer
					</Button>
				</div>
			)}
		</div>
	);
};

export default FileUploader;

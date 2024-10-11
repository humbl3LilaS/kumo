import { ProfileFormSchema, ProfileFormSchemaType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const ProfileForm = ({ data }: { data: Models.Document }) => {
	const navigate = useNavigate();
	const form = useForm<ProfileFormSchemaType>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: {
			name: data ? data.name : "",
			userName: data ? data.username : "",
			email: data ? data.email : "",
			bio: data && (data.bio ?? ""),
		},
	});

	const onSubmit: SubmitHandler<ProfileFormSchemaType> = (value) => {
		console.log(value);
		navigate(`/profile/${data.$id}`);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-8 w-full max-w-5xl flex flex-col">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel className="px-2 mb-3 font-bold text-lg">
								Name:
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Name..."
									className="shad-input custom-scrollbar"
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_textmessage" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel className="px-2 mb-3 font-bold text-lg">
								Username:
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Username..."
									className="shad-input custom-scrollbar"
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_textmessage" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel className="px-2 mb-3 font-bold text-lg">
								Email:
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Email..."
									className="shad-input custom-scrollbar"
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_textmessage" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel className="px-2 mb-3 font-bold text-lg">
								Bio:
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell them more about you..."
									className="shad-textarea custom-scrollbar"
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_textmessage" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-[6rem] ml-auto shad-button_dark_4 !bg-primary-500 whitespace-nowrap md:w-[8rem]"
					disabled={form.formState.isSubmitting || !form.formState.isValid}>
					{form.formState.isSubmitting ? (
						<span className="w-full flex items-center gap-x-2">
							<img
								src="/assets/icons/loader.svg"
								alt="loading"
								className="aspect-square w-5"
							/>
							<span>Submitting</span>
						</span>
					) : (
						<span>Submit</span>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default ProfileForm;

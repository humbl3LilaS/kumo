import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFromSchemaType, SignupFormSchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
	useCreateUserAccountMutation,
	useSignInAccountMutation,
} from "@/lib/query/mutation";

const SignupForm = () => {
	const form = useForm<SignupFromSchemaType>({
		resolver: zodResolver(SignupFormSchema),
	});

	const navigate = useNavigate();
	const { mutateAsync: createUserAccount } = useCreateUserAccountMutation();

	const { mutateAsync: signInAccount } = useSignInAccountMutation();

	const { toast } = useToast();

	const onSubmit: SubmitHandler<SignupFromSchemaType> = async (value) => {
		const newUser = await createUserAccount(value);
		if (!newUser) {
			return toast({ title: "Sign up failed, Please Try again" });
		}

		const session = await signInAccount({
			email: value.email,
			password: value.password,
		});

		if (!session) {
			return toast({ title: "Sign up failed, Please Try again" });
		} else {
			navigate("/");
		}
	};

	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<Logo />
				<h2 className="pt-5 h3-bold sm:pt-12 md:h2-bold">
					Create a new account
				</h2>
				<p className="small-medium text-light-3 md:base-regular md:mt-2">
					To use Kumo enter your account details
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full mt-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel className="font-bold tracking-wide">Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Name..."
										className="shad-input"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="userName"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel className="font-bold tracking-wide">
									Username
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Username..."
										className="shad-input"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel className="font-bold tracking-wide">Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Email..."
										className="shad-input"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="mb-4 md:mb-6">
								<FormLabel className="font-bold tracking-wide">
									Password
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Password..."
										{...field}
										className="shad-input"
										type="text"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="shad-button_primary"
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
							<span>Sign Up</span>
						)}
					</Button>
					<p className="mt-2 tex-small-regular text-center text-light-2 md:mt-4">
						<span>Already have an account?</span>
						<Link
							to={"/auth/sign-in"}
							className="ml-2 text-primary-500 text-small-semibold">
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignupForm;

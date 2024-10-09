import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormSchema, SinginFromSchemaType } from "@/lib/validation";
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
import { useUserStore } from "@/lib/store/userStore";
import { useSignInAccountMutation } from "@/lib/query/mutation";

const SigninForm = () => {
	const form = useForm<SinginFromSchemaType>({
		resolver: zodResolver(SigninFormSchema),
	});
	const { mutateAsync: signInAccount } = useSignInAccountMutation();
	const { toast } = useToast();

	const navigate = useNavigate();

	const checkIsAuthenticated = useUserStore(
		(state) => state.checkIsAuthenticated,
	);

	const onSubmit: SubmitHandler<SinginFromSchemaType> = async (value) => {
		const session = await signInAccount(value);

		if (!session) {
			toast({ title: "Login Failed. Please try again." });
		}

		const isLoggedIn = await checkIsAuthenticated();

		if (isLoggedIn) {
			form.reset();
			navigate("/");
		} else {
			toast({ title: "Login Failed. Please try again." });
			return;
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
					Welcome back! Please enter your account details
				</p>
				<form
					className="w-full mt-4"
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="mb-4">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Email....."
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
							<FormItem className="mb-4">
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Password....."
										{...field}
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
							<span>Sign In</span>
						)}
					</Button>

					<p className="mt-2 tex-small-regular text-center text-light-2 md:mt-4">
						<span>Don't have an account?</span>
						<Link
							to={"/auth/sign-up"}
							className="ml-2 text-primary-500 text-small-semibold">
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SigninForm;

import z from "zod";

const passwordSchema = z
	.string({ message: "Password is required" })
	.min(8, { message: "Password must be at least 8 characters long" })
	.regex(/[A-Z]/, {
		message: "Password must contain at least one uppercase letter",
	})
	.regex(/[a-z]/, {
		message: "Password must contain at least one lowercase letter",
	})
	.regex(/\d/, { message: "Password must contain at least one digit" })
	.regex(/[!@#$%^&*(),.?":{}|<>]/, {
		message: "Password must contain at least one special character",
	});

export const SignupFormSchema = z.object({
	name: z
		.string({ message: "name is required" })
		.min(2, { message: "name must be at least 2 characters." })
		.max(30, { message: "name must be at most 30 characters." }),
	userName: z
		.string({ message: "Username is required" })
		.min(2, { message: "Username must be at least 2 characters." })
		.max(30, { message: "Username must be at most 30 characters." }),
	email: z
		.string({ message: "email is required" })
		.email({ message: "invalid email" }),
	password: passwordSchema,
});

export type SignupFromSchemaType = Zod.infer<typeof SignupFormSchema>;

export const SigninFormSchema = z.object({
	email: z.string().email(),
});

export type SinginFromSchemaType = Zod.infer<typeof SigninFormSchema>;

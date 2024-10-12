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
	email: z.string({ message: "email is required" }).email(),
	password: z.string({ message: "password is required" }),
});

export type SinginFromSchemaType = Zod.infer<typeof SigninFormSchema>;

export const PostFormSchema = z.object({
	caption: z
		.string({ message: "Caption cannot be empty" })
		.min(1, { message: "Invalid caption" })
		.max(200, { message: "Caption too long" }),
	file: z.custom<File[]>(),
	location: z.string().optional(),
	tags: z.string().optional(),
});

export type PostFromSchemaType = Zod.infer<typeof PostFormSchema>;

export const ProfileFormSchema = z.object({
	profile: z.custom<File[]>().optional(),
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
	bio: z.string().optional(),
});

export type ProfileFormSchemaType = Zod.infer<typeof ProfileFormSchema>;

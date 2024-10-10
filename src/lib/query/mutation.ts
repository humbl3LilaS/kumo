import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createPost,
	createUserAccount,
	signInAccount,
	signOut,
} from "../appwrite/api";
import { SignInInfo, TPost, TUserSignUpInfo } from "../appwrite/api.types";

export const useCreateUserAccountMutation = () => {
	return useMutation({
		mutationFn: (user: TUserSignUpInfo) => createUserAccount(user),
	});
};

export const useSignInAccountMutation = () => {
	return useMutation({
		mutationFn: (user: SignInInfo) => signInAccount(user),
	});
};

export const useSignOutAccountMutation = () => {
	return useMutation({
		mutationFn: signOut,
	});
};

export const useCreatePostMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: TPost) => createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["recent-posts"],
			});
		},
	});
};

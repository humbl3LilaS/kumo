import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createPost,
	createUserAccount,
	deleteSavePost,
	likePost,
	savePost,
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

export const useLikePost = () => {
	const queryClinet = useQueryClient();

	return useMutation({
		mutationFn: ({
			postId,
			likesArray,
		}: {
			postId: string;
			likesArray: string[];
		}) => likePost(postId, likesArray),
		onSuccess: () => {
			queryClinet.invalidateQueries({
				queryKey: ["recent-posts"],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClinet = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
			savePost(postId, userId),
		onSuccess: () => {
			queryClinet.invalidateQueries({
				queryKey: ["user"],
			});
			queryClinet.invalidateQueries({
				queryKey: ["recent-posts"],
			});
		},
	});
};

export const useDeleteSavePost = () => {
	const queryClinet = useQueryClient();

	return useMutation({
		mutationFn: (saveRecordId: string) => deleteSavePost(saveRecordId),
		onSuccess: () => {
			queryClinet.invalidateQueries({
				queryKey: ["user"],
			});
			queryClinet.invalidateQueries({
				queryKey: ["recent-posts"],
			});
		},
	});
};

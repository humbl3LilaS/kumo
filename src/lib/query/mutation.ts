import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createPost,
	createUserAccount,
	deletePost,
	deleteSavePost,
	likePost,
	savePost,
	signInAccount,
	signOut,
	updatePost,
} from "../appwrite/api";
import {
	SignInInfo,
	TPost,
	TUpdatePost,
	TUserSignUpInfo,
} from "../appwrite/api.types";

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
		mutationFn: async (post: TPost) => createPost(post),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
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
			queryClinet.invalidateQueries({
				queryKey: ["user"],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClinet = useQueryClient();

	return useMutation({
		mutationFn: async ({
			postId,
			userId,
		}: {
			postId: string;
			userId: string;
		}) => savePost(postId, userId),
		onSuccess: async () => {
			await queryClinet.invalidateQueries({
				queryKey: ["user"],
			});
			await queryClinet.invalidateQueries({
				queryKey: ["recent-posts"],
			});
		},
	});
};

export const useDeleteSavePost = () => {
	const queryClinet = useQueryClient();

	return useMutation({
		mutationFn: (saveRecordId: string) => deleteSavePost(saveRecordId),
		onSuccess: async () => {
			await queryClinet.invalidateQueries({
				queryKey: ["user"],
			});
			await queryClinet.invalidateQueries({
				queryKey: ["recent-posts"],
			});
		},
	});
};

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (post: TUpdatePost) => updatePost(post),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({
				queryKey: ["recent-posts", data?.$id],
			});
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
			deletePost(postId, imageId),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({
				queryKey: ["recent-posts"],
			});
			await queryClient.removeQueries({
				queryKey: ["recept-posts", data?.postId],
				exact: true,
			});
		},
	});
};

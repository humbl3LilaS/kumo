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
	updateUserInfo,
} from "../appwrite/api";
import {
	SignInInfo,
	TPost,
	TUpdatePost,
	TUserInfo,
	TUserSignUpInfo,
} from "../appwrite/api.types";

export const useCreateUserAccountMutation = () => {
	return useMutation({
		mutationFn: (user: TUserSignUpInfo) => createUserAccount(user),
	});
};

export const useSignInAccountMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (user: SignInInfo) => signInAccount(user),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
	});
};

export const useSignOutAccountMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: signOut,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
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
		onSuccess: async () => {
			await queryClinet.invalidateQueries({
				queryKey: ["recent-posts"],
			});
			await queryClinet.invalidateQueries({
				queryKey: ["user"],
			});
			await queryClinet.invalidateQueries({
				queryKey: ["infinite-posts"],
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
			await queryClinet.invalidateQueries({
				queryKey: ["saved-posts"],
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
			await queryClinet.invalidateQueries({
				queryKey: ["saved-posts"],
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

export const useUpdateUserInfo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: TUserInfo) => updateUserInfo(payload),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({
				queryKey: ["user", data?.$id],
			});
			await queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
	});
};

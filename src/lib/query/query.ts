import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
	getAllUsers,
	getCurrentUser,
	getInfinitePosts,
	getPostById,
	getRecentPost,
	getSavedPost,
	searchPost,
} from "../appwrite/api";

export const useUserQuery = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
		staleTime: 24 * 60 * 1000,
	});
};

export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: ["recent-posts"],
		queryFn: getRecentPost,
		staleTime: 24 * 60 * 1000,
	});
};

export const useGetPostById = (id: string) => {
	return useQuery({
		queryKey: ["recent-posts", id],
		queryFn: () => getPostById(id),
		enabled: !!id,
	});
};

export const useGetPosts = () => {
	return useInfiniteQuery({
		queryKey: ["infinite-posts"],
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		queryFn: getInfinitePosts as unknown as any,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getNextPageParam: (lastPage: any) => {
			// If there's no data, there are no more pages.
			if (lastPage && lastPage.documents.length === 0) {
				return null;
			}

			// Use the $id of the last document as the cursor.
			const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;
			return lastId;
		},
		initialPageParam: "",
		staleTime: 24 * 60 * 1000,
	});
};

export const useSearchPost = (searchTerm: string) => {
	return useQuery({
		queryKey: ["searched-posts"],
		queryFn: () => searchPost({ searchTerm }),
		enabled: !!searchTerm,
	});
};

export const useSavedPostByUserId = (userId: string) => {
	return useQuery({
		queryKey: ["saved-posts"],
		queryFn: () => getSavedPost({ userId }),
		enabled: !!userId,
		staleTime: 24 * 60 * 1000,
	});
};

export const useGetAllUser = (currnetUserId: string | undefined) => {
	return useQuery({
		queryKey: ["all-user"],
		queryFn: () => getAllUsers(currnetUserId),
		staleTime: 24 * 60 * 1000,
	});
};

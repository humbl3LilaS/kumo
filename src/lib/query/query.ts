import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getPostById, getRecentPost } from "../appwrite/api";

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

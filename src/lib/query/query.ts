import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getRecentPost } from "../appwrite/api";

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

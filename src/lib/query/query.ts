import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../appwrite/api";

export const useUserQuery = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
		staleTime: 24 * 60 * 1000,
	});
};

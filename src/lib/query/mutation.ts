import { useMutation } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../appwrite/api";
import { SignInInfo, TUserSignUpInfo } from "../appwrite/api.types";

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

import { ID, Query } from "appwrite";
import { SignInInfo, TUserSignUpInfo } from "./api.types";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: TUserSignUpInfo) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			user.name,
		);

		if (!newAccount) throw new Error();

		const avatarUrl = avatars.getInitials(user.name);

		const newUser = await saveUser({
			accountId: newAccount.$id,
			email: newAccount.email,
			name: newAccount.name,
			username: user.userName,
			imageUrl: avatarUrl,
		});

		return newUser;
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function saveUser(user: {
	accountId: string;
	email: string;
	name: string;
	imageUrl: string;
	username?: string;
}) {
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaeId,
			appwriteConfig.usersCollectionId,
			ID.unique(),
			user,
		);
		return newUser;
	} catch (error) {
		console.log(error);
	}
}

export async function signInAccount(user: SignInInfo) {
	try {
		await account.deleteSession("current");

		const session = await account.createEmailPasswordSession(
			user.email,
			user.password,
		);
		return session;
	} catch (error) {
		console.log("sign in failed at signInAccount", error);
	}
}
export async function getCurrentUser() {
	try {
		const currentAccount = await account.get();

		if (!createUserAccount) {
			throw new Error();
		}

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaeId,
			appwriteConfig.usersCollectionId,
			[Query.equal("accountId", currentAccount.$id)],
		);

		if (!currentUser) {
			throw new Error();
		}

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
	}
}

import { ID } from "appwrite";
import { TUser } from "./api.types";
import { account } from "./config";

export async function createUserAccount(user: TUser) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.name,
			user.password,
		);

		return newAccount;
	} catch (error) {
		console.log(error);
		return error;
	}
}

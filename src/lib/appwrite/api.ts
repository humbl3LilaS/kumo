import { ID, ImageGravity, Query } from "appwrite";
import { SignInInfo, TPost, TUserSignUpInfo } from "./api.types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

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

		if (!currentAccount) {
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

export async function signOut() {
	try {
		await account.deleteSession("current");
	} catch (error) {
		console.log(error);
	}
}

export async function uploadFile(file: File) {
	try {
		const uploadedFile = await storage.createFile(
			appwriteConfig.storageId,
			ID.unique(),
			file,
		);
		return uploadedFile;
	} catch (error) {
		console.log(error);
	}
}

export async function deleteFile(fileId: string) {
	try {
		await storage.deleteFile(appwriteConfig.storageId, fileId);
	} catch (error) {
		console.log("error in deleteFile", error);
	}
}

export function getFileUrl(fileId: string) {
	try {
		const fileUrl = storage.getFilePreview(
			appwriteConfig.storageId,
			fileId,
			2000,
			2000,
			"top" as ImageGravity,
			100,
		);

		if (!fileUrl) {
			throw new Error();
		}
		return fileUrl;
	} catch (error) {
		console.log(error);
	}
}

export async function createPost(post: TPost) {
	try {
		const uploadedFile = await uploadFile(post.file[0]);

		if (!uploadedFile) {
			throw new Error();
		}

		const fileUrl = getFileUrl(uploadedFile.$id);

		const tags =
			post.tags === ""
				? []
				: post.tags === "" || post.tags?.replace(/ /g, "").split(",") || [];

		const newPost = await databases.createDocument(
			appwriteConfig.databaeId,
			appwriteConfig.postsCollectionId,
			ID.unique(),
			{
				creator: post.userId,
				caption: post.caption,
				imageUrl: fileUrl,
				imageId: uploadedFile.$id,
				location: post.location,
				tags: tags,
			},
		);

		if (!newPost) {
			await deleteFile(uploadedFile.$id);
			throw Error;
		}

		return newPost;
	} catch (error) {
		console.log("error in createPost", error);
	}
}

export async function getRecentPost() {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaeId,
			appwriteConfig.postsCollectionId,
			[Query.orderDesc("$createdAt"), Query.limit(20)],
		);

		if (!posts) {
			throw new Error();
		}

		return posts;
	} catch (error) {
		console.log("error at getRecentPost", error);
	}
}

export async function likePost(postId: string, likesArray: string[]) {
	try {
		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaeId,
			appwriteConfig.postsCollectionId,
			postId,
			{
				likes: likesArray,
			},
		);
		if (!updatedPost) {
			throw new Error();
		}

		return updatedPost;
	} catch (error) {
		console.log("error at likePost", error);
	}
}

export async function savePost(postId: string, userId: string) {
	try {
		const savedPost = await databases.createDocument(
			appwriteConfig.databaeId,
			appwriteConfig.savesCollectionId,
			ID.unique(),
			{
				user: userId,
				post: postId,
			},
		);
		if (!savedPost) {
			throw new Error();
		}

		return savedPost;
	} catch (error) {
		console.log("error at likePost", error);
	}
}

export async function deleteSavePost(savedRecordId: string) {
	try {
		const statusCode = await databases.deleteDocument(
			appwriteConfig.databaeId,
			appwriteConfig.savesCollectionId,
			savedRecordId,
		);
		if (!statusCode) {
			throw new Error();
		}

		return { status: "ok" };
	} catch (error) {
		console.log("error at likePost", error);
	}
}

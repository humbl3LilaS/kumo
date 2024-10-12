import { ID, ImageGravity, Query } from "appwrite";
import {
	SignInInfo,
	TPost,
	TUpdatePost,
	TUserInfo,
	TUserSignUpInfo,
} from "./api.types";
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
		const currentAccount = await account.get();
		if (currentAccount) {
			await account.deleteSession("current");
		}
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
		await account.deleteSessions();
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

export async function updatePost(post: TUpdatePost) {
	const hasFileToUpdate = post.file.length > 0;

	try {
		let image = {
			imageUrl: post.imageUrl,
			imageId: post.imageId,
		};

		if (hasFileToUpdate) {
			// Upload new file to appwrite storage
			const uploadedFile = await uploadFile(post.file[0]);
			if (!uploadedFile) throw Error;

			// Get new file url
			const fileUrl = getFileUrl(uploadedFile.$id);
			if (!fileUrl) {
				await deleteFile(uploadedFile.$id);
				throw Error;
			}

			image = {
				...image,
				imageUrl: fileUrl as unknown as URL,
				imageId: uploadedFile.$id,
			};
		}

		// Convert tags into array
		const tags = post.tags?.replace(/ /g, "").split(",") || [];

		//  Update post
		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaeId,
			appwriteConfig.postsCollectionId,
			post.postId,
			{
				caption: post.caption,
				imageUrl: image.imageUrl,
				imageId: image.imageId,
				location: post.location,
				tags: tags,
			},
		);

		// Failed to update
		if (!updatedPost) {
			// Delete new file that has been recently uploaded
			if (hasFileToUpdate) {
				await deleteFile(image.imageId);
			}

			// If no new file uploaded, just throw error
			throw Error;
		}

		// Safely delete old file after successful update
		if (hasFileToUpdate) {
			await deleteFile(post.imageId);
		}

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
}

export async function deletePost(postId?: string, imageId?: string) {
	if (!postId || !imageId) return;

	try {
		const statusCode = await databases.deleteDocument(
			appwriteConfig.databaeId,
			appwriteConfig.postsCollectionId,
			postId,
		);

		if (!statusCode) throw Error;

		await deleteFile(imageId);

		return { status: "Ok", postId: postId };
	} catch (error) {
		console.log(error);
	}
}

export async function getPostById(postId?: string) {
	if (!postId) throw Error;

	try {
		const post = await databases.getDocument(
			appwriteConfig.databaeId,
			appwriteConfig.postsCollectionId,
			postId,
		);

		if (!post) throw Error;

		return post;
	} catch (error) {
		console.log(error);
	}
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
	const queries = [Query.orderDesc("$updatedAt"), Query.limit(10)];
	if (pageParam) {
		queries.push(Query.cursorAfter(pageParam.toString()));
	}

	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaeId,
			appwriteConfig.postsCollectionId,
			queries,
		);

		if (!posts) {
			throw new Error();
		}

		return posts;
	} catch (error) {
		console.log(error);
	}
}

export async function searchPost({ searchTerm }: { searchTerm: string }) {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaeId,
			appwriteConfig.postsCollectionId,
			[Query.search("caption", searchTerm)],
		);

		if (!posts) {
			throw new Error();
		}

		return posts;
	} catch (error) {
		console.log(error);
	}
}

export async function getSavedPost({ userId }: { userId: string }) {
	console.log("userId", userId);
	try {
		const savedPost = await databases.listDocuments(
			appwriteConfig.databaeId,
			appwriteConfig.savesCollectionId,
			[Query.equal("user", userId)],
		);
		if (!savedPost) {
			throw new Error();
		}
		return savedPost.documents;
	} catch (error) {
		console.log("error occour at getSavedPost", error);
	}
}

export async function getAllUsers(currentUserId: string | undefined) {
	try {
		if (!currentUserId) {
			return;
		}

		const users = await databases.listDocuments(
			appwriteConfig.databaeId,
			appwriteConfig.usersCollectionId,
			[Query.notEqual("$id", currentUserId)],
		);
		if (!users) {
			throw new Error();
		}
		return users;
	} catch (error) {
		console.log("error occour at getAllUser", error);
	}
}

export async function getUserById(userId: string) {
	console.log(userId);

	try {
		const user = await databases.listDocuments(
			appwriteConfig.databaeId,
			appwriteConfig.usersCollectionId,
			[Query.equal("$id", userId)],
		);
		if (!user) {
			throw new Error();
		}
		console.log("user in api", user);
		return user.documents[0];
	} catch (error) {
		console.log("error occour at getUserById", error);
	}
}

export async function updateUserInfo({
	id,
	name,
	username,
	email,
	bio,
}: TUserInfo) {
	try {
		const updatedUserInfo = databases.updateDocument(
			appwriteConfig.databaeId,
			appwriteConfig.usersCollectionId,
			id,
			{
				name,
				username,
				email,
				bio,
			},
		);
		if (!updateUserInfo) {
			throw new Error();
		}

		console.log(updatedUserInfo);
		return updatedUserInfo;
	} catch (error) {
		console.log("Error occour in updateUserInfo", error);
	}
}

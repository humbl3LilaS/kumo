import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getCurrentUser } from "../appwrite/api";

export interface TUserInfo {
	id: string;
	name: string;
	username?: string;
	email: string;
	imageUrl: string;
	bio?: string;
}

type Store = {
	user: TUserInfo | null;
	isAuthenticated: boolean;
};

type Action = {
	setUser: (payload: TUserInfo) => void;
	setIsAuthenticated: (payload: boolean) => void;
	loadUserFromSession: () => Promise<boolean>;
};

type UserStore = Store & Action;

export const useUserStore = create<UserStore>()(
	immer((set) => ({
		user: null,
		isAuthenticated: false,
		setUser: (payload) =>
			set((state) => {
				state.user = payload;
			}),
		setIsAuthenticated: (payload) =>
			set((state) => {
				state.isAuthenticated = payload;
			}),
		loadUserFromSession: async () => {
			try {
				const currentAccount = await getCurrentUser();
				if (currentAccount) {
					set((state) => {
						state.setUser({
							id: currentAccount.$id,
							name: currentAccount?.name,
							username: currentAccount?.username,
							email: currentAccount?.email,
							imageUrl: currentAccount?.imageUrl,
							bio: currentAccount?.bio,
						});
						state.isAuthenticated = true;
					});
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	})),
);

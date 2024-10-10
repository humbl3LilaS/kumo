export interface TUserSignUpInfo {
	userName: string;
	name: string;
	email: string;
	password: string;
}

export interface SignInInfo {
	email: string;
	password: string;
}

export interface TPost {
	userId: string;
	caption: string;
	file: File[];
	location?: string;
	tags?: string;
}

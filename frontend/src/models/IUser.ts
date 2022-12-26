export interface IUser {
	id: string;
	name: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	zoomApp: boolean;
	personals: number;
	groups: number;
	image: string;
	imageId: string;
	cover: string;
	about: string;
	city: string;
	country: string;
	phoneNumber: string;
	personalList: string[];
	groupList: string[];
	roles?: any;
	activationLink: boolean;
}

// dto - data transfer object
export default class UserDto {
	id: any;
	name: any;
	lastName: any;
	email: any;
	emailVerified: any;
	zoomApp: any;
	personals: any;
	groups: any;
	image: any;
	imageId: any;
	personalList: any;
	groupList: any;
	cover: any;
	about: any;
	city: any;
	country: any;
	phoneNumber: any;
	roles: any;
	activationLink: boolean;
	constructor(model: {
		_id: any;
		name: any;
		last_name: any;
		email: any;
		avatar: { image: any; image_id: any };
		activation_link: any;
		email_verified: any;
		zoom_app: any;
		quantity_personals: any;
		quantity_groups: any;
		cover: any;
		about: any;
		address: { country: any; city: any };
		phone_number: any;
		personal_list: any;
		group_list: any;
		roles: any;
	}) {
		this.id = model._id;
		this.name = model.name;
		this.lastName = model.last_name;
		this.email = model.email;
		this.image = model.avatar.image;
		this.imageId = model.avatar.image_id;
		this.activationLink = model.activation_link ? true : false;
		this.emailVerified = model.email_verified;
		this.zoomApp = model.zoom_app;
		this.personals = model.quantity_personals;
		this.groups = model.quantity_groups;
		this.cover = model.cover;
		this.about = model.about;
		this.country = model.address.country;
		this.city = model.address.city;
		this.phoneNumber = model.phone_number;
		this.personalList = model.personal_list;
		this.groupList = model.group_list;
		this.roles = model.roles;
	}
}

// dto - data transfer object
export default class MessageDto {
	id: any;
	read: any;
	subject: any;
	message: any;
	response: any;
	createdAt: any;

	constructor(model: {
		_id: any;
		read: any;
		subject: any;
		message: any;
		response: any;
		createdAt: any;
	}) {
		this.id = model._id;
		this.read = model.read;
		this.subject = model.subject;
		this.message = model.message;
		this.response = model.response;
		this.createdAt = model.createdAt;
	}
}

export interface IMessage {
	_id: string;
	user: string;
	request_from: string;
	subject: string;
	message: string;
	response: string;
	isAnswered: boolean;
	createdAt: Date;
}

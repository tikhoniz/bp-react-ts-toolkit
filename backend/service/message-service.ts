// error
import ApiError from "../exceptions/api-error";
// models
import MessageModel from "../models/message-model";
// DTO
import MessageDto from "./dtos/message-dto";

class MessageService {
	async create(data: any) {
		const msg = await MessageModel.create({ ...data });

		if (!msg) {
			throw ApiError.BadRequest(`Не удалось создать сообщение`);
		}

		const messageDto = new MessageDto(msg);

		return messageDto;
	}

	async update(messageId: any, answer: any) {
		const updMsg = await MessageModel.findOneAndUpdate(
			{ _id: messageId },
			{ response: answer, updatedAt: new Date() },
			{
				new: true,
			}
		);

		if (!updMsg) {
			throw ApiError.BadRequest(
				`Не удалось создать ответ на сообщение пользователя`
			);
		}
		return updMsg;
	}

	async getUserMessages(email: any) {
		const data = await MessageModel.find({
			user_email: email,
		});

		if (!data) {
			throw ApiError.BadRequest(`Не удалось получить список сообщений`);
		}

		const messages = data.map((msg) => {
			return new MessageDto(msg);
		});

		return messages;
	}

	async getMessages() {
		const messages = await MessageModel.find({}).sort({ createdAt: -1 });

		if (!messages) {
			throw ApiError.BadRequest(`Не удалось получить список сообщений`);
		}

		return messages;
	}
}

export default new MessageService();

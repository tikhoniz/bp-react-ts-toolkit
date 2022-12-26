import ApiError from "../exceptions/api-error";
// service
import messageService from "../service/message-service";

class MessageController {
	//* @desc  Создать сообщение пользователя
	//* @route  POST /api/events/create
	//* @access  Private/Admin
	async createMessage(req: any, res: any, next: any) {
		try {
			//const errors = validationResult(req);

			//if (!errors.isEmpty()) {
			//	return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
			//}

			//const { subject, message, user, request } = req.body;

			const data = await messageService.create(req.body);

			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async replyToMessage(req: any, res: any, next: any) {
		const messageId = req.params.id;
		try {
			//const errors = validationResult(req);

			//if (!errors.isEmpty()) {
			//	return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
			//}

			const { answer } = req.body;

			const data = await messageService.update(messageId, answer);

			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async getUserMessages(req: any, res: any, next: any) {
		try {
			const messages = await messageService.getUserMessages(req.params.email);

			res.json(messages);
		} catch (error) {
			next(error);
		}
	}

	async getAllMessages(req: any, res: any, next: any) {
		try {
			const messages = await messageService.getMessages();

			res.json(messages);
		} catch (error) {
			next(error);
		}
	}
}

export default new MessageController();

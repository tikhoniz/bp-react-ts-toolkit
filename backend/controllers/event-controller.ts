import { validationResult } from "express-validator";
// error
import ApiError from "../exceptions/api-error";
// service
import eventService from "../service/event-service";

class EventController {
	//* @desc  Создать событие календаря
	//* @route  POST /api/events/create
	//* @access  Private/Admin
	async create(req: any, res: any, next: any) {
		try {
			const errors = validationResult(req);

			//if (!errors.isEmpty()) {
			//	return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
			//}

			const event = await eventService.create(req.body);

			res.json(event);
		} catch (error) {
			next(error);
		}
	}
	//* @desc  Обновить событие календаря
	//* @route  POST /api/events/update
	//* @access  Private/Admin
	async update(req: any, res: any, next: any) {
		const eventId = req.params.id;
		try {
			const event = await eventService.update(eventId, req.body);

			res.json(event);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Получить все события
	//* @route  GET /api/events
	//* @access  Private/Admin
	async getEvents(req: any, res: any, next: any) {
		try {
			const events = await eventService.getEvents();

			res.json(events);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Получить предстоящие события
	//* @route  GET /api/events/upcomingEvents
	//* @access  Public
	async getUpcomingEvents(req: any, res: any, next: any) {
		try {
			const events = await eventService.getUpcoming();

			res.json(events);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Получить завершенные классы пользователя
	//* @route  GET /api/online-classes/groups/completed
	//* @access  Private
	async getUserCompletedEvents(req: any, res: any, next: any) {
		try {
			const classes = await eventService.getCompleted(req.query.list);

			res.json(classes);
		} catch (error) {
			next(error);
		}
	}
}

export default new EventController();

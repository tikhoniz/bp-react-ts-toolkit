// error
import ApiError from "../exceptions/api-error";
// models
import EventModel from "../models/event-model";
// DTO
import EventDto from "./dtos/event-dto";

class EventService {
	async create(event: any) {
		const newEvent = await EventModel.create(event);

		if (!newEvent) {
			throw ApiError.BadRequest(`Не удалось создать событие календаря`);
		}

		return newEvent;
	}

	async update(id: string, cls: any) {
		const updEvent = await EventModel.findOneAndUpdate({ _id: id }, cls, {
			new: true,
		});

		if (!updEvent) {
			throw ApiError.BadRequest(`Не удалось обновить групповой класс`);
		}

		return updEvent;
	}

	async getEvents() {
		const events = await EventModel.find({}).sort({ start: 1 }); // отсортирует сначала ближайшие к началу;

		if (!events) {
			throw ApiError.BadRequest(`Не удалось получить список событий календаря`);
		}

		return events;
	}

	async getUpcoming() {
		const delay = Number(process.env.DELAY_REMOVE_CLASS_SCHEDULE);

		const t = new Date(new Date().getTime() - delay * 60 * 1000).toISOString();

		const data = await EventModel.find({
			start: {
				$gte: t,
			},
		}).sort({ start: 1 }); // отсортирует сначала ближайшие к началу;

		const events = data.map((evt) => {
			return new EventDto(evt);
		});

		if (!events) {
			throw ApiError.BadRequest(`Не удалось получить список событий`);
		}

		return events;
	}

	async getCompleted(list: any) {
		const currentDate = new Date().toISOString();

		const data = await EventModel.find({
			_id: { $in: list },
			start: { $lt: currentDate },
		}).sort({ start: -1 }); // отсортирует сначала ближайшие к началу;

		const events = data.map((cls) => {
			return new EventDto(cls);
		});

		if (!events) {
			throw ApiError.BadRequest(`Не удалось получить список будущих классов`);
		}

		return events;
	}
}

export default new EventService();

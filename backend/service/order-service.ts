import ApiError from "../exceptions/api-error";
import OrderModel from "../models/order-model";
import UserModel from "../models/user-model";
import OrderDto from "./dtos/order-dto";

class OrderService {
	async create(order: any) {
		const newOrder = await OrderModel.create(order);

		if (!newOrder) {
			throw ApiError.BadRequest(`Не удалось создать оплаченный заказ`);
		}
		// добавляет оплаченные тренировки пользователю
		await UserModel.findOneAndUpdate(
			{ _id: newOrder.user_id },
			{
				$inc: {
					quantity_groups: newOrder.qty,
				},
			}
		);

		return newOrder;
	}

	async update(order: any) {
		const newOrder = await OrderModel.findOneAndUpdate(order);

		if (!newOrder) {
			throw ApiError.BadRequest(`Не удалось создать оплаченный заказ`);
		}
		// добавляет оплаченные тренировки пользователю
		await UserModel.findOneAndUpdate(
			{ _id: newOrder.user_id },
			{
				$inc: {
					groups: newOrder.qty,
				},
			}
		);

		return newOrder;
	}

	async getUserPaidOrders(id: string) {
		const data = await OrderModel.find({
			user_id: id,
		}).sort({ createdAt: -1 });

		if (!data) {
			throw ApiError.BadRequest(`Не удалось получить список оплаченных счетов`);
		}

		const orders = data.map((cls) => {
			return new OrderDto(cls);
		});
		return orders;
	}

	async getUsersLastPaidOrder(id: string) {
		const data = await OrderModel.find({
			user_id: id,
			//createdAt: {
			//	$gte: new Date(new Date().getTime() - 20 * 1000).toISOString(),
			//},
		})
			.sort({ $natural: -1 })
			.limit(1);

		if (!data || !data.length) {
			throw ApiError.BadRequest(`Не удалось получить оплаченный счёт`);
		}

		const orderDto = new OrderDto(data[0]);

		return orderDto;
	}
}

export default new OrderService();

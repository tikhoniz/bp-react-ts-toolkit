// error
import ApiError from "../exceptions/api-error";
// service
import orderService from "../service/order-service";

class OnlineClassController {
	//* @desc  Создать оплаченный счет
	//* @route  POST /api/orders/create
	//* @access  Private/User
	async createOrder(req: any, res: any, next: any) {
		try {
			const newOrder = await orderService.create(req.body);

			res.json(newOrder);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Получить оплаченные счета пользователя
	//* @route  POST /api/orders/paid/user/:id
	//* @access  Private/User
	async getUsersOrderList(req: any, res: any, next: any) {
		try {
			const orders = await orderService.getUserPaidOrders(req.params.id);

			res.json(orders);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Получить последний оплаченный счет пользователя
	//* @route  POST /api/orders/paid/user/:id
	//* @access  Private/User
	async getUsersOrderLastOne(req: any, res: any, next: any) {
		try {
			const order = await orderService.getUsersLastPaidOrder(req.params.id);

			res.json(order);
		} catch (error) {
			next(error);
		}
	}
}

export default new OnlineClassController();

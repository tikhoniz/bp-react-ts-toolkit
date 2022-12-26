import Stripe from "stripe";
import ApiError from "../exceptions/api-error";
import mailService from "./mail-service";
import orderService from "./order-service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2022-11-15",
});

class StripeService {
	async createSession(order: any, user: any, host: any) {
		const session = await stripe.checkout.sessions.create({
			customer_email: user.email,
			metadata: {
				userId: user.id,
				orderId: order.id,
				orderQty: order.qty,
				orderType: order.type,
				orderPrice: order.regularPrice,
				orderDesc: order.description,
				paymentMethod: "Stripe",
				orderDiscount: order.discount,
				orderDiscountPrice: order.discountPrice,
			},
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: order.qty,
							//! images:[image] изображение покупки
							description: order.description,
						},
						unit_amount: order.discount
							? order.discountPrice * 100
							: order.regularPrice * 100,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `${host}/payment/success`,
			cancel_url: `${host}/pricing`,
		});

		return session.url;
	}

	async webhook(event: any, signature: any) {
		try {
			event = stripe.webhooks.constructEvent(
				event,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET as string
			);
		} catch (err: any) {
			throw ApiError.BadRequest(
				`⚠️  Webhook signature verification failed. ${err.message}`
			);
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			const { metadata, customer_details } = session;

			const newPaidOrder = {
				user_id: metadata.userId,
				user_email: customer_details.email,
				user_name: customer_details.name,
				description: metadata.orderDesc,
				type: metadata.orderType,
				qty: metadata.orderQty,
				amount_total: session.amount_total,
				regular_price: metadata.orderPrice,
				discount: metadata.orderDiscount,
				discount_price: metadata.orderDiscountPrice,
				payment_method: "Stripe",
				payment_result: event.data.object,
			};

			await orderService.create(newPaidOrder);
		}

		if (event.type === "charge.succeeded") {
			const charge = event.data.object;
			//Отправляет электронные письма «Подтверждение платежа» и «Уведомление о платеже» для разовых платежей с использованием дебетовой карты ACH.
			// можно получить чек и отправить на почту
			const to = charge.billing_details.email;
			const mail = {
				receipt: charge.receipt_url,
			};

			await mailService.sendPaidOrderMail(to, mail);
		}
	}
}

export default new StripeService();

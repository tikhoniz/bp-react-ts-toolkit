import Stripe from "stripe";
// service
import orderService from "../service/order-service";
import mailServise from "../service/mail-service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2022-11-15",
});

class StripeController {
	//* @desc  Создание сессии Stripe
	//* @route  POST /api/users/authSocial
	//* @access Public
	async createSession(req: any, res: any, next: any) {
		const { order, user } = req.body;

		try {
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
				success_url: `${req.headers.origin}/payment/success`,
				cancel_url: `${req.headers.origin}/pricing`,
			});

			res.send({ url: session.url });
		} catch (error) {
			next(error);
		}
	}

	//nice-adroit-secure-bonny
	async webhook(req: any, res: any, next: any) {
		let event = req.body;

		const signature = req.headers["stripe-signature"];

		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET as string
			);
		} catch (err: any) {
			console.log(`⚠️  Webhook signature verification failed.`, err.message);

			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
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

			await mailServise.sendPaidOrderMail(to, mail);
		}

		res.send();
	}
}

export default new StripeController();

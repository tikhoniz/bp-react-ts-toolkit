// service
import stripeService from "../service/stripe-service";

class StripeController {
	//* @desc  Создание сессии Stripe
	//* @route  POST /api/users/authSocial
	//* @access Public
	async createSession(req: any, res: any, next: any) {
		const { order, user } = req.body;
		const host = req.headers.origin;

		try {
			const stripeUrl = await stripeService.createSession(order, user, host);

			return res.json(stripeUrl);
		} catch (error) {
			next(error);
		}
	}

	//nice-adroit-secure-bonny
	async webhook(req: any, res: any, next: any) {
		let event = req.body;

		const signature = req.headers["stripe-signature"];

		try {
			await stripeService.webhook(event, signature);

			return;
		} catch (err: any) {
			console.log(`⚠️  Webhook signature verification failed.`, err.message);

			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}
	}
}

export default new StripeController();

import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
	{
		user_id: { type: String, required: true, default: "" },
		user_email: { type: String, required: true, default: "" },
		user_name: { type: String, required: true, default: "" },
		description: { type: String, required: true, default: "" },
		type: { type: String, required: true, default: "" },
		qty: { type: String, required: true, default: "" },
		amount_total: { type: String, required: true, default: "0.00" },
		currency: { type: String, required: true, default: "usd" },
		regular_price: { type: String, required: true, default: "" },
		discount: { type: String, default: false },
		discount_price: { type: String, default: "" },
		payment_method: { type: String, required: true, default: "Stripe" },
		payment_result: { type: Object, required: true, default: {} },
		receipt_url: { type: String, default: "" },
	},
	{ timestamps: true }
);

export default model("Order", OrderSchema);

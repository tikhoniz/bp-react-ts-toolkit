import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
	{
		user_email: { type: String, required: true, default: "" },
		user_name: { type: String, required: true, default: "" },
		read: { type: Boolean, default: false },
		subject: { type: String, required: true, default: "" },
		message: { type: String, required: true, default: "" },
		response: { type: String, default: "" },
		request_from: { type: String, required: true, default: "profile" },
	},
	{ timestamps: true }
);

export default model("Message", MessageSchema);

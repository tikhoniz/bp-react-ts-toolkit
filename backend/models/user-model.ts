import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		last_name: { type: String },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		avatar: {
			image: { type: String, default: "" },
			image_id: { type: String, default: "" },
		},
		phone_number: { type: String, default: "" },
		address: {
			country: { type: String, default: "" },
			city: { type: String, default: "" },
		},
		personal_list: { type: [String], default: [] },
		group_list: { type: [String], default: [] },
		quantity_personals: { type: Number, default: 0 },
		quantity_groups: { type: Number, default: 0 },
		email_verified: { type: Boolean, default: false },
		activation_link: { type: Schema.Types.Mixed, default: false },
		zoom_app: { type: Boolean, default: false },
		cover: { type: String, default: "hermit_crabs-cover.png" },
		about: { type: String, default: "" },
		provider: { type: String, default: "credentials" },
		reset_token: { type: String },
		reset_token_exp: { type: Date },
		roles: [{ type: String, ref: "Role" }],
	},
	{ timestamps: true }
);

export default model("User", UserSchema);

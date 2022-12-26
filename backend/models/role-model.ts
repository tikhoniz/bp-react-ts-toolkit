import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
	value: { type: String, unique: true, default: "USER" },
	key: { type: String, unique: true, default: process.env.USER_ROLE },
});

export default model("Role", RoleSchema);

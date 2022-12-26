import { Schema, model } from "mongoose";

const YouTubeVideoSchema = new Schema(
	{
		coverId: { type: String, required: true, default: "" },
		coverExt: { type: String, required: true, default: "" },
		title: { type: String, required: true, default: "" },
		youtubeUrl: { type: String, required: true, default: "" },
		description: { type: String, required: true, default: "" },
	},
	{ timestamps: true }
);

export default model("YouTubeVideo", YouTubeVideoSchema);

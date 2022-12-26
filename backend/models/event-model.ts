import { Schema, model } from "mongoose";

const EventSchema = new Schema(
	{
		title: { type: String, required: true, default: "" },
		description: { type: String, required: true, default: "" },
		invitationLink: { type: String, required: true, default: "" },
		conferenceId: { type: String, required: true, default: "00000000" },
		accessCode: { type: String, required: true, default: "0000" },
		duration: { type: String, required: true, default: "60" },
		type: { type: String, required: true, default: "group" },
		level: { type: String, required: true, default: "beginer" },
		freeAccess: { type: Boolean, default: false },
		textColor: { type: String, required: true, default: "#B78103" },
		borderColor: { type: String, required: true, default: "#B78103" },
		allDay: { type: Boolean, default: false },
		coach: { type: String, required: true, default: "Диана" },
		avatar: {
			type: String,

			default: "/images/coaches/diana-coach-avatar.jpg",
		},
		urlCoach: {
			type: String,

			default: "/coaches/diana-head-coach",
		},
		participants: { type: Array, default: [] },
		start: { type: Date, default: new Date() },
		end: { type: Date, default: new Date() },
	},
	{ timestamps: true }
);

export default model("Event", EventSchema);

//title: "",
//description: "",
//coach: "Диана",
//level: "beginer",
//duration: "30",
//invitationLink: "",
//conferenceId: "",
//accessCode: "",
//freeAccess: false,
//textColor: "#1890FF",
//allDay: false,
//start: range ? new Date(range.start) : new Date(),
//end: range ? new Date(range.end) : new Date(),

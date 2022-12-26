// dto - data transfer object
export default class EventDto {
	title: any;
	description: any;
	duration: any;
	id: any;
	type: any;
	level: any;
	freeAccess: any;
	coach: any;
	avatar: any;
	urlCoach: any;
	start: any;
	end: any;
	allDay: any;
	textColor: any;
	borderColor: any;

	constructor(model: {
		_id: any;
		title: any;
		description: any;
		duration: any;
		type: any;
		level: any;
		freeAccess: any;
		coach: any;
		avatar: any;
		urlCoach: any;
		start: any;
		end: any;
		allDay: any;
		textColor: any;
		borderColor: any;
	}) {
		this.id = model._id;
		this.title = model.title;
		this.description = model.description;
		this.duration = model.duration;
		this.type = model.type;
		this.level = model.level;
		this.freeAccess = model.freeAccess;
		this.coach = model.coach;
		this.avatar = model.avatar;
		this.urlCoach = model.urlCoach;
		this.start = model.start;
		this.end = model.end;
		this.allDay = model.allDay;
		this.textColor = model.textColor;
		this.borderColor = model.borderColor;
	}
}

export interface IGroupClass {
	_id: string;
	id: string;
	title: string;
	invitationLink: string;
	conferenceId: string;
	accessCode: string;
	duration: string;
	type: string;
	level: string;
	freeAccess: string;
	coach: string;
	avatar: string;
	urlCoach: string;
	participants?: string[];
	//startTime: { type: Date, default: new Date() },
	startTime: string;
	creator: string;
	createdAt: Date;
}

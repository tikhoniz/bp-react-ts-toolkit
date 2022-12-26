export interface IEvent {
	id: string;
	_id: string;
	end: string;
	type: string;
	start: string;
	level: string;
	title: string;
	coach: string;
	avatar: string;
	creator: string;
	createdAt: Date;
	urlCoach: string;
	duration: string;
	textColor: string;
	freeAccess: string;
	accessCode: string;
	description: string;
	borderColor: string;
	conferenceId: string;
	invitationLink: string;
	participants?: string[];
}

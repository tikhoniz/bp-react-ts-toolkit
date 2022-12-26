export default class ZoomMeetingDto {
	invitationLink: string;
	conferenceId: string;
	accessCode: string;

	constructor(model: {
		invitationLink: string;
		conferenceId: string;
		accessCode: string;
	}) {
		this.invitationLink = model.invitationLink;
		this.conferenceId = model.conferenceId;
		this.accessCode = model.accessCode;
	}
}

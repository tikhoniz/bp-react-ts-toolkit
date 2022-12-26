import eventModel from "../models/event-model";
import ZoomMeetingDto from "./dtos/zoom-meeting-dto";
import { KJUR } from "jsrsasign";

class ZoomService {
	async generateSignature(
		sdkKey: any,
		sdkSecret: any,
		meetingNumber: any,
		role: any
	) {
		const iat = Math.round((new Date().getTime() - 30000) / 1000);
		const exp = iat + 180 * 60 * 2;
		const oHeader = { alg: "HS256", typ: "JWT" };

		const oPayload = {
			sdkKey: sdkKey,
			mn: meetingNumber,
			role: role,
			iat: iat,
			exp: exp,
			appKey: sdkKey,
			tokenExp: iat + 180 * 60 * 2,
		};

		const sHeader = JSON.stringify(oHeader);
		const sPayload = JSON.stringify(oPayload);
		const sdkJWT: any = KJUR.jws.JWS.sign(
			"HS256",
			sHeader,
			sPayload,
			sdkSecret
		);

		return sdkJWT;
	}

	async getZoomMeetting(classId: string) {
		const cls: any = await eventModel.findOne({ _id: classId });

		const meetingDto = new ZoomMeetingDto(cls);

		return meetingDto;
	}
}

export default new ZoomService();

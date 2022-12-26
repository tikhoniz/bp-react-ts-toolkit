import zoomService from "../service/zoom-service";

class ZoomController {
	async generateSignature(req: any, res: any, next: any) {
		try {
			const sdkKey = process.env.ZOOM_SDK_KEY;
			const sdkSecret = process.env.ZOOM_SDK_SECRET;

			const { meetingNumber, role } = req.body;

			const signature = await zoomService.generateSignature(
				sdkKey,
				sdkSecret,
				meetingNumber,
				role
			);

			return res.json(signature);
		} catch (error) {
			next(error);
		}
	}

	async getZoomMeetting(req: any, res: any, next: any) {
		const classId = req.params.id;
		try {
			const meeting = await zoomService.getZoomMeetting(classId);

			return res.json(meeting);
		} catch (error) {
			next(error);
		}
	}
}

export default new ZoomController();

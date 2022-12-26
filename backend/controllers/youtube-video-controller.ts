// error
import ApiError from "../exceptions/api-error";
// service
import youtubeVideoService from "../service/youtube-video-service";

class YoutubeVideoController {
	//* @desc  Создать youTube видео
	//* @route  POST /api/youtube-videos/admin/create
	//* @access  Private/Admin
	async create(req: any, res: any, next: any) {
		try {
			const video = await youtubeVideoService.create(req.body);

			res.json(video);
		} catch (error) {
			next(error);
		}
	}
	//* @desc  Обновить youTube видео
	//* @route  POST /api/youtube-videos/admin/update/:id
	//* @access  Private/Admin
	async update(req: any, res: any, next: any) {
		const videoId = req.params.id;

		try {
			const video = await youtubeVideoService.update(videoId, req.body);

			res.json(video);
		} catch (error) {
			next(error);
		}
	}

	//* @desc Удалить youTube видео
	//* @route  DELETE /api/youtube-videos/admin/delete/:id
	//* @access  Private/Admin
	async delete(req: any, res: any, next: any) {
		const videoId = req.params.id;

		try {
			const video = await youtubeVideoService.delete(videoId);
			res.json(video);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Получить все youtube видео
	//* @route  GET /api/youtube-videos/admin/videos
	//* @access  Public
	async getAllVideos(req: any, res: any, next: any) {
		try {
			const videos = await youtubeVideoService.getVideos();

			res.json(videos);
		} catch (error) {
			next(error);
		}
	}
}

export default new YoutubeVideoController();

import ApiError from "../exceptions/api-error";
import YouTubeVideoModel from "../models/youtube-video-model";

class YoutubeVideoService {
	async create(video: typeof YouTubeVideoModel) {
		const newVideo = await YouTubeVideoModel.create(video);

		if (!video) {
			throw ApiError.BadRequest(`Не удалось создать видео`);
		}

		return newVideo;
	}

	async update(id: string, video: typeof YouTubeVideoModel) {
		const updVideo = await YouTubeVideoModel.findOneAndUpdate(
			{ _id: id },
			video,
			{
				new: true,
			}
		);

		if (!updVideo) {
			throw ApiError.BadRequest(`Не удалось обновить Youtube видео`);
		}

		return updVideo;
	}

	async delete(id: string) {
		const deletedVideo = await YouTubeVideoModel.deleteOne({ _id: id });

		if (!deletedVideo) {
			throw ApiError.BadRequest(`Не удалось удалить Youtube видео`);
		}

		return deletedVideo;
	}

	async getVideos() {
		const videos = await YouTubeVideoModel.find({}).sort({ createdAt: -1 }); // отсортирует сначала ближайшие к началу;

		if (!videos) {
			throw ApiError.BadRequest(`Не удалось получить список Yuotube видео`);
		}

		return videos;
	}
}

export default new YoutubeVideoService();

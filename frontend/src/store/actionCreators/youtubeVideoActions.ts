import $api from "../../http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createYoutubeVideo = createAsyncThunk(
	"admin/youtubeVideo-create",
	async (videoData: any, thunkAPI) => {
		try {
			const response = await $api.post("/youtube-videos/create", {
				...videoData,
			});

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

export const updateYoutubeVideo = createAsyncThunk(
	"admin/youtubeVideo-update",
	async (videoData: any, thunkAPI) => {
		try {
			const response = await $api.post(
				`/youtube-videos/update/${videoData.id}`,
				{
					...videoData,
				}
			);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

export const deleteYoutubeVideo = createAsyncThunk(
	"admin/youtubeVideo-delete",
	async (videoId: string, thunkAPI) => {
		try {
			await $api.delete(`/youtube-videos/delete/${videoId}`);

			return videoId;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

export const getAllYoutubeVideo = createAsyncThunk(
	"admin/youtubeVideos",
	async (_, thunkAPI) => {
		try {
			const response = await $api.get(`/youtube-videos/videos`);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

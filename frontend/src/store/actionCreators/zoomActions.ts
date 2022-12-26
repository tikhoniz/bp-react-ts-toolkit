import $api from "../../http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSignature = createAsyncThunk(
	"zoom/getSignature",
	async ({ meetingNumber, role }: any, thunkAPI) => {
		try {
			const response = await $api.post(`/zoom/getSignature`, {
				meetingNumber,
				role,
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

export const getZoomMeeting = createAsyncThunk(
	"zoom/zoomMeeting",
	async (classId: any, thunkAPI) => {
		try {
			const response = await $api.get(`/zoom/zoomMeeting/${classId}`);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

import $api from "../../http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createEvent = createAsyncThunk(
	"admin/createEvent",
	async (eventData: any, thunkAPI) => {
		try {
			const response = await $api.post("/events/create", {
				...eventData,
			});

			console.log("response", response);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

export const updateEvent = createAsyncThunk(
	"admin/updateEvent",
	async ({ eventId, eventData }: any, thunkAPI) => {
		try {
			const response = await $api.post(`/events/update/${eventId}`, {
				...eventData,
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

export const getAllEvents = createAsyncThunk(
	"admin/events",
	async (_, thunkAPI) => {
		try {
			const response = await $api.get(`/events/all`);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

export const getUpcomingEvents = createAsyncThunk(
	"user/upcomingEvents",
	async (_, thunkAPI) => {
		try {
			const response = await $api.get(`/events/upcoming`);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

export const getUserCompletedEvents = createAsyncThunk(
	"user/completedEvents",
	async (list: any, thunkAPI) => {
		try {
			const response = await $api.get(`/events/completed`, {
				params: {
					list: list,
				},
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

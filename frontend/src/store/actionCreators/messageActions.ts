import $api from "../../http";
import { createAsyncThunk } from "@reduxjs/toolkit";
//import { OrdersResponse } from "../../models/response/OrdersResponse";
//import { IMessage } from "../../models/IMessage";

export const createUserMessage = createAsyncThunk(
	"messages/create",
	async (dataMessage: any, thunkAPI) => {
		try {
			const response = await $api.postForm(`/messages/create`, {
				...dataMessage,
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

export const updateMessage = createAsyncThunk(
	"messages/update",
	async ({ answer, messageId }: any, thunkAPI) => {
		try {
			const response = await $api.post(
				`/messages/update/${messageId}`,
				{
					answer,
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

export const getUserMessages = createAsyncThunk(
	"messages/user",
	async (email: any, thunkAPI) => {
		try {
			const response = await $api.get(
				`/messages/user/${email}`
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

export const getAllMessages = createAsyncThunk(
	"messages",
	async (_, thunkAPI) => {
		try {
			const response = await $api.get(`/messages/all`);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

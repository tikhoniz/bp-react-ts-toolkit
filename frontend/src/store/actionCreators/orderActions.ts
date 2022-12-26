import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";

export const createPaidOrder = createAsyncThunk(
	"order/create",
	async (paidOrderData: any, thunkAPI) => {
		try {
			const response = await $api.post(`/orders/create`, {
				...paidOrderData,
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

export const getPaidOrders = createAsyncThunk(
	"orders/paid",
	async (id: any, thunkAPI) => {
		try {
			const response = await $api.get(`/orders/user/${id}/paid`);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);

export const getUserLastOrder = createAsyncThunk(
	"order/lastOne",
	async (id: any, thunkAPI) => {
		try {
			const response = await $api.get(`/orders/user/${id}/lastPaid`);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status || 400,
				message: error.response?.data?.message,
			});
		}
	}
);

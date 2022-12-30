import axios from "axios";
import $api from "../../http";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Authentication
export const checkAuth = createAsyncThunk(
	"user/checkAuth",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/users/refresh`,
				{
					withCredentials: true,
				}
			);

			if (!response.data.user) {
				localStorage.removeItem("token");
				localStorage.removeItem("roles");
				return thunkAPI.signal.aborted;
			}

			localStorage.setItem("token", response.data.accessToken);

			return response.data.user;
		} catch (error: any) {
			// если ошибка unautorization со статусом 401 срабатывает logout\
			if (error.response?.status === 401) {
				$api.post("/users/logout");
				localStorage.removeItem("token");
				localStorage.removeItem("roles");
			}
			return thunkAPI.signal.aborted;
		}
	}
);

export const authSocial = createAsyncThunk(
	"user/authSocial",
	async ({ userObject }: any, thunkAPI) => {
		try {
			const response = await $api.post("/users/authSocial", {
				userObject,
			});

			localStorage.setItem("token", response.data.accessToken);

			if (response.data.user?.roles) {
				localStorage.setItem("roles", JSON.stringify(response.data.user.roles));
			}
			return response.data.user;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"На сервере произошла внутренняя непредвиденная ошибка",
			});
		}
	}
);

export const registration = createAsyncThunk(
	"user/registration",
	async ({ name, email, password }: any, thunkAPI) => {
		try {
			const response = await $api.post("/users/registration", {
				name,
				email,
				password,
			});

			localStorage.setItem("token", response.data.accessToken);

			if (response.data.user?.roles) {
				localStorage.setItem("roles", JSON.stringify(response.data.user.roles));
			}

			return response.data.user;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"На сервере произошла внутренняя непредвиденная ошибка",
			});
		}
	}
);
export const login: any = createAsyncThunk(
	"user/login",
	async ({ email, password }: any, thunkAPI) => {
		try {
			const response = await $api.post("/users/login", {
				email,
				password,
			});

			localStorage.setItem("token", response.data.accessToken);

			if (response.data.user?.roles) {
				localStorage.setItem("roles", JSON.stringify(response.data.user.roles));
			}

			return response.data.user;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"На сервере произошла внутренняя непредвиденная ошибка",
			});
		}
	}
);
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
	try {
		const response = await $api.post("/users/logout");
		localStorage.removeItem("token");
		localStorage.removeItem("roles");

		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue("Не удалось выйти");
	}
});
// User
export const updateUser = createAsyncThunk(
	"user/update",
	async ({ userId, updatedUser }: any, thunkAPI) => {
		try {
			const response = await $api.post(`/users/update/${userId}`, {
				updatedUser,
			});

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"На сервере произошла внутренняя непредвиденная ошибка",
			});
		}
	}
);

// Change auth password
export const sendLinkToChangePassword = createAsyncThunk(
	"user/sendLink",
	async (userEmail: string, thunkAPI) => {
		try {
			const response = await $api.post(`/users/password/${userEmail}/sendlink`);

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"На сервере произошла внутренняя непредвиденная ошибка",
			});
		}
	}
);
export const setNewPassword = createAsyncThunk(
	"user/newpassword",
	async ({ password, token }: any, thunkAPI) => {
		try {
			const response = await $api.post(`/users/password/reset/${token}`, {
				password,
			});

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({
				status: error.response?.status || 500,
				message:
					error.response?.data?.message ||
					"На сервере произошла внутренняя непредвиденная ошибка",
			});
		}
	}
);

// Register or cancel for an event
export const registerForEvent = createAsyncThunk(
	"userEventRegistration",
	async ({ eventId, userId }: any, thunkAPI) => {
		try {
			const response = await $api.post("/users/event/registration", {
				eventId,
				userId,
			});

			return response.data;
		} catch (error: any) {
			//console.log("error.response?.data", error.response?.data);

			return thunkAPI.rejectWithValue({
				status: error.response?.status,
				message: error.response?.data?.message,
			});
		}
	}
);
export const cancelEvent = createAsyncThunk(
	"userEventCancel",
	async ({ eventId, userId }: any, thunkAPI) => {
		try {
			const response = await $api.post("/users/event/cancel", {
				eventId,
				userId,
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

// ZOOM
export const changeZoomMode = createAsyncThunk(
	"user/zoom",
	async ({ userId, mode }: any, thunkAPI) => {
		try {
			const response = await $api.post("/users/zoom", {
				userId,
				mode,
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

// Confirm E-mail
export const sendConfirmationEmail = createAsyncThunk(
	"user/sendConfirmationEmail",
	async ({ userEmail }: any, thunkAPI) => {
		try {
			const response = await $api.post("/users/send/confirmationEmail", {
				userEmail,
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

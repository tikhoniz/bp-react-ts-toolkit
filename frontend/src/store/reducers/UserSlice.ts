import {
	createSlice,
	PayloadAction,
	ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import {
	login,
	logout,
	checkAuth,
	cancelEvent,
	registration,
	setNewPassword,
	changeZoomMode,
	registerForEvent,
	sendConfirmationEmail,
	sendLinkToChangePassword,
	updateUser,
} from "../actionCreators/userActions";
import { isRejectedAction } from "../utils";

interface UserState {
	user: IUser | null;
	users: IUser[];
	isLoading: boolean;
	isSent: boolean;
	newPassword: boolean;
	error: object | null;
	message: string;
	checkAuthDone: boolean;
}

const initialState: UserState = {
	user: null,
	users: [],
	isLoading: false,
	isSent: false,
	newPassword: false,
	error: null,
	message: "",
	checkAuthDone: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearError(state) {
			state.error = null;
		},

		clearMessage(state) {
			state.message = "";
		},

		clearSent(state) {
			state.isSent = false;
			state.newPassword = false;
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
		builder
			.addCase(
				checkAuth.fulfilled,
				(state: any, action: PayloadAction<IUser>) => {
					state.error = null;
					state.isLoading = false;
					state.user = action.payload;
					state.checkAuthDone = true;
				}
			)
			.addCase(checkAuth.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				registration.fulfilled,
				(state: any, action: PayloadAction<IUser>) => {
					state.error = null;
					state.isLoading = false;
					state.user = action.payload;
				}
			)
			.addCase(registration.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state: any, action: PayloadAction<IUser>) => {
				state.error = null;
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(login.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state: any, action) => {
				state.error = null;
				state.isLoading = false;
				state.user = null;
			})
			.addCase(logout.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = true;
				state.error = null;
				state.user = action.payload;
			})
			.addCase(updateUser.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(sendLinkToChangePassword.fulfilled, (state: any, action) => {
				state.error = null;
				state.isLoading = false;
				state.isSent = true;
			})
			.addCase(sendLinkToChangePassword.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(setNewPassword.fulfilled, (state: any, action) => {
				state.error = null;
				state.isLoading = false;
				state.newPassword = true;
			})
			.addCase(setNewPassword.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				registerForEvent.fulfilled,
				(state: any, action: PayloadAction<IUser>) => {
					state.error = null;
					state.isLoading = false;
					state.user = action.payload;
					state.message = "Вы записались на тренировку";
				}
			)
			.addCase(registerForEvent.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				cancelEvent.fulfilled,
				(state: any, action: PayloadAction<IUser>) => {
					state.error = null;
					state.isLoading = false;
					state.user = action.payload;
					state.message = "Запись на тренировку отменена";
				}
			)
			.addCase(cancelEvent.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				changeZoomMode.fulfilled,
				(state: any, action: PayloadAction<IUser>) => {
					state.error = null;
					state.isLoading = false;
					state.user = action.payload;
				}
			)
			.addCase(changeZoomMode.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				sendConfirmationEmail.fulfilled,
				(state: any, action: PayloadAction<IUser>) => {
					state.error = null;
					state.isLoading = false;
					state.user = action.payload;
				}
			)
			.addCase(sendConfirmationEmail.pending, (state, action) => {
				state.isLoading = true;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});
export const userSliceActions = userSlice.actions;

export default userSlice.reducer;

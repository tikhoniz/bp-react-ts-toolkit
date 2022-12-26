import {
	current,
	createSlice,
	PayloadAction,
	ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { IMessage } from "../../models/IMessage";
import {
	updateMessage,
	getAllMessages,
	getUserMessages,
	createUserMessage,
} from "../actionCreators/messageActions";
import { isRejectedAction } from "../utils";

interface MessageState {
	message: IMessage;
	messages: IMessage[];
	userMessages: IMessage[];
	isLoading: boolean;
	error: object | null;
}

const initialState: MessageState = {
	message: {} as IMessage,
	messages: [],
	userMessages: [],
	isLoading: false,
	error: null,
};

export const messageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		clearError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<MessageState>) => {
		builder
			.addCase(
				createUserMessage.fulfilled,
				(state: any, action: PayloadAction<string>) => {
					state.error = null;
					state.isLoading = false;
					state.userMessages = [...state.userMessages, action.payload];
				}
			)
			.addCase(createUserMessage.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				updateMessage.fulfilled,
				(state: any, action: PayloadAction<IMessage>) => {
					state.isLoading = false;
					state.error = null;
					const item = action.payload;

					state.messages = current(state).messages.map((x: IMessage) => {
						if (x._id === item._id) {
							return item;
						}
						return x;
					});
				}
			)
			.addCase(updateMessage.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				getUserMessages.fulfilled,
				(state: any, action: PayloadAction<IMessage[]>) => {
					state.isLoading = false;
					state.error = null;
					state.userMessages = action.payload;
				}
			)
			.addCase(getUserMessages.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				getAllMessages.fulfilled,
				(state: any, action: PayloadAction<IMessage[]>) => {
					state.isLoading = false;
					state.error = null;
					state.messages = action.payload;
				}
			)
			.addCase(getAllMessages.pending, (state, action) => {
				state.isLoading = true;
			})

			.addMatcher(isRejectedAction, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});
export const messagesSliceActions = messageSlice.actions;

export default messageSlice.reducer;

import {
	createSlice,
	PayloadAction,
	ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { getSignature, getZoomMeeting } from "../actionCreators/zoomActions";
import { isRejectedAction } from "../utils";

interface ZoomState {
	meeting: object | null;
	signature: string | null;
	isLoading: boolean;
	error: object | null;
}

const initialState: ZoomState = {
	meeting: null,
	signature: null,
	isLoading: false,
	error: null,
};

export const zoomSlice = createSlice({
	name: "zoom",
	initialState,
	reducers: {
		clearError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<ZoomState>) => {
		builder
			.addCase(
				getSignature.fulfilled,
				(state: any, action: PayloadAction<string>) => {
					state.error = null;
					state.isLoading = false;
					state.signature = action.payload;
				}
			)
			.addCase(getSignature.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				getZoomMeeting.fulfilled,
				(state: any, action: PayloadAction<string>) => {
					state.isLoading = false;
					state.error = null;
					state.meeting = action.payload;
				}
			)
			.addCase(getZoomMeeting.pending, (state, action) => {
				state.isLoading = true;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});
export const zoomSliceActions = zoomSlice.actions;

export default zoomSlice.reducer;

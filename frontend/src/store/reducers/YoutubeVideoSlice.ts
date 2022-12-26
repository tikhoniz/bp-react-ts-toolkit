import {
	createSlice,
	PayloadAction,
	current,
	ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { IYoutubeVideo } from "../../models/IYoutubeVideo";
import {
	createYoutubeVideo,
	deleteYoutubeVideo,
	getAllYoutubeVideo,
	updateYoutubeVideo,
} from "../actionCreators/youtubeVideoActions";
import { isRejectedAction } from "../utils";

interface YoutubeVideoState {
	video: IYoutubeVideo;
	videoList: IYoutubeVideo[];
	isLoading: boolean;
	error: object | null;
}

const initialState: YoutubeVideoState = {
	video: {} as IYoutubeVideo,
	videoList: [],
	isLoading: false,
	error: null,
};

export const youtubeVideoSlice = createSlice({
	name: "youtubeVideo",
	initialState,
	reducers: {
		clearError(state) {
			state.error = null;
		},
	},

	extraReducers: (builder: ActionReducerMapBuilder<YoutubeVideoState>) => {
		builder
			// CREATE YouTube video
			.addCase(
				createYoutubeVideo.fulfilled,
				(state: any, action: PayloadAction<IYoutubeVideo>) => {
					state.error = null;
					state.isLoading = false;
					state.user = action.payload;
					state.checkAuthDone = true;
				}
			)
			.addCase(createYoutubeVideo.pending, (state, action) => {
				state.isLoading = true;
			})
			// UPDATE YouTube video
			.addCase(
				updateYoutubeVideo.fulfilled,
				(state: any, action: PayloadAction<IYoutubeVideo>) => {
					state.error = null;
					state.isLoading = false;

					const item = action.payload;
					state.videoList = current(state).videoList.map((x: IYoutubeVideo) => {
						if (x._id === item._id) {
							return item;
						}
						return x;
					});
				}
			)
			.addCase(updateYoutubeVideo.pending, (state, action) => {
				state.isLoading = true;
			})
			// DELETE YouTube video
			.addCase(
				deleteYoutubeVideo.fulfilled,
				(state: any, action: PayloadAction<string>) => {
					state.error = null;
					state.isLoading = false;

					const videoId = action.payload;

					state.videoList = current(state).videoList.filter(
						(video: IYoutubeVideo) => video._id !== videoId
					);
				}
			)
			.addCase(deleteYoutubeVideo.pending, (state, action) => {
				state.isLoading = true;
			})
			// GET all videos
			.addCase(
				getAllYoutubeVideo.fulfilled,
				(state: any, action: PayloadAction<IYoutubeVideo[]>) => {
					state.error = null;
					state.isLoading = false;
					state.videoList = action.payload;
				}
			)
			.addCase(getAllYoutubeVideo.pending, (state, action) => {
				state.isLoading = true;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const youtubeVideoSliceActions = youtubeVideoSlice.actions;

export default youtubeVideoSlice.reducer;

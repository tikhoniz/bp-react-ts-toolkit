import {
	current,
	createSlice,
	PayloadAction,
	ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { IEvent } from "../../models/IEvent";
import {
	createEvent,
	updateEvent,
	getAllEvents,
	getUpcomingEvents,
	getUserCompletedEvents,
} from "../actionCreators/eventActions";
import { isRejectedAction } from "../utils";

interface EventState {
	event: IEvent | null;
	events: IEvent[];
	adminEvents: IEvent[];
	userCompletedEvents: IEvent[];
	isLoading: boolean;
	error: object | null;
}

const initialState: EventState = {
	event: null,
	events: [],
	adminEvents: [],
	userCompletedEvents: [],
	isLoading: false,
	error: null,
};

export const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		clearError(state) {
			state.error = null;
		},
		setEvent(state, data) {
			const eventId = data.payload;

			state.event = current(state).events.find((x) => x.id === eventId) || null;
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<EventState>) => {
		builder
			.addCase(
				createEvent.fulfilled,
				(state: any, action: PayloadAction<IEvent>) => {
					state.error = null;
					state.isLoading = false;
					state.adminEvents = [...state.adminEvents, action.payload];
				}
			)
			.addCase(createEvent.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				updateEvent.fulfilled,
				(state: any, action: PayloadAction<IEvent>) => {
					state.isLoading = false;
					state.error = null;
					const item = action.payload;

					state.adminEvents = current(state).adminEvents.map((x: IEvent) => {
						if (x._id === item._id) {
							return item;
						}
						return x;
					});
				}
			)
			.addCase(updateEvent.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				getAllEvents.fulfilled,
				(state: any, action: PayloadAction<IEvent[]>) => {
					state.error = null;
					state.isLoading = false;
					state.adminEvents = action.payload;
				}
			)
			.addCase(getAllEvents.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				getUpcomingEvents.fulfilled,
				(state: any, action: PayloadAction<IEvent[]>) => {
					state.error = null;
					state.isLoading = false;
					state.events = action.payload;
				}
			)
			.addCase(getUpcomingEvents.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				getUserCompletedEvents.fulfilled,
				(state: any, action: PayloadAction<IEvent[]>) => {
					state.error = null;
					state.isLoading = false;
					state.userCompletedEvents = action.payload;
				}
			)
			.addCase(getUserCompletedEvents.pending, (state, action) => {
				state.isLoading = true;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});
export const eventSliceActions = eventSlice.actions;

export default eventSlice.reducer;

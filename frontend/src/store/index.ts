import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import zoomReducer from "./reducers/ZoomSlice";
import eventReducer from "./reducers/EventSlice";
import orderReducer from "./reducers/OrderSlice";
import messageReducer from "./reducers/MessageSlice";
import policyReducer from "./reducers/PolicySlice";
import youtubeVideoReducer from "./reducers/YoutubeVideoSlice";

const rootReducer = combineReducers({
	userReducer,
	zoomReducer,
	eventReducer,
	orderReducer,
	policyReducer,
	messageReducer,
	youtubeVideoReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	});
};

// типизация
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

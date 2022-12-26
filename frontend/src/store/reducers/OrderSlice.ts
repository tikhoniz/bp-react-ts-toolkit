import {
	createSlice,
	PayloadAction,
	ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { IOrder } from "../../models/IOrder";
import {
	getPaidOrders,
	createPaidOrder,
	getUserLastOrder,
} from "../actionCreators/orderActions";
import { isRejectedAction } from "../utils";

interface OrderState {
	order: IOrder | null;
	orders: IOrder[];
	paidOrders: IOrder[];
	isLoading: boolean;
	error: object | null;
}

const initialState: OrderState = {
	order: null,
	orders: [],
	paidOrders: [],
	isLoading: false,
	error: null,
};

export const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		clearError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<OrderState>) => {
		builder
			.addCase(
				createPaidOrder.fulfilled,
				(state: any, action: PayloadAction<IOrder>) => {
					state.error = null;
					state.isLoading = false;
					state.newOrder = action.payload;
				}
			)
			.addCase(createPaidOrder.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				getUserLastOrder.fulfilled,
				(state: any, action: PayloadAction<IOrder>) => {
					state.isLoading = false;
					state.error = null;
					state.order = action.payload;
				}
			)
			.addCase(getUserLastOrder.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(
				getPaidOrders.fulfilled,
				(state: any, action: PayloadAction<IOrder[]>) => {
					state.error = null;
					state.isLoading = false;
					state.paidOrders = action.payload;
				}
			)
			.addCase(getPaidOrders.pending, (state, action) => {
				state.isLoading = true;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});
export const orderSliceActions = orderSlice.actions;

export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface PolicyState {
	policy: null;
}

const initialState: PolicyState = {
	policy: null,
};

export const policySlice = createSlice({
	name: "policy",
	initialState,
	reducers: {
		openPolicy(state, data) {
			state.policy = data.payload;
		},
		closePolicy(state) {
			state.policy = null;
		},
	},
});
export const policySliceActions = policySlice.actions;

export default policySlice.reducer;

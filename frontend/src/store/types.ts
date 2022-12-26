import { Action } from "@reduxjs/toolkit";

export interface RejectedAction extends Action {
	error: Error;
	payload: object;
}

export interface PendingAction extends Action {
	payload: undefined;
}

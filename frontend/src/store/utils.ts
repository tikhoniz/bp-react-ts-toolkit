import { AnyAction } from "@reduxjs/toolkit";
import { PendingAction, RejectedAction } from "./types";

export function isRejectedAction(action: AnyAction): action is RejectedAction {
	return action.type.endsWith("rejected");
}

export function isPendingAction(action: AnyAction): action is PendingAction {
	return action.type.endsWith("pending");
}

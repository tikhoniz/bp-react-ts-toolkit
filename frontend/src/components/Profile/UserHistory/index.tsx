import { useEffect } from "react";
// store
import { getPaidOrders } from "../../../store/actionCreators/orderActions";
import { getUserCompletedEvents } from "../../../store/actionCreators/eventActions";
// hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
// material
import { Grid } from "@mui/material";
// components
import UserPaidOders from "./UserPaidOders";
import UserCompletedClasses from "./UserCompletedClasses";

const UserHistory = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.userReducer);

	useEffect(() => {
		dispatch(getUserCompletedEvents(user?.groupList));
		dispatch(getPaidOrders(user?.id));
	}, [dispatch, user]);

	const { userCompletedEvents, isLoading: loadingEvents } = useAppSelector(
		(state) => state.eventReducer
	);

	const { paidOrders, isLoading: loadingOrders } = useAppSelector(
		(state) => state.orderReducer
	);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				{!loadingEvents && <UserCompletedClasses list={userCompletedEvents} />}
			</Grid>

			<Grid item xs={12} md={6}>
				{!loadingOrders && <UserPaidOders list={paidOrders} />}
			</Grid>
		</Grid>
	);
};

export default UserHistory;

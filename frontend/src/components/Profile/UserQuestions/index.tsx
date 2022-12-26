import { lazy, useEffect } from "react";
// material
import { Grid } from "@mui/material";
// store
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getUserMessages } from "../../../store/actionCreators/messageActions";
// components
import Loadable from "../../shared/Loadable";
// lazy components
const QuestionList = Loadable(lazy(() => import("./QuestionList")));
const QuestionForm = Loadable(lazy(() => import("./QuestionForm")));

const UserQuestions = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.userReducer);

	useEffect(() => {
		dispatch(getUserMessages(user?.email));
	}, [dispatch, user]);

	const { userMessages, isLoading } = useAppSelector(
		(state) => state.messageReducer
	);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				{!isLoading && <QuestionList messages={userMessages} />}
			</Grid>
			<Grid item xs={12} md={6}>
				<QuestionForm user={user} />
			</Grid>
		</Grid>
	);
};

export default UserQuestions;

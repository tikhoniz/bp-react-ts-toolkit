import { styled } from "@mui/material";
import { lazy, useEffect } from "react";
// store
import { useAppDispatch } from "../hooks/redux";
import { getAllUsers } from "../store/actionCreators/userActions";
import { getAllEvents } from "../store/actionCreators/eventActions";
import { getAllMessages } from "../store/actionCreators/messageActions";
import { getAllYoutubeVideo } from "../store/actionCreators/youtubeVideoActions";
// components
import Page from "../components/shared/Page";
import Loadable from "../components/shared/Loadable";
// lazy component
const AdminDashboard = Loadable(
	lazy(() => import("../components/AdminDashboard"))
);

//--------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(10),
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("sm")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
}));
//---------------------

const AdminPage = (): JSX.Element => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getAllEvents());
		dispatch(getAllMessages());
		dispatch(getAllYoutubeVideo());
		// eslint-disable-next-line
	}, []);

	return (
		<RootStyle title="Админ | Bright's Pilates">
			<AdminDashboard />
		</RootStyle>
	);
};

export default AdminPage;

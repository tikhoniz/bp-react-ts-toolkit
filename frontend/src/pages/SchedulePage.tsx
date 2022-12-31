import { FC, useEffect } from "react";
// material
import { styled } from "@mui/material";
// components
import Page from "../components/shared/Page";
import Schedule from "../components/Schedule";
// store
import { useAppDispatch } from "../hooks/redux";
import { getUpcomingEvents } from "../store/actionCreators/eventActions";

//--------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(10),
	paddingBottom: theme.spacing(10),
	color: theme.palette.text.secondary,
	[theme.breakpoints.up("sm")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
}));
//---------------------

const SchedulePage: FC = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const getEvents = () => {
		dispatch(getUpcomingEvents());
	};

	useEffect(() => {
		window.addEventListener("focus", getEvents);
		getEvents();
		return () => {
			window.removeEventListener("focus", getEvents);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<RootStyle title="Расписание | Bright's Pilates">
			<Schedule />
		</RootStyle>
	);
};

export default SchedulePage;

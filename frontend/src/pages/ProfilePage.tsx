import { lazy, useEffect } from "react";
// hooks
import { useAppDispatch, useAppSelector } from "../hooks/redux";
// material
import { styled } from "@mui/material/styles";
// store
import { getUpcomingEvents } from "../store/actionCreators/eventActions";
// components
import Page from "../components/shared/Page";
// lazy components
const Profile = (lazy(() => import("../components/Profile")));

//-------------------- STYLE ----------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(15),
}));
//-------------------------------------------------

const ProfilePage = (): JSX.Element => {
	const { user } = useAppSelector((state) => state.userReducer);

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

	useEffect(() => {
		dispatch(getUpcomingEvents());
	}, [dispatch]);

	return (
		<RootStyle title="Личный профиль | Bright's Pilates">
			{user && <Profile user={user} />}
		</RootStyle>
	);
};

export default ProfilePage;

// material
import { styled } from "@mui/material";
import { lazy, useEffect } from "react";
// redux
import { useAppDispatch } from "../hooks/redux";
// store
import { getAllYoutubeVideo } from "../store/actionCreators/youtubeVideoActions";
// components
import Page from "../components/shared/Page";
import Loadable from "../components/shared/Loadable";
// lazy components
const VideoWorkouts = Loadable(
	lazy(() => import("../components/VideoWorkouts"))
);

//--------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(15),
}));
//---------------------

const VideoWorkoutsPage = (): JSX.Element => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllYoutubeVideo());
		// eslint-disable-next-line
	}, []);
	return (
		<RootStyle title="Видео | Bright's Pilates">
			<VideoWorkouts />
		</RootStyle>
	);
};

export default VideoWorkoutsPage;

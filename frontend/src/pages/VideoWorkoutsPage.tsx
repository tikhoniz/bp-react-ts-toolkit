// material
import { styled } from "@mui/material";
import { useEffect } from "react";
// redux
import { useAppDispatch } from "../hooks/redux";
// store
import { getAllYoutubeVideo } from "../store/actionCreators/youtubeVideoActions";
// components
import Page from "../components/shared/Page";
// lazy components
import VideoWorkouts from "../components/VideoWorkouts";

//--------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100vh",
	paddingTop: theme.spacing(8),
	paddingBottom: theme.spacing(8),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
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

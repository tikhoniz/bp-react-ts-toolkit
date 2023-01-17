// material
import { styled } from "@mui/material";
import { useEffect } from "react";
// redux
import { useAppDispatch, useAppSelector } from "../hooks/redux";
// store
import { getAllYoutubeVideo } from "../store/actionCreators/youtubeVideoActions";
// components
import Page from "../components/shared/Page";
// lazy components
import Video from "../components/VideoWorkouts/Video";
import { useParams } from "react-router-dom";

//--------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(8),
	paddingBottom: theme.spacing(8),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
}));
//---------------------

const VideoPage = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { videoList } = useAppSelector((state) => state.youtubeVideoReducer);
	const video = videoList.find((it) => it._id === id);

	useEffect(() => {
		dispatch(getAllYoutubeVideo());
		// eslint-disable-next-line
	}, []);
	return (
		<RootStyle title={`${video ? video.title : ""} | Bright's Pilates`}>
			{video && <Video video={video} videoList={videoList} />}
		</RootStyle>
	);
};

export default VideoPage;

// material
import { Box, CardHeader, Container, Grid } from "@mui/material";
// redux
import { useAppSelector } from "../../hooks/redux";
// components
import VideoCard from "./VideoCard";
// icons
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

const VideoWorkouts = () => {
	const { videoList } = useAppSelector((state) => state.youtubeVideoReducer);

	return (
		<Container maxWidth="xl" sx={{ px: { xs: 0, sm: 1, md: 2, lg: 3 } }}>
			<Box
				sx={{
					mx: { lg: 8 },
				}}
			>
				<CardHeader
					title="Видео тренировки"
					sx={{ mb: 3, whiteSpace: "nowrap" }}
					avatar={<OndemandVideoIcon sx={{ fontSize: 30 }} />}
				/>

				<Grid container spacing={3} sx={{ p: { xs: 0, sm: 2 } }}>
					{videoList.map((video) => (
						<Grid key={video._id} item xs={12} sm={6} md={4}>
							<VideoCard video={video} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default VideoWorkouts;

import { useRef, useState } from "react";
import ReactPlayer from "react-player";

// material
import { Box, CardHeader, Container, Grid, styled } from "@mui/material";
import { ModalUnstyled } from "@mui/base";
// animate
import { motion } from "framer-motion";
// redux
import { useAppSelector } from "../../hooks/redux";
// components
import VideoCard from "./VideoCard";
// icons
import IconButton from "@mui/material/IconButton";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

interface ReactPlayerProps {
	width: string;
	height: string;
	ref: any;
	controls: boolean;
	url: string | null;
	config: any;
}

const Wrapper = styled("div")`
	box-shadow: 0 0 30px rgb(0 0 0 / 30%), 0 0 8px -5px rgb(0 0 0 / 30%);
	background: #1e1d1d;
	position: relative;
	padding-top: 56.25%;
`;

const StyledReactPlayer = styled(
	ReactPlayer as React.JSXElementConstructor<ReactPlayerProps>
)`
	position: absolute;
	left: 0;
	top: 0;
`;

const StyledModal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10%;
`;

const Backdrop = styled("div")`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.8);
	-webkit-tap-highlight-color: transparent;
`;

const VideoWorkouts = () => {
	const [videoId, setVideoId] = useState(null);

	const reactPlayerRef = useRef(null);

	const { videoList } = useAppSelector((state) => state.youtubeVideoReducer);

	const closeVideo = () => {
		setVideoId(null);
	};

	return (
		<>
			<Container maxWidth="xl" sx={{ px: { xs: 1, md: 2, lg: 3 } }}>
				<Box
					sx={{
						mx: { lg: 8 },
					}}
				>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<CardHeader
							title="Видео тренировки"
							sx={{ mb: 3, whiteSpace: "nowrap" }}
							avatar={<OndemandVideoIcon sx={{ fontSize: 30 }} />}
						/>

						<Grid container spacing={3} sx={{ p: 2 }}>
							{videoList.map((video) => (
								<Grid key={video._id} item xs={12} sm={6} md={4}>
									<VideoCard
										isOpen={videoId}
										openVideoHandler={setVideoId}
										video={video}
									/>
								</Grid>
							))}
						</Grid>
					</motion.div>
				</Box>
			</Container>

			<StyledModal
				open={!!videoId}
				onClose={closeVideo}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				slots={{ backdrop: Backdrop }}
				closeAfterTransition={true}
			>
				<Box
					sx={{
						position: "relative",
						width: { xs: "100%", md: "75%" },
						maxWidth: "1600px",
					}}
				>
					<IconButton
						onClick={closeVideo}
						sx={{ position: "absolute", top: -55, right: 0, p: 0 }}
					>
						<CancelPresentationIcon
							sx={{
								width: "42px",
								height: "42px",
								color: "#FFFFFF",
							}}
						/>
					</IconButton>

					<Wrapper>
						<StyledReactPlayer
							width="100%"
							height="100%"
							ref={reactPlayerRef}
							controls
							url={videoId}
							config={{
								youtube: {
									playerVars: { origin: "https://www.youtube.com" },
								},
							}}
						/>
					</Wrapper>
				</Box>
			</StyledModal>
		</>
	);
};

export default VideoWorkouts;

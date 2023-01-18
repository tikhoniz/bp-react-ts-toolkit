import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import styled from "@emotion/styled";
import { Box, Container, Grid } from "@mui/material";
import VideoCard from "./VideoCard";

//----------------------------------------------------------------------
interface ReactPlayerProps {
	width: string;
	height: string;
	ref: any;
	controls: boolean;
	playing: boolean;
	url: string | undefined;
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

const Video = ({ url, videoList }: any) => {
	const navigate = useNavigate();
	const reactPlayerRef = useRef(null);

	const onChangeVideoHandler = (url: string) => {
		navigate(`/workout-video/${url}`, { replace: true });
	};

	return (
		<Container maxWidth="xl" sx={{ px: { xs: 0, md: 2, xl: 4 } }}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={8} md={9}>
					<Wrapper>
						<StyledReactPlayer
							playing
							width="100%"
							height="100%"
							ref={reactPlayerRef}
							controls
							url={`https://youtu.be/${url}`}
							config={{
								youtube: {
									playerVars: {
										origin: window.location.origin,
										//origin: "https://www.youtube.com/",
										playsinline: 1,
									},
								},
							}}
						/>
					</Wrapper>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					{videoList.map((video: any) => (
						<Box
							key={video._id}
							onClick={() => onChangeVideoHandler(video.youtubeUrl)}
						>
							<VideoCard video={video} isLinkDisabled />
						</Box>
					))}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Video;

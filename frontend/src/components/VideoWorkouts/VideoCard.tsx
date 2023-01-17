import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { Box, Card, Typography } from "@mui/material";
import LoadableImage from "../shared/LoadableImage";
// icons
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
//----------------------------------------------------------------------

const CardMediaStyle = styled("div")(({ theme }: any) => ({
	position: "relative",
	cursor: "pointer",
	pointerEvents: "none",
	"&:hover": {
		zIndex: 299,
		position: "relative",
		boxShadow: theme.customShadows.z24,
		backgroundColor: "#00000046",
	},
}));

const CoverHoverStyle = styled("div")(({ theme }: any) => ({
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 99,
	display: "flex",
	position: "absolute",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: theme.shape.borderRadius,
	[theme.breakpoints.up("md")]: {
		"&:hover": {
			boxShadow: theme.customShadows.z24,
			backgroundColor: "#00000046",
		},
		transition: theme.transitions.create("background-color", {
			easing: theme.transitions.easing.easeIn,
			duration: theme.transitions.duration.standard,
		}),
	},
}));

const CoverHover = () => {
	return (
		<CoverHoverStyle>
			<PlayCircleOutlineIcon
				sx={{ width: "76px", height: "76px", color: "#FFFFFFDC" }}
			/>
		</CoverHoverStyle>
	);
};

const VideoCard = ({ video, isLinkDisabled = false }: any) => {
	return (
		<Card>
			<Box sx={{ p: 2, pb: 1.5 }}>
				<Typography
					variant="subtitle2"
					sx={{
						mb: 1,
						display: "-webkit-box",
						WebkitLineClamp: "1", // количество строк
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{video.title}
				</Typography>

				<Typography
					variant="body1"
					sx={{
						display: "-webkit-box",
						WebkitLineClamp: "2", // количество строк
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						color: "text.disabled",
					}}
				>
					{video.description}
				</Typography>
			</Box>

			<NavLink
				to={`/workout-video/${video._id}`}
				target="_blank"
				aria-label="video"
				onClick={isLinkDisabled ? (event) => event.preventDefault() : () => {}}
			>
				<CardMediaStyle>
					<LoadableImage
						alt={`${video.title}`}
						src={`${process.env.REACT_APP_YOUTUBE_COVER_URL}${video.coverId}.${video.coverExt}`}
						placeholderSrc={`${process.env.REACT_APP_PLACEHOLDER_YOUTUBE_COVER_URL}${video.coverId}.${video.coverExt}`}
						width="1280px"
						height="720px"
						imgStyle={{ aspectRatio: "16 / 9" }}
					/>
					<CoverHover />
				</CardMediaStyle>
			</NavLink>
		</Card>
	);
};

export default VideoCard;

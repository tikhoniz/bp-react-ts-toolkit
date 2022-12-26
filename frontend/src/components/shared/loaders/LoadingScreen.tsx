// material
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

// ----------------------------------------------------------------------

const RootStyle = styled("div")({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	zIndex: 1000,
});

// ----------------------------------------------------------------------

export default function LoadingScreen({ ...other }) {
	return (
		<RootStyle {...other}>
			<CircularProgress />
		</RootStyle>
	);
}

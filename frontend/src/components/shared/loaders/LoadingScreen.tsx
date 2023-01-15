// material
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

// ----------------------------------------------------------------------

const RootStyle = styled("div")({
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	zIndex: 9999,
	position: "fixed",
	background: "#fff",
});

// ----------------------------------------------------------------------

export default function LoadingScreen({ ...other }) {
	return <RootStyle {...other}>{/*<CircularProgress />*/}</RootStyle>;
}

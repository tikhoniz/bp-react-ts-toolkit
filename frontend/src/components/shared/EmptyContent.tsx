import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
//import IllustrationTroubleshootingIcon from "../icons/illustration_troubleshooting";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	height: "100%",
	display: "flex",
	textAlign: "center",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "center",
}));

// ----------------------------------------------------------------------

interface EmptyContentProps {
	title: string;
	imgComponent?: string;
	description: string;
	btnLink?: string;
	btnName?: string;
	sx?: any;
}

const EmptyContent: FC<EmptyContentProps> = ({
	title,
	description,
	imgComponent,
	btnLink,
	btnName,
	sx,
}) => {
	return (
		<RootStyle>
			<Box
				component="img"
				alt="icon"
				src={imgComponent || "/svg/troubleshooting.svg"}
				sx={{ ...sx }}
			/>

			<Typography variant="h5" gutterBottom>
				{title}
			</Typography>

			{description && (
				<Typography variant="body2" sx={{ color: "text.tertiary", mb: 3 }}>
					{description}
				</Typography>
			)}

			{btnName && btnLink && (
				<Button
					component={RouterLink}
					size="small"
					variant="outlined"
					to={btnLink}
					sx={{ my: 2 }}
				>
					{btnName}
				</Button>
			)}
		</RootStyle>
	);
};

export default EmptyContent;

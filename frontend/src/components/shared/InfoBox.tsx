import { ElementType, FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha, useTheme, styled, Button } from "@mui/material";
import { Grid, Container, Typography } from "@mui/material";
import LoadableImage from "./LoadableImage";
// components

interface InfoBoxProps {
	leftSide: boolean;
	image: string;
	placeholderImage: string;
	alt: string;
	head: string;
	text: string;
	btnTitle: string;
	url: string;
	icon?: ReactNode;
}

interface ButtonProps {
	children: ReactNode;
	component: ElementType;
	to: string;
	size: string;
	variant: string;
	startIcon: any;
}
//-------------------- STYLE ------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	textAlign: "center",
	marginBottom: theme.spacing(5),

	[theme.breakpoints.up("sm")]: {
		marginBottom: theme.spacing(10),
	},

	[theme.breakpoints.up("md")]: {
		marginBottom: theme.spacing(15),
	},
	//  lg: 1200, если экран больше то работает textAlign: "left",
	// иначе работает textAlign: "center",
	[theme.breakpoints.up("lg")]: {
		textAlign: "left",
	},
}));

const ButtonStyle = styled(Button as FC<ButtonProps>)(({ theme }: any) => ({
	minWidth: 245,
	marginTop: theme.spacing(7),
	letterSpacing: 1,
	textTransform: "uppercase",

	[theme.breakpoints.up("sm")]: {
		marginTop: theme.spacing(7),
	},
}));
//---------------------------------------------------------------------

const InfoBox: FC<InfoBoxProps> = ({
	url,
	alt,
	head,
	text,
	icon,
	image,
	placeholderImage,
	leftSide,
	btnTitle,
}) => {
	const theme: any = useTheme();

	const shadow = `-40px 40px 80px ${alpha(theme.palette.grey[500], 0.48)}`;

	return (
		<RootStyle>
			<Container maxWidth="xl">
				<Grid
					container
					spacing={5}
					direction={leftSide ? "row-reverse" : "row"}
				>
					<Grid item xs={12} lg={7}>
						<LoadableImage
							alt={alt}
							src={image}
							placeholderSrc={placeholderImage}
							width="1200px"
							height="675px"
							containerStyle={{
								borderRadius: theme.shape.borderRadiusMd,
								boxShadow: shadow,
							}}
							imgStyle={{
								borderRadius: theme.shape.borderRadiusMd,
								height: "auto",
							}}
						/>
					</Grid>

					<Grid item xs={12} lg={5}>
						<Typography
							variant="h2"
							fontWeight="fontWeightMedium"
							sx={{
								mb: 3,
							}}
						>
							{head}
						</Typography>

						<Typography
							sx={{
								color: "text.secondary",
								fontSize: {
									xs: "1.4rem",
									sm: "1.5rem",
									md: "2rem",
									lg: "1.6rem",
								},
							}}
						>
							{text}
						</Typography>
						<ButtonStyle
							component={RouterLink}
							size="large"
							variant="contained"
							to={url}
							startIcon={icon}
						>
							{btnTitle}
						</ButtonStyle>
					</Grid>
				</Grid>
			</Container>
		</RootStyle>
	);
};

export default InfoBox;

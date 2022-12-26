// material
import { styled, Typography, useMediaQuery, useTheme } from "@mui/material";
// animate
import { motion } from "framer-motion";
// components
import LoadableImage from "../shared/LoadableImage";

//------------------------- STYLE ------------------------------
const RootStyle = styled(motion.div)(({ theme }) => ({
	width: "100%",
	height: "100vh",
	display: "flex",
	backgroundColor: theme.palette.grey[200],

	flexDirection: "column",
	justifyContent: "center",
	marginBottom: theme.spacing(5),

	[theme.breakpoints.up("sm")]: {
		marginBottom: theme.spacing(10),
	},

	[theme.breakpoints.up("md")]: {
		marginBottom: theme.spacing(15),
	},
}));

const ContentStyle = styled(motion.div)(({ theme }) => ({
	zIndex: 9,
	display: "flex",
	flexDirection: "column",
	textAlign: "left",
	margin: "auto",
	paddingLeft: 40,
	[theme.breakpoints.up("sm")]: {
		paddingLeft: 0,
	},
	[theme.breakpoints.up("md")]: {
		alignItems: "center",
		textAlign: "center",
	},
}));

//------------------------- ANIMATION ---------------------------
const list = {
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.5,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren",
		},
	},
};

const item = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
};

const inDown = {
	hidden: { y: -200 },
	visible: {
		y: 0,
		transition: {
			duration: 1,
			ease: [0.43, 0.13, 0.23, 0.96],
		},
	},
};

const inUp = {
	hidden: { y: 200 },
	visible: {
		y: 0,
		transition: {
			duration: 1,
			ease: [0.43, 0.13, 0.23, 0.96],
		},
	},
};

//---------------------------------------------------------------

const Hero = () => {
	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<RootStyle initial="hidden" animate="visible" variants={list}>
			<LoadableImage
				alt="Женщина выполняет упражнение в большой светлой комнате"
				src={`/images/home/home-cover-image${
					isDesktop ? "" : isTablet ? "-tablet" : "-mobile"
				}.jpg`}
				placeholderSrc={`/images/home/tiny_home-cover-image${
					isDesktop ? "" : "-mobile"
				}.jpg`}
				width="1920px"
				height="1080px"
				imgStyle={{
					zIndex: 9,
					position: "absolute",
					height: "100vh",
				}}
			/>

			<ContentStyle variants={item}>
				<motion.div initial="hidden" animate="visible" variants={inDown}>
					<Typography
						component="h2"
						variant="inherit"
						gutterBottom
						sx={{
							color: "primary.main",
							fontFamily: "fontFamilySecondary",
							fontSize: { xs: "5vw", sm: "3vw", md: "2vw" },
							lineHeight: 2.2,
							letterSpacing: "1vw",
							whiteSpace: "nowrap",
							textTransform: "uppercase",
							fontWeight: "fontWeightRegular",
						}}
					>
						Online studio
					</Typography>
				</motion.div>
				<motion.div initial="hidden" animate="visible" variants={inUp}>
					<Typography
						component="h3"
						variant="inherit"
						sx={{
							color: "common.white",
							fontFamily: "fontFamilySecondary",
							textTransform: "uppercase",
							fontSize: { xs: "18vw", sm: "7vw", md: "5vw" },
							fontWeight: "fontWeightMedium",
							letterSpacing: "0.5vw",
							lineHeight: 1,
						}}
					>
						Bright&apos;s Pilates
					</Typography>
				</motion.div>
			</ContentStyle>
		</RootStyle>
	);
};

export default Hero;

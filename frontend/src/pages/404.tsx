import { Link as RouterLink } from "react-router-dom";
// material
import { Button, Container, Typography, Box, styled } from "@mui/material";
// components
import Page from "../components/shared/Page";
// animation
import { motion } from "framer-motion";
// icons
import HomeIcon from "@mui/icons-material/Home";

//-------------------- STYLE ----------------------
const RootStyle = styled(Page)(({ theme }) => ({
	display: "flex",
	minHeight: "100vh",
	alignItems: "center",
	paddingTop: theme.spacing(15),
}));
// -------------------------------------------------

const varBounceIn = {
	animate: {
		scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
		opacity: [0, 1, 1, 1, 1, 1],
		transition: {
			duration: 0.72,
			ease: [0.43, 0.13, 0.23, 0.96],
		},
	},
	exit: {
		scale: [0.9, 1.1, 0.3],
		opacity: [1, 1, 0],
	},
};

const PageNotFound = (): JSX.Element => {
	return (
		<RootStyle title="404 Страница не найдена | Bright's Pilates">
			<Container>
				<Box sx={{ maxWidth: 680, margin: "auto", textAlign: "center" }}>
					<motion.div variants={varBounceIn}>
						<Typography variant="h3" paragraph sx={{ position: "relative" }}>
							Упс! Такой страницы не существует
						</Typography>
					</motion.div>

					<RouterLink to="/">
						<Box
							component="img"
							alt="404"
							src={"/svg/404-Error.svg"}
							sx={{
								height: 360,
								my: { xs: 2, sm: 5 },
								mx: "auto",
								cursor: "pointer",
							}}
						/>
					</RouterLink>

					<Typography>
						К сожалению, мы не смогли найти нужную страницу. Возможно, вы
						ошиблись при вводе адреса? Пожалуйста, проверьте введенные данные.
					</Typography>

					<Button
						component={RouterLink}
						variant="contained"
						size="large"
						to="/"
						sx={{
							backgroundColor: "#7CC390",
							mt: 6,
							"&:hover": {
								backgroundColor: "#6AAB7D",
							},
						}}
						startIcon={<HomeIcon />}
					>
						На главную
					</Button>
				</Box>
			</Container>
		</RootStyle>
	);
};

export default PageNotFound;

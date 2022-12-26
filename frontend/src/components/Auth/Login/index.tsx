import { lazy, useState } from "react";
// animate
import { motion } from "framer-motion";
// material
import { Divider, Typography } from "@mui/material";
import { styled } from "@mui/material";
// components
const LoginForm = lazy(() => import("./LoginForm"));
const ToggleMode = lazy(() => import("./ToggleMode"));

//-------------------------- STYLE -----------------------------
const RootStyle = styled("div")(({ theme }) => ({
	position: "relative",
	width: "100%",
	display: "flex",
	padding: 24,
	marginTop: 115,
	marginBottom: 115,
	[theme.breakpoints.up("sm")]: {
		marginTop: 150,
		marginBottom: 150,
	},
}));

const ContentStyle = styled(motion.div)({
	position: "relative",
	width: "100%",
	margin: "auto",
	maxWidth: 480,
	display: "flex",
	minHeight: "100%",
	flexDirection: "column",
	justifyContent: "center",
	opacity: 0,
});

const Login = () => {
	const [isLogin, setLogin] = useState(true);
	return (
		<>
			<RootStyle>
				<ContentStyle
					animate={isLogin ? "signIn" : "signUp"}
					variants={{
						signIn: { opacity: [0, 1] },
						signUp: { opacity: [0, 1] },
					}}
					transition={{
						duration: 0.4,
						ease: "easeInOut",
					}}
				>
					<ToggleMode mode={isLogin} changeModeHandler={setLogin} />

					<Typography
						variant="h4"
						gutterBottom
						sx={{
							textAlign: "center",
							fontSize: { xs: 36, md: 30 },
						}}
					>
						{isLogin ? "Вход" : "Регистрация"}
					</Typography>

					<Divider
						sx={{
							my: 2,
							width: "100%",
							alignSelf: "center",
						}}
					>
						<Typography
							variant="subtitle2"
							sx={{
								color: "text.secondary",
							}}
						>
							ИЛИ
						</Typography>
					</Divider>

					<LoginForm isLogin={isLogin} />
				</ContentStyle>
			</RootStyle>
		</>
	);
};

export default Login;

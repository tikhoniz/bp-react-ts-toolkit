import { lazy, useState } from "react";
// animate
import { motion } from "framer-motion";
// hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
// store
import { userSliceActions } from "../../../store/reducers/UserSlice";
// material
import {
	Backdrop,
	Box,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material";
// icons
import CloseIcon from "@mui/icons-material/Close";
// components
const LoginForm = lazy(() => import("./LoginForm"));
const ToggleMode = lazy(() => import("./ToggleMode"));
const GoogleLoginButton = lazy(
	() => import("./SocialLoginButtons/GoogleLoginButton")
);
const FacebookLoginButton = lazy(
	() => import("./SocialLoginButtons/FacebookLoginButton")
);

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
	maxWidth: 360,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	opacity: 0,
});

const Login = () => {
	const dispatch = useAppDispatch();
	const { setSocialAuth } = userSliceActions;
	const { socialAuth } = useAppSelector((state: any) => state.userReducer);

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

					<Stack spacing={2}>
						<GoogleLoginButton isLogin={isLogin} />
						<FacebookLoginButton isLogin={isLogin} />
					</Stack>

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

			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
					backgroundColor: "rgba(0, 0, 0, 0.75)",
				}}
				open={!!socialAuth}
				onClick={() => dispatch(setSocialAuth(null))}
			>
				<IconButton
					onClick={() => dispatch(setSocialAuth(null))}
					sx={{
						position: "absolute",
						top: "10%",
						right: "10%",
						color: "inherit",
						zIndex: 399,
						cursor: "pointer",
					}}
				>
					<CloseIcon
						sx={{
							height: 28,
							width: "auto",
							ml: 1,
						}}
					/>
				</IconButton>
				<Stack alignItems="center" spacing={2}>
					<Box
						component="img"
						alt="logo"
						src={`/svg/social/${socialAuth}.svg`}
						sx={{ width: 414, height: 144, cursor: "pointer" }}
					/>
					<Typography>
						Осуществляется вход с аккаунтом{" "}
						{socialAuth &&
							socialAuth.replace(socialAuth[0], socialAuth[0].toUpperCase())}
					</Typography>
					<Typography
						component="span"
						variant="subtitle1"
						noWrap
						onClick={() => setSocialAuth(null)}
						sx={{
							cursor: "pointer",
							"&:hover": { textDecoration: "underline" },
						}}
					>
						Нажмите чтобы закрыть
					</Typography>
				</Stack>
			</Backdrop>
		</>
	);
};

export default Login;

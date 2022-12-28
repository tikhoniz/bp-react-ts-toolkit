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
	CircularProgress,
	Divider,
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
	maxWidth: 480,
	display: "flex",
	minHeight: "100%",
	flexDirection: "column",
	justifyContent: "center",
	opacity: 0,
});

const Login = () => {
	const dispatch = useAppDispatch();
	const { loaded } = userSliceActions;
	const { isLoading } = useAppSelector((state: any) => state.userReducer);

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
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={isLoading}
			>
				<CloseIcon
					onClick={() => dispatch(loaded())}
					sx={{
						height: 70,
						width: "auto",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 1000,
						cursor: "pointer",
					}}
				/>
				<CircularProgress color="inherit" size={100} />
			</Backdrop>
		</>
	);
};

export default Login;

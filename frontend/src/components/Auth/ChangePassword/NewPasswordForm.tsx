import { useState } from "react";
import * as Yup from "yup";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
	Box,
	Alert,
	Stack,
	Button,
	TextField,
	Typography,
	InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";
// animation
import { motion } from "framer-motion";
// store
//import { setNewPassword } from "../../../store/actionCreators/userActions";
import { userSliceActions } from "../../../store/reducers/UserSlice";
// hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
// icons
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setNewPassword } from "../../../store/actionCreators/userActions";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	position: "relative",
	width: "100%",
	display: "flex",
	padding: 24,
	marginTop: 115,

	[theme.breakpoints.up("sm")]: {
		marginTop: 150,
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
});

// ----------------------------------------------------------------------

function NewPasswordForm() {
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useAppDispatch();
	const { newPassword } = useAppSelector((state) => state.userReducer);
	const { clearSent } = userSliceActions;

	const { token } = useParams();

	const ResetPasswordSchema = Yup.object().shape({
		password: Yup.string()
			.min(4, "Пароль должен содержать не менее 4 и не более 50 символов")
			.max(50, "Пароль должен содержать не менее 4 и не более 50 символов")
			.required("* обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validationSchema: ResetPasswordSchema,
		onSubmit: async (values, { setErrors, setSubmitting }: any) => {
			if (values.password !== values.confirmPassword)
				return setErrors({ afterSubmit: "Пароли не совпадает" });

			await dispatch(setNewPassword({ password: values.password, token }));
		},
	});

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleSubmit,
		handleChange,
	}: any = formik;

	return (
		<RootStyle>
			<ContentStyle>
				<Box sx={{ maxWidth: 480, mx: "auto" }}>
					{!newPassword && (
						<>
							<Typography variant="h3" paragraph>
								Введите новый пароль
							</Typography>
							<Typography sx={{ color: "text.secondary", mb: 5 }}>
								Желательно, чтобы пароль был не супер простой и содержал не
								менее 5 знаков
							</Typography>

							<FormikProvider value={formik}>
								<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
									<Stack spacing={3}>
										{errors.afterSubmit && (
											<Alert severity="error">{errors.afterSubmit}</Alert>
										)}

										<TextField
											fullWidth
											type={showPassword ? "text" : "password"}
											label="Введите новый пароль"
											onChange={handleChange("password")}
											value={values.password.replace(/\s/g, "")}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														{showPassword ? (
															<VisibilityIcon
																sx={{
																	width: 28,
																	height: 28,
																	cursor: "pointer",
																}}
																onClick={() => setShowPassword((prev) => !prev)}
															/>
														) : (
															<VisibilityOffIcon
																sx={{
																	width: 28,
																	height: 28,
																	cursor: "pointer",
																}}
																onClick={() => setShowPassword((prev) => !prev)}
															/>
														)}
													</InputAdornment>
												),
											}}
											error={Boolean(touched.password && errors.password)}
											helperText={touched.password && errors.password}
										/>

										<TextField
											fullWidth
											type={showPassword ? "text" : "password"}
											label="Повторите пароль"
											onChange={handleChange("confirmPassword")}
											value={values.confirmPassword.replace(/\s/g, "")}
											error={Boolean(
												touched.confirmPassword && errors.confirmPassword
											)}
											helperText={
												touched.confirmPassword && errors.confirmPassword
											}
										/>

										<LoadingButton
											fullWidth
											size="large"
											type="submit"
											variant="contained"
											loading={isSubmitting}
										>
											Изменить
										</LoadingButton>
									</Stack>
								</Form>
							</FormikProvider>
						</>
					)}

					{newPassword && (
						<Box sx={{ textAlign: "center" }}>
							<ThumbUpAltIcon
								sx={{
									mt: 4,
									height: 60,
									width: 60,
								}}
							/>

							<Typography
								variant="h3"
								paragraph
								textAlign={"center"}
								sx={{ color: "success.main" }}
							>
								Успешно!
							</Typography>

							<Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
								Теперь Вы можете войти в свой аккаунт с новым паролем.
							</Typography>

							<Button
								size="large"
								variant="contained"
								endIcon={<ExitToAppIcon fontSize="large" />}
								component={RouterLink}
								to="/auth"
								onClick={() => dispatch(clearSent())}
								sx={{ mt: 5 }}
							>
								Вход
							</Button>
						</Box>
					)}
				</Box>
			</ContentStyle>
		</RootStyle>
	);
}

export default NewPasswordForm;

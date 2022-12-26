import { FC, useRef, useState } from "react";
//import { GoogleLogin } from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// построитель схем JavaScript для синтаксического анализа и проверки значений
import * as Yup from "yup";
// обнаруживает изменения элемента ввода с помощью функции
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
	Box,
	Link,
	Stack,
	TextField,
	Typography,
	InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// store
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { login, registration } from "../../../store/actionCreators/userActions";

interface LoginFormProps {
	isLogin: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ isLogin }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const captchaRef = useRef(null);
	const { isLoading } = useAppSelector((state) => state.userReducer);

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	// валидация с помощью пакета Yup
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email(
				"* адрес электронной почты должен соответствовать формату email@post.com"
			)
			.required("* обязательное поле"),
		password: Yup.string().required("* обязательное поле"),
	});

	const RegistrationSchema = Yup.object().shape({
		name: Yup.string()
			.matches(/^([^0-9]*)$/, "Имя не может содержать цифры")
			.min(1, "Слишком короткое имя!")
			.max(50, "Слишком длинное имя!")
			.required("* обязательное поле"),
		email: Yup.string()
			.email(
				"* адрес электронной почты должен соответствовать формату email@post.com"
			)
			.required("* обязательное поле"),
		password: Yup.string()
			.min(4, "Пароль должен содержать не менее 4 и не более 50 символов")
			.max(50, "Пароль должен содержать не менее 4 и не более 50 символов")
			.required("* обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			remember: true,
		},
		validationSchema: isLogin ? LoginSchema : RegistrationSchema,
		onSubmit: async (values, { resetForm }: any) => {
			const password = values.password.replace(/\s/g, "");

			if (isLogin) {
				const userData = { email: values.email, password };

				const { error } = await dispatch(login(userData));

				if (!error) navigate("/profile");
			} else {
				const userData = {
					name: values.name,
					email: values.email,
					password,
				};

				dispatch(registration(userData));

				resetForm();
			}
		},
	});

	const {
		errors,
		touched,
		values,
		handleChange,
		handleSubmit,
		getFieldProps,
	}: any = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<Box sx={{ flexGrow: 1 }}>
						<Typography>
							{isLogin
								? "Введите свой email и пароль"
								: "Введите своё имя, email и пароль"}
						</Typography>
					</Box>

					{!isLogin && (
						<TextField
							fullWidth
							autoComplete="name"
							label="Имя"
							{...getFieldProps("name")}
							error={Boolean(touched.name && errors.name)}
							helperText={touched.name && errors.name}
							disabled={isLoading}
						/>
					)}

					<TextField
						fullWidth
						autoComplete="email"
						type="email"
						label="Email"
						{...getFieldProps("email")}
						error={Boolean(touched.email && errors.email)}
						helperText={touched.email && errors.email}
						disabled={isLoading}
					/>

					<TextField
						fullWidth
						autoComplete="current-password"
						type={showPassword ? "text" : "password"}
						label="Пароль"
						onChange={handleChange("password")}
						value={values.password.replace(/\s/g, "")}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									{showPassword ? (
										<VisibilityIcon
											sx={{ width: 28, height: 28, cursor: "pointer" }}
											onClick={() => setShowPassword((prev) => !prev)}
										/>
									) : (
										<VisibilityOffIcon
											sx={{ width: 28, height: 28, cursor: "pointer" }}
											onClick={() => setShowPassword((prev) => !prev)}
										/>
									)}
								</InputAdornment>
							),
						}}
						error={Boolean(touched.password && errors.password)}
						helperText={touched.password && errors.password}
						disabled={isLoading}
					/>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="flex-end"
					sx={{ my: 2 }}
				>
					{isLogin && (
						<Link
							to="/auth/reset"
							color="inherit"
							variant="subtitle2"
							component={RouterLink}
							sx={{
								cursor: "pointer",
								color: "text.primary",
								textDecoration: "underline",
								opacity: 0.75,
								"&:hover": { opacity: 1 },
							}}
						>
							Забыли пароль?
						</Link>
					)}
				</Stack>

				<LoadingButton
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					loading={isLoading}
					disabled={!isVerified}
				>
					{isLogin ? "Вход" : "Зарегистрировать"}
				</LoadingButton>

				<Box
					sx={{
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						mt: "1rem",
						minWidth: "300px",
						minHeight: "78px",
					}}
				>
					<ReCAPTCHA
						ref={captchaRef}
						size="normal"
						sitekey={process.env.REACT_APP_RECAPTCHA_SECRET as string}
						onChange={() => setIsVerified(true)}
						onExpired={() => setIsVerified(false)}
						onErrored={() => alert("Проверьте подключение к интернету")}
					/>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default LoginForm;

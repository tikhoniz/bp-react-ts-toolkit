import * as Yup from "yup";
// notification
import { Form, FormikProvider, useFormik } from "formik";
// material
import { Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
// icons
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import LockIcon from "@mui/icons-material/Lock";
// animate
import { motion } from "framer-motion";
import { sendLinkToChangePassword } from "../../../store/actionCreators/userActions";
import SuccessSent from "./SuccessSent";

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

const ContentStyle = styled(motion.div)(({ theme }) => ({
	position: "relative",
	width: "100%",
	margin: "auto",
	maxWidth: 480,
	display: "flex",
	minHeight: "100%",
	flexDirection: "column",
	justifyContent: "center",
}));
// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
	const dispatch = useAppDispatch();
	const { isSent } = useAppSelector((state) => state.userReducer);

	const ResetPasswordSchema = Yup.object().shape({
		email: Yup.string()
			.email(
				"* адрес электронной почты должен соответствовать формату email@post.com"
			)
			.max(50, "Слишком длинный email!")
			.required("* обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: ResetPasswordSchema,
		onSubmit: async (values) => {
			try {
				await dispatch(sendLinkToChangePassword(values.email));
			} catch (error) {
				console.error(error);
			}
		},
	});

	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

	return (
		<RootStyle sx={{ overflow: "hidden" }}>
			<ContentStyle
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{!isSent && (
					<>
						<LockIcon sx={{ height: 90, width: "auto", mb: 1 }} />

						<Typography variant="h4" paragraph textAlign={"center"}>
							Забыли свой пароль?
						</Typography>

						<Typography sx={{ mb: 5, textAlign: "justify" }}>
							Ничего страшного! Просто введите свою почту, на которую был
							зарегистрирован аккаунт, и мы отправим отправим вам ссылку для
							восстановления доступа к аккаунту.
						</Typography>

						<FormikProvider value={formik}>
							<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
								<Stack spacing={3}>
									<TextField
										fullWidth
										autoComplete="username"
										{...getFieldProps("email")}
										type="email"
										label="Email"
										error={Boolean(touched.email && errors.email)}
										helperText={touched.email && errors.email}
									/>

									<LoadingButton
										fullWidth
										size="large"
										type="submit"
										variant="contained"
										loading={isSubmitting}
										startIcon={<ForwardToInboxIcon fontSize="large" />}
									>
										Получить ссылку
									</LoadingButton>
								</Stack>
							</Form>
						</FormikProvider>
					</>
				)}

				{isSent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<SuccessSent />
					</motion.div>
				)}
			</ContentStyle>
		</RootStyle>
	);
}

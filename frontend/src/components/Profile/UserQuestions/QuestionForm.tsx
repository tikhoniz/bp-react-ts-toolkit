import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
// material
import { Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// store
import { useAppDispatch } from "../../../hooks/redux";
// animation
import { motion } from "framer-motion";
import { createUserMessage } from "../../../store/actionCreators/messageActions";

const QuestionForm = ({ user }: any) => {
	const dispatch = useAppDispatch();

	// валидация с помощью пакета Yup
	const QuestionSchema = Yup.object().shape({
		subject: Yup.string().required("Напишите тему сообщения"),
		message: Yup.string().required("Длина сообщения не менее 1 знака"),
	});

	const formik = useFormik({
		initialValues: {
			user_email: "",
			user_name: "",
			subject: "",
			message: "",
			request_from: "",
		},
		validationSchema: QuestionSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			setSubmitting(true);

			const messageData = {
				user_email: user.email,
				user_name: user.name,
				subject: values.subject,
				message: values.message,
				request_from: "profile",
				createdAt: new Date(),
			};

			dispatch(createUserMessage(messageData));

			resetForm();
			setSubmitting(false);
		},
	});

	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<Card sx={{ p: 3 }}>
				<CardHeader
					title="Напишите нам! "
					subheader="Мы будем рады услышать Ваши предложения, вопросы или
					замечания."
				/>
				<CardContent>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={5}>
								<TextField
									fullWidth
									label="Тема"
									{...getFieldProps("subject")}
									error={Boolean(touched.subject && errors.subject)}
									helperText={touched.subject && errors.subject}
								/>

								<TextField
									fullWidth
									label="Cообщение"
									{...getFieldProps("message")}
									multiline
									rows={4}
									error={Boolean(touched.message && errors.message)}
									helperText={touched.message && errors.message}
								/>

								<LoadingButton
									fullWidth
									size="large"
									type="submit"
									variant="contained"
									loading={isSubmitting}
								>
									Отправить
								</LoadingButton>
							</Stack>
						</Form>
					</FormikProvider>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default QuestionForm;

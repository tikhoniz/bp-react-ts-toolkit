import { FC, useCallback, useState } from "react";
import * as Yup from "yup";
import { merge } from "lodash";

import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// TS
import { IUser } from "../../../models/IUser";
// material
import {
	Box,
	Grid,
	Card,
	Stack,
	styled,
	Button,
	Container,
	TextField,
	Typography,
	FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import SelectCoverButton from "./SelectCoverButton";
import UploadAvatar from "./UploadAvatar";
import ErrorMessage from "../../shared/messages/ErrorMessage";
// store
import { updateUser } from "../../../store/actionCreators/userActions";
import { useAppDispatch } from "../../../hooks/redux";
// utils
import { fData } from "../../../utils/formatNumber";
import {
	deleteImagePublitio,
	uploadImagePublitio,
} from "../../../utils/upload/publitio";
// data
import { countriesOptionsRu } from "../../../data/countries";

// -------------------------- INTERFACE ---------------------------------
interface UserSettingProps {
	user: IUser;
}
// ----------------------------- STYLE ----------------------------------
const CoverImgStyle = styled("img")({
	zIndex: 1,
	width: "100%",
	height: "178px",
	objectFit: "cover",
	position: "absolute",
	top: 0,
	left: 0,
});
// ----------------------------------------------------------------------

const getInitialValues = (user: any) => {
	const _user = {
		name: "",
		lastName: "",
		email: "",
		image: "",
		imageId: "",
		cover: "",
		about: "",
		country: "",
		city: "",
		phoneNumber: "",
	};

	if (user) {
		return merge({}, _user, user);
	}

	return _user;
};

const UserSetting: FC<UserSettingProps> = ({ user }): JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [error, setError]: any = useState(null);

	const UpdateUserSchema = Yup.object().shape({
		name: Yup.string()
			.matches(/^([^0-9]*)$/, "Имя не может содержать цифры")
			.min(1, "Слишком короткое имя")
			.max(20, "Слишком длинное имя")
			.required("*Обязательное поле"),
		lastName: Yup.string()
			.matches(/^([^0-9]*)$/, "Фамилия не может содержать цифры")
			.max(20, "Слишком длинная фамилия"),
		city: Yup.string().max(50, "Слишком длинное название"),
		about: Yup.string().max(
			500,
			"Слишком длинный текст ( максимум 500 знаков )"
		),
		phoneNumber: Yup.string().matches(
			/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
			"Телефонный номер может содержать только цифры длина не менее 6 и не более 14 символов"
		),
		//.max(10, "Слишком длинный номер телефона"),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: getInitialValues(user),
		validationSchema: UpdateUserSchema,

		onSubmit: async (values: any, { setErrors, setSubmitting }) => {
			const userId = values.id;
			const imageId = values.imageId;
			// обновляет профиль
			const updatedUser = {
				avatar: {
					image: values.image,
					image_id: values.imageId,
				},
				address: {
					city: values.city,
					country: values.country,
				},
				cover: values.cover,
				email: values.email,
				about: values.about,
				name: values.name,
				phone_number: values.phoneNumber,
				last_name: values.lastName,
			};

			try {
				//проверяет есть ли новое изображение
				if (values?.avatar?.file) {
					const response: any = await uploadImagePublitio({
						folder: "userAvatars",
						title: userId + "-avatar",
						publicId: userId + "-avatar",
						file: values.avatar.file,
					});

					if (!response.success) {
						setError("Не удалось загрузить аватар");
						return;
					}

					// удаляет старую картинку аватара
					imageId && deleteImagePublitio(imageId);

					updatedUser.avatar.image = response.public_id;
					updatedUser.avatar.image_id = response.id;
				}

				await dispatch(updateUser({ userId, updatedUser }));

				navigate("/profile");
			} catch (error: any) {
				setErrors({ afterSubmit: error.code });
				setSubmitting(false);
			}
		},
	});

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleSubmit,
		getFieldProps,
		setFieldValue,
	} = formik as any;

	const handleDrop = useCallback(
		(acceptedFiles: any) => {
			const file = acceptedFiles[0];

			if (file) {
				setFieldValue("avatar", {
					file: file,
					preview: URL.createObjectURL(file),
				});
			}
		},
		[setFieldValue]
	);

	return (
		<Container maxWidth="lg">
			{error && (
				<ErrorMessage data={error} clickHandler={() => setError(null)} />
			)}
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<Card
								sx={{
									pt: "213px",
									pb: 7,
									px: 3,
									textAlign: "center",
								}}
							>
								<SelectCoverButton
									user={user}
									changeHandler={(url: any) => setFieldValue("cover", url)}
									disabled={isSubmitting}
								/>

								<CoverImgStyle
									alt="profile cover"
									src={`/images/covers/${values.cover}`}
								/>

								<UploadAvatar
									accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
									data={values.avatar || values.image}
									maxSize={1700000}
									onDrop={handleDrop}
									multiple={false}
									error={Boolean(touched.avatar && errors.avatar)}
									caption={
										<Typography
											variant="body1"
											sx={{
												mt: 2,
												mx: "auto",
												display: "block",
												textAlign: "center",
											}}
										>
											Формат *.jpeg, *.jpg, *.png, *.gif максимальный размер{" "}
											{fData(1700000)}
										</Typography>
									}
								/>

								<FormHelperText error sx={{ px: 2, textAlign: "center" }}>
									{touched.avatar && errors.avatar}
								</FormHelperText>
							</Card>
						</Grid>

						<Grid item xs={12} md={8}>
							<Card sx={{ p: 3 }}>
								<Stack spacing={{ xs: 2, md: 3 }}>
									<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
										<TextField
											fullWidth
											label="Имя"
											{...getFieldProps("name")}
											error={Boolean(touched.name && errors.name)}
											helperText={touched.name && errors.name}
											disabled={isSubmitting}
										/>
										<TextField
											fullWidth
											label="Фамилия"
											{...getFieldProps("lastName")}
											error={Boolean(touched.lastName && errors.lastName)}
											helperText={touched.lastName && errors.lastName}
											disabled={isSubmitting}
										/>
									</Stack>

									<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
										<TextField
											fullWidth
											label="Телефон"
											{...getFieldProps("phoneNumber")}
											error={Boolean(touched.phoneNumber && errors.phoneNumber)}
											helperText={touched.phoneNumber && errors.phoneNumber}
											disabled={isSubmitting}
										/>

										<TextField
											fullWidth
											disabled
											label="Email"
											{...getFieldProps("email")}
										/>
									</Stack>

									<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
										<TextField
											select
											fullWidth
											label="Страна"
											placeholder="Country"
											{...getFieldProps("country")}
											SelectProps={{ native: true }}
											error={Boolean(touched.country && errors.country)}
											helperText={touched.country && errors.country}
											disabled={isSubmitting}
										>
											<option value="" />
											{countriesOptionsRu.map((option) => (
												<option key={option.code} value={option.label}>
													{option.label}
												</option>
											))}
										</TextField>

										<TextField
											fullWidth
											label="Город"
											{...getFieldProps("city")}
											disabled={isSubmitting}
										/>
									</Stack>

									<TextField
										{...getFieldProps("about")}
										fullWidth
										multiline
										minRows={4}
										maxRows={14}
										label="О себе"
										error={Boolean(touched.about && errors.about)}
										helperText={touched.about && errors.about}
										disabled={isSubmitting}
									/>
								</Stack>

								<Box
									sx={{
										mt: 3,
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Button
										variant="outlined"
										onClick={() => navigate("/profile")}
										disabled={isSubmitting}
									>
										Назад
									</Button>

									<LoadingButton
										type="submit"
										variant="contained"
										loading={isSubmitting}
									>
										Сохранить изменения
									</LoadingButton>
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>
		</Container>
	);
};

export default UserSetting;

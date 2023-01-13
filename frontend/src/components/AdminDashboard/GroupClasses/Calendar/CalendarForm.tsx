import * as Yup from "yup";
import { merge } from "lodash";
import PropTypes from "prop-types";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
	Box,
	Stack,
	Button,
	Switch,
	Tooltip,
	TextField,
	IconButton,
	DialogActions,
	FormControlLabel,
	FormControl,
	InputLabel,
	Select,
	RadioGroup,
	Radio,
	FormLabel,
	alpha,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";

import {
	LocalizationProvider,
	MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppDispatch } from "../../../../hooks/redux";
import {
	createEvent,
	deleteEvent,
	updateEvent,
} from "../../../../store/actionCreators/eventActions";
import { useEffect } from "react";

// redux

// ----------------------------------------------------------------------
const COACH_OPTIONS = ["Диана"];
const LEVEL_OPTIONS = [
	{ value: "beginer", label: "Начальный" },
	{ value: "intermediate", label: "Средний" },
	{ value: "advance", label: "Продвинутый" },
];

const getInitialValues = (event: any, range: any) => {
	const _event = {
		title: "",
		description: "",
		coach: "Диана",
		level: "beginer",
		invitationLink: "",
		conferenceId: "",
		accessCode: "",
		freeAccess: false,
		textColor: "#B78103",
		borderColor: "#B78103",
		allDay: false,
		start: range ? new Date(range.start) : new Date(),
		end: range ? new Date(range.end) : new Date(),
	};

	if (event || range) {
		return merge({}, _event, event);
	}

	return _event;
};

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
	event: PropTypes.object,
	range: PropTypes.object,
	onCancel: PropTypes.func,
};

export default function CalendarForm({ event, range, onCancel }: any) {
	const dispatch = useAppDispatch();

	const isCreating = !event;

	const EventSchema = Yup.object().shape({
		//title: Yup.string().max(255).required("Title is required"),
		//description: Yup.string().max(5000),
		title: Yup.string().required("Необходимо заполнить"),
		end: Yup.date().when(
			"start",
			(start, schema) =>
				start && schema.min(start, "End date must be later than start date")
		),
		start: Yup.date(),
	});

	const formik = useFormik({
		initialValues: getInitialValues(event, range),
		validationSchema: EventSchema,
		onSubmit: async (values, { resetForm, setSubmitting }) => {
			try {
				const newEvent = {
					title: values.title,
					description: values.description,
					textColor: values.textColor,
					borderColor: values.borderColor,
					allDay: values.allDay,
					start: values.start,
					end: values.end,
					invitationLink: values.invitationLink,
					conferenceId: values.conferenceId,
					accessCode: values.accessCode,
					//duration: values.duration,
					type: "group",
					level: values.level,
					freeAccess: values.freeAccess,
					coach: values.coach,
					avatar: "/images/coaches/diana-coach-avatar.jpg",
					urlCoach: "/coaches/diana-head-coach",
				};

				if (event) {
					await dispatch(
						updateEvent({ eventId: event._id, eventData: newEvent })
					);
				} else {
					await dispatch(createEvent(newEvent));
				}
				resetForm();
				onCancel();
				setSubmitting(false);
			} catch (error) {
				console.error(error);
			}
		},
	});

	const {
		values,
		errors,
		touched,
		handleSubmit,
		isSubmitting,
		getFieldProps,
		setFieldValue,
	}: any = formik;

	// если бесплатная тренировка устанавливает штатные данные
	useEffect(() => {
		if (values.freeAccess) {
			values.invitationLink = process.env.REACT_APP_ZOOM_INVITATION_LINK;
			values.accessCode = process.env.REACT_APP_ZOOM_MEETING_PASSWORD;
			values.conferenceId = process.env.REACT_APP_ZOOM_MEETING_NUMBER;
			values.title = "Pilates mat";
			values.textColor = "#00AB55";
			values.borderColor = "#00AB55";
		} else {
			values.textColor = "#B78103";
			values.borderColor = "#B78103";
		}
		// eslint-disable-next-line
	}, [values.freeAccess]);

	const handleDelete = async () => {
		try {
			await dispatch(deleteEvent(event._id));
			onCancel();
			//enqueueSnackbar('Delete event success', { variant: 'success' });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Stack spacing={2} sx={{ p: 3 }}>
					<Stack sx={{ p: 3, backgroundColor: alpha(values.textColor, 0.25) }}>
						<FormControlLabel
							control={
								<Switch checked={values.allDay} {...getFieldProps("allDay")} />
							}
							//labelPlacement="start"
							label="Весь день"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={values.freeAccess}
									{...getFieldProps("freeAccess")}
								/>
							}
							label="Бесплатный класс"
						/>
					</Stack>

					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						adapterLocale={ruLocale}
					>
						<MobileDateTimePicker
							label="Начало"
							value={values.start}
							inputFormat="dd/MM/yyyy HH:mm"
							onChange={(date: any) => setFieldValue("start", date)}
							renderInput={(params: any) => <TextField {...params} fullWidth />}
						/>

						<MobileDateTimePicker
							label="Окончание"
							value={values.end}
							inputFormat="dd/MM/yyyy HH:mm"
							onChange={(date: any) => setFieldValue("end", date)}
							renderInput={(params: any) => (
								<TextField
									{...params}
									fullWidth
									error={Boolean(touched.end && errors.end)}
									helperText={touched.end && errors.end}
									sx={{ mb: 3 }}
								/>
							)}
						/>
					</LocalizationProvider>

					<TextField
						fullWidth
						{...getFieldProps("title")}
						type="text"
						label="Название"
						error={Boolean(touched.title && errors.title)}
						helperText={touched.title && errors.title}
					/>

					<TextField
						fullWidth
						multiline
						maxRows={4}
						label="Описание"
						{...getFieldProps("description")}
						error={Boolean(touched.description && errors.description)}
						helperText={touched.description && errors.description}
					/>
					{/* Тренер */}
					<FormControl fullWidth>
						<InputLabel>Тренер</InputLabel>
						<Select
							label="Тренер"
							native
							{...getFieldProps("coach")}
							value={values.coach}
						>
							{COACH_OPTIONS.map((coach) => (
								<option key={coach} value={coach}>
									{coach}
								</option>
							))}
						</Select>
					</FormControl>
					{/* Сложность тренировки */}
					<FormControl fullWidth sx={{ pl: 2 }}>
						<FormLabel>Сложность тренировки</FormLabel>
						<RadioGroup {...getFieldProps("level")} row>
							{LEVEL_OPTIONS.map((lvl) => (
								<FormControlLabel
									key={lvl.value}
									value={lvl.value}
									control={<Radio />}
									label={lvl.label}
								/>
							))}
						</RadioGroup>
					</FormControl>

					{/* Ссылка-приглашение */}
					<TextField
						fullWidth
						{...getFieldProps("invitationLink")}
						type="text"
						label="Ссылка-приглашение"
						error={Boolean(touched.title && errors.title)}
						helperText={touched.title && errors.title}
						disabled={values.freeAccess}
					/>
					{/* ID конференции */}
					<TextField
						fullWidth
						{...getFieldProps("conferenceId")}
						type="text"
						label="ID конференции"
						error={Boolean(touched.title && errors.title)}
						helperText={touched.title && errors.title}
						disabled={values.freeAccess}
					/>
					{/* Код доступа */}
					<TextField
						fullWidth
						{...getFieldProps("accessCode")}
						type="text"
						label="Код доступа"
						error={Boolean(touched.title && errors.title)}
						helperText={touched.title && errors.title}
						disabled={values.freeAccess}
					/>
				</Stack>

				<DialogActions>
					{!isCreating && (
						<Tooltip title="Удалить">
							<IconButton onClick={handleDelete}>
								<DeleteForeverIcon />
							</IconButton>
						</Tooltip>
					)}
					<Box sx={{ flexGrow: 1 }} />

					<Button
						type="button"
						variant="outlined"
						color="inherit"
						onClick={onCancel}
					>
						Отменить
					</Button>

					<LoadingButton
						type="submit"
						variant="contained"
						loading={isSubmitting}
					>
						Сохранить
					</LoadingButton>
				</DialogActions>
			</Form>
		</FormikProvider>
	);
}

import { Button, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IEvent } from "../../../models/IEvent";
import { getCurrentTime, getEventTime } from "../../../utils/time";
import JoinButton from "../buttons/JoinButton";
import ActionButton from "../buttons/ActionButton";
import SingupButton from "../buttons/SingupButton";
import {
	cancelEvent,
	registerForEvent,
} from "../../../store/actionCreators/userActions";
import { eventSliceActions } from "../../../store/reducers/EventSlice";

interface ActionButtonsProps {
	event: IEvent;
}

const BUTTON_WIDTH = 150;
const MAX_TIME = 24 * 60 * 60 * 1000; // максимальное время за которое включается таймер

const ActionButtons: FC<ActionButtonsProps> = ({ event }) => {
	const { user } = useAppSelector((state) => state.userReducer);

	const dispatch = useAppDispatch();
	const { setEvent } = eventSliceActions;

	const { id: eventId, start } = event;

	const [isExpired, setExpired] = useState(false);
	const [isInvolved, setInvolved] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);

	// проверяет запись на тренировку
	const isParticipant =
		user && user.groupList?.some((id: any) => id === event?.id);

	const currentTime = getCurrentTime();

	// если время тренировки не истекло устанавливает таймер
	useEffect(() => {
		const startTimeClass = getEventTime(event?.start);
		const cancelTimeClassExpired = startTimeClass - 60 * 60 * 1000;

		if (isParticipant) {
			setInvolved(true);
			// если есть запись и время отмены меньше текущего времени
			if (cancelTimeClassExpired < currentTime) setExpired(true);
		} else {
			setInvolved(false);
		}
		// время до начала тренировки
		const t = startTimeClass - currentTime - 60 * 60 * 1000; //время оставшееся до тренировки плюс час

		if (!isExpired && t > 0 && t < MAX_TIME && isParticipant) {
			//console.log("таймер установлен на %s минут", t / 60 / 1000);
			const timer = setTimeout(() => {
				setExpired(true);
			}, t);
			return () => {
				// Таймер удаляется в случае отмены тренировки
				clearTimeout(timer);
			};
		}
		// eslint-disable-next-line
	}, [isExpired, isInvolved, isParticipant]);

	// удаление записи на тренировку
	const cancelEventHandler = async () => {
		setSubmitting(true);
		await dispatch(cancelEvent({ userId: user?.id, eventId }));
		dispatch(setEvent(null)); // нужен для отмены записи в профиле - мои тренировки
		setSubmitting(false);
	};

	// запись на тренировку
	const registerEventHandler = async () => {
		setSubmitting(true);
		await dispatch(registerForEvent({ userId: user?.id, eventId }));
		setSubmitting(false);
	};

	return (
		<>
			<Stack
				sx={{
					flexDirection: { xs: "column-reverse", sm: "row" },
					justifyContent: "space-between",
				}}
			>
				{user?.email && (
					<Button
						type="button"
						variant="outlined"
						onClick={() => dispatch(setEvent(null))}
					>
						Закрыть
					</Button>
				)}
				{user?.email && !isExpired && (
					<ActionButton
						sx={{
							minWidth: BUTTON_WIDTH,
							mb: { xs: 3, sm: 0 },
							backgroundColor: isInvolved && "warning.dark",
							"&:hover": {
								backgroundColor: isInvolved && "warning.darker",
							},
						}}
						loading={isSubmitting}
						onClick={isInvolved ? cancelEventHandler : registerEventHandler}
						label={isInvolved ? "Отменить запись" : "Записаться"}
						variant="contained"
					/>
				)}

				{isExpired && (
					<JoinButton
						sx={{
							width: "100%",
							minWidth: BUTTON_WIDTH,
							mb: { xs: 3, sm: 0 },
						}}
						classId={eventId}
						startTime={start}
						isZoomApp={user?.zoomApp || false}
					/>
				)}
			</Stack>

			{!user?.email && (
				<Stack alignItems="center" spacing={1}>
					<SingupButton
						variant="contained"
						sx={{ minWidth: 195 }}
						url="/auth"
					/>
					<Typography
						variant="body2"
						textAlign="center"
						sx={{ fontStyle: "italic", color: "text.secondary" }}
					>
						Для записи на тренировку необходимо войти в свой профиль или
						зарегистрироваться
					</Typography>
				</Stack>
			)}
		</>
	);
};

export default ActionButtons;

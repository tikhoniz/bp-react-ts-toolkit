import {
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Link,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "../../../hooks/redux";
import { IEvent } from "../../../models/IEvent";
import {
	getCurrentTime,
	getEventTime,
	humanReadableTime,
} from "../../../utils/time";

import Label from "../Label";
import ActionButtons from "./ActionButtons";

interface CalendarEventProps {
	event: IEvent;
	//onCancel: () => void;
}

const MAX_TIME = 24 * 60 * 60 * 1000; // максимальное время за которое включается таймер

const LabelStyle = styled(Typography)(({ theme }) => ({
	...theme.typography.body2,
	width: 120,
	fontSize: 14,
	flexShrink: 0,
	color: theme.palette.text.secondary,
}));

const CalendarEvent: FC<CalendarEventProps> = ({ event }) => {
	const { user } = useAppSelector((state) => state.userReducer);

	const [isExpired, setExpired] = useState(false);
	const [isInvolved, setInvolved] = useState(false);

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
			console.log("таймер установлен на %s минут", t / 60 / 1000);
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

	return (
		<Card
			sx={{
				position: "relative",
			}}
		>
			<Box sx={{ position: "relative" }}>
				{event.freeAccess && (
					<Label
						color="success"
						variant="ghost"
						sx={{
							top: 16,
							right: 16,
							zIndex: 9,
							position: "absolute",
							textTransform: "uppercase",
						}}
					>
						Бесплатный класс
					</Label>
				)}

				<CardHeader
					sx={{ pt: 5 }}
					title={event?.title}
					subheader={
						<Typography
							variant="body2"
							sx={{ display: "block", color: "text.secondary" }}
						>
							{event?.description}
						</Typography>
					}
				/>
				<CardContent>
					<Stack spacing={2}>
						<Stack direction="row" alignItems="center">
							<LabelStyle>Тренер</LabelStyle>
							<Avatar
								aria-label="coach"
								src={event?.avatar}
								component={NavLink}
								target="_blank"
								to={event?.urlCoach || ""}
							/>

							<Link
								to={event?.urlCoach || ""}
								target="_blank"
								variant="subtitle2"
								color="text.primary"
								component={NavLink}
								sx={{ ml: 2 }}
							>
								{event?.coach}
							</Link>
						</Stack>

						<Stack direction="row">
							<LabelStyle>Время</LabelStyle>
							<Typography variant="subtitle2">
								{humanReadableTime(event?.start, "ru")} -
								{humanReadableTime(event?.end, "ru")}
							</Typography>
						</Stack>

						<Stack direction="row">
							<LabelStyle>Статус</LabelStyle>
							{isInvolved ? (
								<Label
									color="warning"
									variant="ghost"
									sx={{
										textTransform: "uppercase",
									}}
								>
									участник
								</Label>
							) : (
								<Typography variant="subtitle2">нет записи</Typography>
							)}
						</Stack>

						<Divider />
						<ActionButtons event={event} />
					</Stack>
				</CardContent>
			</Box>
		</Card>
	);
};

export default CalendarEvent;

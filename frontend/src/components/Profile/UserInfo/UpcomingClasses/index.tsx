import { FC, lazy, useEffect, useState } from "react";
// store
import { userSliceActions } from "../../../../store/reducers/UserSlice";
import { eventSliceActions } from "../../../../store/reducers/EventSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
// models
import { IEvent } from "../../../../models/IEvent";
// utils
import { getCurrentTime, getEventTime } from "../../../../utils/time";
// material
import {
	Card,
	Table,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	CardHeader,
	TableContainer,
} from "@mui/material";
// animation
import { motion } from "framer-motion";
// components
import UpcomingClassRow from "./UpcomingClassRow";
// lazy component
const EmptyContent = lazy(() => import("../../../shared/EmptyContent"));
const DialogAnimate = lazy(() => import("../../../shared/DialogAnimate"));
const CalendarEvent = lazy(() => import("../../../shared/CalendarEvent"));

interface UpcomingClassesProps {
	userId: string | undefined;
	isZoom: boolean | undefined;
	groups: string[] | undefined;
}

const UpcomingClasses: FC<UpcomingClassesProps> = ({
	userId,
	isZoom,
	groups,
}): JSX.Element => {
	const [timeFirst, setTimeFirst] = useState<number>(0);

	const dispatch = useAppDispatch();
	const { clearMessage } = userSliceActions;
	const { setEvent } = eventSliceActions;
	const { event, events } = useAppSelector((state) => state.eventReducer);

	useEffect(() => {
		setTimeFirst(getEventTime(userClasses[0]?.start) || 0);

		const t =
			getEventTime(userClasses[0]?.end) -
			getEventTime(userClasses[0]?.start) -
			10 * 60 * 1000;

		const currentTime = getCurrentTime();

		if (timeFirst) {
			const timeTimer = timeFirst - currentTime + t;

			if (timeTimer > 0) {
				const timer = setTimeout(() => {
					setTimeFirst(0);
				}, timeTimer);

				return () => {
					clearTimeout(timer);
				};
			}
		}
		// eslint-disable-next-line
	}, [timeFirst]);

	const userClasses = events.reduce((acc: IEvent[], item: IEvent) => {
		const t =
			getEventTime(item.end) - getEventTime(item.start) - 10 * 60 * 1000;

		groups?.forEach((id: string) => {
			if (item.id === id && getEventTime(item.start) > getCurrentTime() - t) {
				return acc.push(item);
			}
		});

		return acc;
	}, []);

	const isEmpty = userClasses.length === 0;

	const handleCloseModal = () => {
		dispatch(setEvent(null));
		dispatch(clearMessage());
	};

	return (
		<>
			<Card
				component={motion.div}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.35 }}
			>
				<CardHeader title="Мои тренировки" sx={{ mb: 1 }} />

				{isEmpty ? (
					<EmptyContent
						title="Нет запланированных тренировок"
						description="Для записи на тренировку перейдите на страницу расписания"
						imgComponent="/svg/illustration_pilates.svg"
						btnLink="/schedule"
						btnName="Расписание"
						sx={{ height: "300px" }}
					/>
				) : (
					<TableContainer>
						<Table>
							<TableHead sx={{ position: "absolute", left: "-10000px" }}>
								<TableRow>
									<TableCell>День</TableCell>
									<TableCell></TableCell>
									<TableCell>Дата</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{userClasses.map((item) => {
									return (
										<UpcomingClassRow
											key={item.id}
											cls={item}
											userId={userId}
											zoomIsActive={isZoom}
										/>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Card>

			<DialogAnimate open={!!event} onClose={handleCloseModal}>
				{event && <CalendarEvent event={event} />}
			</DialogAnimate>
		</>
	);
};

export default UpcomingClasses;

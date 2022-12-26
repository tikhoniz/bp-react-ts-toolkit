import { FC, lazy, useEffect, useState } from "react";
// models
import { IEvent } from "../../../../models/IEvent";
// store
import { useAppDispatch } from "../../../../hooks/redux";
import { eventSliceActions } from "../../../../store/reducers/EventSlice";
import { cancelEvent } from "../../../../store/actionCreators/userActions";
// material
import { styled } from "@mui/material";
import { Stack, TableRow, TableCell, Typography } from "@mui/material";
// utils
import {
	getEventTime,
	getCurrentTime,
	humanReadableDate,
	humanReadableTime,
	humanReadableWeekday,
} from "../../../../utils/time";
// icons
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// animation
import { motion } from "framer-motion";
// components
import Loadable from "../../../shared/Loadable";
// lazy components
const JoinButton = Loadable(
	lazy(() => import("../../../shared/buttons/JoinButton"))
);
const ActionButton = Loadable(
	lazy(() => import("../../../shared/buttons/ActionButton"))
);

//--------------------------- CONSTANTS ------------------------------------------
const MAX_TIME = 24 * 60 * 60 * 1000;
const buttonWidth = 135;
//--------------------------- INTERFACE ---------------------------------
interface UpcomingClassRowProps {
	cls: IEvent;
	userId: string | undefined;
	zoomIsActive: boolean | undefined;
}
// ---------------------------- STYLE -----------------------------------

const LableStyle = styled(motion.div)(({ theme }: any) => ({
	color: theme.palette.text.secondary,
	width: 0,
	height: 0,
	borderWidth: 5,
	borderStyle: "solid",
	borderRadius: "50%",
	display: "inline-block",
}));
// ----------------------------------------------------------------------

const UpcomingClassRow: FC<UpcomingClassRowProps> = ({
	cls,
	userId,
	zoomIsActive,
}) => {
	const { id: eventId, title, start, end, freeAccess } = cls;

	const dispatch = useAppDispatch();
	const { setEvent } = eventSliceActions;

	const [isExpired, setExpired] = useState<boolean>(false);
	const [isSubmitting, setSubmitting] = useState<boolean>(false);

	// возвращает в милисекундах
	const startClass = getEventTime(start);
	const currentTime = getCurrentTime();
	const cancelTimeClassExpired = startClass - 60 * 60 * 1000;

	useEffect(() => {
		// если есть запись и время отмены меньше текущего времени
		if (cancelTimeClassExpired < currentTime) {
			setExpired(true);
		}
		//оставшееся время до начала тренировки
		const t = startClass - currentTime - 60 * 60 * 1000;
		// если время до начала тренировки не истекло и время до тренировки не больше
		// устанавливается таймер
		if (!isExpired && t > 0 && t < MAX_TIME) {
			const timer = setTimeout(() => {
				setExpired(true);
			}, t);
			return () => {
				// Таймер удаляется в случае отмены тренировки
				clearTimeout(timer);
			};
		}
		// eslint-disable-next-line
	}, [isExpired]);

	async function cancelClassHandler() {
		setSubmitting(true);
		await dispatch(cancelEvent({ userId, eventId }));
		setSubmitting(false);
	}

	const selectClassHandler = () => {
		dispatch(setEvent(eventId));
	};

	return (
		<>
			<TableRow>
				<TableCell colSpan={3}>
					<Stack
						direction="row"
						justifyContent="space-between"
						sx={{ backgroundColor: "#f4f6f8", padding: "8px 14px" }}
					>
						<Typography variant="h6">
							<time dateTime={start}>
								{humanReadableWeekday(start, "ru-RU")}
							</time>
						</Typography>
						<Typography variant="h6" noWrap>
							<time dateTime={start}>{humanReadableDate(start, "ru-RU")}</time>
						</Typography>
					</Stack>
				</TableCell>
			</TableRow>

			<TableRow
				sx={{
					cursor: "pointer",
					"&:hover": { backgroundColor: "#919eab14" },
				}}
			>
				<TableCell
					sx={{ padding: "8px 14px", width: "1px" }}
					onClick={selectClassHandler}
				>
					<Typography variant="body2" whiteSpace="nowrap">
						<time
							dateTime={start}
							style={{
								whiteSpace: "nowrap",
							}}
						>
							{humanReadableTime(start, "ru-RU")}
						</time>{" "}
						&#8209;{" "}
						<time
							dateTime={start}
							style={{
								whiteSpace: "nowrap",
							}}
						>
							{humanReadableTime(end, "ru-RU")}
						</time>
					</Typography>
				</TableCell>

				<TableCell sx={{ padding: "8px 14px" }} onClick={selectClassHandler}>
					<Stack direction="row" alignItems="center" spacing={1}>
						{freeAccess ? (
							<MoneyOffIcon sx={{ color: "success.dark" }} />
						) : (
							<AttachMoneyIcon sx={{ color: "warning.dark" }} />
						)}
						<Typography variant="body2" whiteSpace="nowrap">
							{title}
						</Typography>
					</Stack>
				</TableCell>

				<TableCell
					sx={{
						padding: "8px 14px",
						width: "1px",
						display: { xs: "none", sm: "table-cell" },
					}}
				>
					{isExpired && (
						<JoinButton
							sx={{
								py: "3px",
								width: buttonWidth,
							}}
							classId={eventId}
							startTime={start}
							isZoomApp={zoomIsActive || false}
						/>
					)}
					{!isExpired && (
						<ActionButton
							loading={isSubmitting}
							onClick={cancelClassHandler}
							label="Отменить"
							variant="contained"
							sx={{
								py: "3px",
								width: buttonWidth,
								backgroundColor: "warning.dark",
								"&:hover": {
									backgroundColor: "warning.darker",
								},
							}}
						/>
					)}
				</TableCell>

				<TableCell
					sx={{
						padding: "0px 14px",
						width: "1px",
						display: { xs: "table-cell", sm: "none" },
					}}
					onClick={selectClassHandler}
				>
					<LableStyle
						animate={{
							scale: [0.9, 1, 0.9],
							opacity: [0.3, 1, 0.3],
						}}
						transition={{
							duration: isExpired ? 1 : 2.8,
							ease: "easeInOut",
							repeat: Infinity,
						}}
						sx={{
							borderColor: isExpired ? "#188FFFC9" : "primary.main",
							borderWidth: 10,
						}}
					/>
				</TableCell>
			</TableRow>
		</>
	);
};

export default UpcomingClassRow;

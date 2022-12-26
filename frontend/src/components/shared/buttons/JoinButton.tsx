import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
// store
import { useAppDispatch } from "../../../hooks/redux";
import { getZoomMeeting } from "../../../store/actionCreators/zoomActions";
// material
import { Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// utils
import { getCurrentTime, getEventTime } from "../../../utils/time";
// animate
import { motion } from "framer-motion";
// icons
import VideocamIcon from "@mui/icons-material/Videocam";
import CountDown from "../CountDown";
import { eventSliceActions } from "../../../store/reducers/EventSlice";

interface JoinButtonProps {
	sx: object;
	classId: string;
	startTime: string;
	isZoomApp: boolean;
}

const STOP_TIME = 5;

const JoinButton: FC<JoinButtonProps> = ({
	sx,
	classId,
	startTime,
	isZoomApp,
}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { setEvent } = eventSliceActions;

	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const [minutes, setMins] = useState<string | null>(null);
	const [seconds, setSecs] = useState<string | null>(null);
	const [joinToClass, setJoinToClass] = useState<boolean>(false);
	const [isSubmitting, setSubmitting] = useState<boolean>(false);

	const startTimeClass = getEventTime(startTime);

	useEffect(() => {
		const t = startTimeClass - getCurrentTime();

		if (t >= STOP_TIME * 60 * 1000) {
			let min = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
			let sec = Math.floor((t % (1000 * 60)) / 1000);
			setMins(("0" + min).slice(-2));
			setSecs(("0" + sec).slice(-2));
		} else {
			setJoinToClass(true);
		}
	}, [minutes, seconds, startTimeClass]);

	const joinToClassHandler = async () => {
		setSubmitting(true);

		const res = await dispatch(getZoomMeeting(classId));

		// the user has a choice between the SDK and the Zoom application
		// always used Zoom app on mobile screen
		if (isZoomApp || !isDesktop) {
			window.open(res.payload.invitationLink, "_blank");
			dispatch(setEvent(null));
			setSubmitting(false);
			return;
		}
		dispatch(setEvent(null));
		navigate("/zoom");
		setSubmitting(false);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.9 }}
		>
			<LoadingButton
				variant="contained"
				color="info"
				startIcon={
					<VideocamIcon
						sx={{
							color: "common.white",
							width: "24px",
							height: "24px",
						}}
					/>
				}
				sx={{
					...sx,
					"&.Mui-disabled": {
						background: "#188FFFC9",
					},
				}}
				loading={isSubmitting}
				onClick={joinToClassHandler}
				disabled={!joinToClass}
			>
				{joinToClass ? (
					<Typography variant="subtitle2" sx={{ color: "common.white" }}>
						Начать
					</Typography>
				) : (
					minutes && (
						<CountDown
							hours={0}
							minutes={minutes}
							seconds={seconds}
							stopTime={STOP_TIME}
							stopTimer={() => setJoinToClass(true)}
							sx={{ color: "common.white", pr: "14px", width: 40 }}
						/>
					)
				)}
			</LoadingButton>
		</motion.div>
	);
};

export default JoinButton;

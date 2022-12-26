import { FC, useEffect, useState } from "react";
// material
import { Typography } from "@mui/material";

interface CountDownProps {
	hours: any;
	minutes: any;
	seconds: any;
	stopTime?: any;
	sx?: object;
	stopTimer: () => void;
}

const CountDown: FC<CountDownProps> = ({
	hours = 0,
	minutes = 0,
	seconds = 0,
	stopTime = 0,
	stopTimer,
	sx,
}) => {
	const [[h, m, s], setTime] = useState([hours, minutes, seconds]);

	const tick = () => {
		if (m < stopTime) {
			stopTimer();
		} else if (m === 0 && s === 0) {
			setTime([h - 1, 59, 59]);
		} else if (s === 0) {
			setTime([h, m - 1, 59]);
		} else {
			setTime([h, m, s - 1]);
		}
	};

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	return (
		<Typography
			variant="body1"
			component="span"
			whiteSpace="nowrap"
			sx={{ ...sx }}
		>
			{h > 0 && `${h.toString().padStart(2, "0")}:`}
			{`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`}
		</Typography>
	);
};

export default CountDown;

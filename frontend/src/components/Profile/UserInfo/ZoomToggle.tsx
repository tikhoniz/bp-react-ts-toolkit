import { FC, useState } from "react";
// store
import { changeZoomMode } from "../../../store/actionCreators/userActions";
// hooks
import { useAppDispatch } from "../../../hooks/redux";
// material
import {
	Box,
	Card,
	Fade,
	Link,
	Stack,
	Switch,
	Tooltip,
	Typography,
	FormControlLabel,
	CircularProgress,
} from "@mui/material";

interface ZoomToggleProps {
	isZoom: boolean;
	userId: string;
}

const ZoomToggle: FC<ZoomToggleProps> = ({ isZoom, userId }) => {
	const [isSubmitting, setSubmitting] = useState(false);

	const dispatch = useAppDispatch();

	const toogleModeHandler = async (mode: boolean) => {
		setSubmitting(true);
		await dispatch(changeZoomMode({ userId, mode }));
		setSubmitting(false);
	};

	return (
		<Card sx={{ pt: 4, pb: 2, px: 2, position: "relative" }}>
			<Tooltip
				title={
					<Typography
						variant="subtitle1"
						sx={{ position: "relative", m: 1, textAlign: "justify" }}
					>
						Если данная опция активирована, тренировка будет проходить в
						приложении
						<Link
							underline="always"
							href="https://zoom.us/download"
							target="_blank"
							variant="h4"
							sx={{
								position: "absolute",
								top: "40px",
								left: "99px",
								ml: 1,
							}}
						>
							ZOOM
						</Link>
					</Typography>
				}
				arrow
				placement="top"
				TransitionComponent={Fade}
				TransitionProps={{ timeout: 300 }}
				leaveDelay={1000}
			>
				<Box
					component="img"
					src="/svg/info.svg"
					sx={{
						position: "absolute",
						right: "8px",
						top: "8px",
						cursor: "help",
						width: "24px",
						height: "24px",

						"&:hover": { opacity: 0.6 },
					}}
				/>
			</Tooltip>

			<FormControlLabel
				labelPlacement="start"
				control={
					<Stack direction="row" spacing={1} alignItems="center">
						{isSubmitting && (
							<CircularProgress color="info" size={28} thickness={5} />
						)}
						<Switch
							onChange={(event) => toogleModeHandler(event.target.checked)}
							checked={isZoom}
							color="info"
						/>
					</Stack>
				}
				label={
					<Box
						component="img"
						src="/svg/zoom_full-icon.svg"
						sx={{
							width: "120px",
							height: "60px",
							opacity: !isZoom ? 0.3 : 1,
						}}
					/>
				}
				sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
			/>
		</Card>
	);
};

export default ZoomToggle;

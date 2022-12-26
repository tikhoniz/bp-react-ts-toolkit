import { FC } from "react";
// material
import {
	Box,
	Stack,
	Button,
	Tooltip,
	IconButton,
	Typography,
	ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material";
// components
import MHidden from "../../@material-extend/MHidden";
//icons
import ViewDayIcon from "@mui/icons-material/ViewDay";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

interface CalendarToolbarProps {
	view: string;
	onNextDate: () => void;
	onPrevDate: () => void;
	onToday: () => void;
	onChangeView: (arg: string) => void;
	title: string;
}

const VIEW_OPTIONS = [
	{
		value: "dayGridMonth",
		label: "Месяц",
		icon: <ViewModuleIcon fontSize="medium" />,
	},
	{
		value: "listWeek",
		label: "Список",
		icon: <ViewHeadlineIcon fontSize="medium" />,
	},
	{
		value: "timeGridDay",
		label: "День",
		icon: <ViewDayIcon fontSize="medium" />,
	},
];

const RootStyle = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	flexDirection: "column-reverse",
	padding: theme.spacing(3, 0),
	[theme.breakpoints.up("md")]: {
		flexDirection: "row",
		padding: theme.spacing(1.75, 3),
		justifyContent: "space-between",
	},
}));

const CalendarToolbar: FC<CalendarToolbarProps> = ({
	view,
	onNextDate,
	onPrevDate,
	onToday,
	onChangeView,
	title,
}) => {
	return (
		<RootStyle>
			<MHidden width="mdDown">
				<Stack direction="row" spacing={1.5}>
					{VIEW_OPTIONS.map((viewOption) => (
						<Tooltip key={viewOption.value} title={viewOption.label}>
							<ToggleButton
								value={view}
								selected={viewOption.value === view}
								onChange={() => onChangeView(viewOption.value)}
								sx={{ width: 32, height: 32, padding: 0 }}
							>
								{viewOption.icon}
							</ToggleButton>
						</Tooltip>
					))}
				</Stack>
			</MHidden>

			<Typography
				variant="h4"
				sx={{
					my: { xs: 1, md: 0 },
				}}
			>
				{title}
			</Typography>

			<Box sx={{ display: "flex", alignItems: "center" }}>
				<IconButton
					onClick={onPrevDate}
					sx={{
						width: 45,
						height: 45,
					}}
				>
					<ArrowCircleLeftIcon fontSize="large" />
				</IconButton>

				<Button variant="contained" onClick={onToday} sx={{ mx: 0.5 }}>
					Сегодня
				</Button>

				<IconButton
					onClick={onNextDate}
					sx={{
						width: 45,
						height: 45,
					}}
				>
					<ArrowCircleRightIcon fontSize="large" />
				</IconButton>
			</Box>
		</RootStyle>
	);
};

export default CalendarToolbar;

// material
import { Stack, TableRow, TableCell, Typography } from "@mui/material";
// utils
import {
	humanReadableDate,
	humanReadableTime,
	humanReadableWeekday,
} from "../../../../utils/time";
// icons
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ComletedClassRow = ({ cls }: any) => {
	const { coach, title, start, freeAccess } = cls;

	return (
		<TableRow>
			<TableCell sx={{ padding: "8px 14px" }}>
				<Stack sx={{ whiteSpace: "nowrap" }}>
					<time dateTime={start}>{humanReadableWeekday(start, "ru-RU")}</time>
					<time dateTime={start}>{humanReadableDate(start, "ru-RU")}</time>
					<time dateTime={start}>в {humanReadableTime(start, "ru-RU")}</time>
				</Stack>
			</TableCell>

			<TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
				{title}
			</TableCell>

			<TableCell sx={{ padding: "8px 14px" }}>
				<Typography variant="subtitle2">{coach}</Typography>
			</TableCell>

			<TableCell>
				{freeAccess ? (
					<MoneyOffIcon sx={{ color: "success.dark", fontSize: 40 }} />
				) : (
					<AttachMoneyIcon sx={{ color: "warning.dark", fontSize: 40 }} />
				)}
			</TableCell>
		</TableRow>
	);
};

export default ComletedClassRow;

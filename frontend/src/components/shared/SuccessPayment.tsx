import { FC, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Button, Divider, Typography, Stack } from "@mui/material";
// utils
import { shootFireworks } from "../../utils/shootFireworks";
// icons
import PersonIcon from "@mui/icons-material/Person";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ScheduleIcon from "@mui/icons-material/Schedule";

interface SuccessPaymentProps {
	description: string;
}

const SuccessPayment: FC<SuccessPaymentProps> = ({ description }) => {
	useEffect(() => {
		shootFireworks();
	}, []);

	return (
		<Box sx={{ p: 4, maxWidth: 480, margin: "auto" }}>
			<Box sx={{ textAlign: "center" }}>
				<TaskAltIcon sx={{ color: "success.dark", fontSize: 50 }} />

				<Typography variant="h3" paragraph>
					Оплачено!
				</Typography>

				<Typography variant="h4" paragraph>
					<span>{description}</span>
				</Typography>

				<Box component="img" src="/svg/payment/icon_success_payment.svg" />

				<Stack
					direction={{ xs: "column", sm: "row" }}
					alignItems="center"
					justifyContent="space-between"
					spacing={1}
				>
					<Typography variant="h5" align="left">
						До встречи на занятиях,
					</Typography>

					<Button
						size="large"
						component={RouterLink}
						variant="contained"
						to="/schedule"
						startIcon={<ScheduleIcon />}
					>
						Расписание
					</Button>
				</Stack>
			</Box>
			<Divider sx={{ my: 4 }} />
			<Button
				fullWidth
				size="large"
				variant="outlined"
				component={RouterLink}
				to="/profile"
				startIcon={<PersonIcon />}
			>
				Вернуться в профиль
			</Button>
		</Box>
	);
};

export default SuccessPayment;

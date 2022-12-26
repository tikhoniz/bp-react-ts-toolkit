// notification
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Button, Typography } from "@mui/material";
// store
import { userSliceActions } from "../../../store/reducers/UserSlice";
// hooks
import { useAppDispatch } from "../../../hooks/redux";
// icons
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const SuccessSent = () => {
	const dispatch = useAppDispatch();
	const { clearSent } = userSliceActions;

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				textAlign: "center",
				padding: 4,
			}}
		>
			<Box
				component="img"
				alt="sent icon"
				src={"/svg/sent-mail.svg"}
				sx={{ width: 160, height: 160, m: "0 auto" }}
			/>

			<Typography variant="h4" gutterBottom>
				Успешно!
			</Typography>
			<Typography sx={{ mb: 5, textAlign: "justify" }}>
				Мы отправили ссылку на восстановление пароля. Пожалуйста, проверьте свой
				почтовый ящик. Если письмо со ссылкой не пришло в течении 5 минут,
				проверьте папку &quot;СПАМ&quot; !
			</Typography>

			<Button
				size="large"
				variant="contained"
				component={RouterLink}
				to="/auth"
				sx={{ mt: 5 }}
				onClick={() => dispatch(clearSent())}
				startIcon={<DoneOutlineIcon fontSize="large" />}
			>
				OK
			</Button>
		</Box>
	);
};

export default SuccessSent;

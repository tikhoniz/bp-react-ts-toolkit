import { Button, Stack, styled, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { policySliceActions } from "../../../store/reducers/PolicySlice";
import CookiePolicy from "../../Policy/CookiePolicy";

interface CookieNotificationProps {
	clickHandler: () => void;
}

const RootStyle = styled(motion.div)({
	width: "100%",
	backgroundColor: "#14131b",
	color: "#fff",
});

const CookieNotification: FC<CookieNotificationProps> = ({ clickHandler }) => {
	const dispatch = useAppDispatch();
	const { openPolicy } = policySliceActions;

	const openPolicyHandler = () => {
		dispatch(
			openPolicy({
				component: <CookiePolicy />,
				title: "Политика файлов Cookies",
			})
		);
	};

	return (
		<RootStyle
			initial={{ position: "fixed", opacity: 0, zIndex: 999, bottom: 0 }}
			animate={{
				opacity: 1,
			}}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
				sx={{ px: 2, py: 1 }}
			>
				<Typography variant="subtitle1">
					Мы используем cookie. Продолжая использовать сайт, Вы даете свое
					согласие на использование cookie для хранения данных. Подробнее:
					<Typography
						component="span"
						variant="subtitle1"
						color="primary.main"
						noWrap
						onClick={openPolicyHandler}
						sx={{
							cursor: "pointer",
							"&:hover": { textDecoration: "underline" },
							ml: 1,
						}}
					>
						Политика cookie файлов
					</Typography>
				</Typography>

				<Button
					type="button"
					size="medium"
					variant="contained"
					onClick={clickHandler}
					color="inherit"
					sx={{
						width: { xs: "100%", sm: "auto" },
						minWidth: 90,
					}}
				>
					Хорошо
				</Button>
			</Stack>
		</RootStyle>
	);
};

export default CookieNotification;

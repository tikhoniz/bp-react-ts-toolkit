import { Stack, styled, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
			initial={{ position: "fixed", bottom: -100 }}
			animate={{
				y: -100,
				zIndex: 999,
			}}
			exit={{ y: 100 }}
			transition={{ duration: 0.5 }}
		>
			<Stack direction="row" justifyContent="space-between" spacing={2}>
				<Typography variant="subtitle1" sx={{ m: 1, textAlign: "center" }}>
					Продолжая использовать brightspilates.com, Bы соглашаетесь на
					использование файлов cookie. Более подробную информацию можно найти в
					<Typography
						component="span"
						variant="subtitle1"
						color="primary.main"
						noWrap
						onClick={openPolicyHandler}
						sx={{
							fontFamily: "fontFamilySecondary",
							cursor: "pointer",
							"&:hover": { textDecoration: "underline" },
							ml: 1,
						}}
					>
						Политике cookie файлов
					</Typography>
				</Typography>

				<CloseIcon
					sx={{
						width: 32,
						height: 32,
						cursor: "pointer",
					}}
					onClick={clickHandler}
				/>
			</Stack>
		</RootStyle>
	);
};

export default CookieNotification;

import { Alert, IconButton, styled, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FC, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface MessageProps {
	message: string;
	clickHandler: () => void;
}

const RootStyle = styled(motion.div)({
	width: "100%",
});

const Message: FC<MessageProps> = ({ message, clickHandler }) => {
	const cancel = message === "Запись на тренировку отменена";

	useEffect(() => {
		const timer = setTimeout(() => {
			clickHandler();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [clickHandler]);

	return (
		<RootStyle
			initial={{ position: "fixed", top: -40 }}
			animate={{
				y: 40,
				zIndex: 999,
			}}
			exit={{ y: -40 }}
			transition={{ duration: 0.5 }}
		>
			<Alert
				severity={cancel ? "warning" : "success"}
				variant="filled"
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={clickHandler}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
			>
				<Typography variant="subtitle1">{message}</Typography>
			</Alert>
		</RootStyle>
	);
};

export default Message;

import { FC, useEffect } from "react";
// animation
import { motion, AnimatePresence } from "framer-motion";
// material
import { Alert, IconButton, Stack, styled, Typography } from "@mui/material";
// icons
import CloseIcon from "@mui/icons-material/Close";

interface ErrorMessageProps {
	data: { message: string; status: number };
	clickHandler: () => void;
}

const RootStyle = styled(motion.div)({
	width: "100%",
});

const ErrorMessage: FC<ErrorMessageProps> = ({ data, clickHandler }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			clickHandler();
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [clickHandler]);

	return (
		<AnimatePresence>
			<RootStyle
				initial={{ position: "fixed", top: -40 }}
				animate={{
					y: 40,
					zIndex: 1999,
				}}
				exit={{ x: 400 }}
				transition={{ duration: 0.35 }}
			>
				<Alert
					severity="error"
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
					<Stack direction="row" spacing={1} alignItems="center">
						<Typography variant="subtitle2">ОШИБКА:</Typography>
						<Typography variant="subtitle2">{data.message}</Typography>
					</Stack>
				</Alert>
			</RootStyle>
		</AnimatePresence>
	);
};

export default ErrorMessage;

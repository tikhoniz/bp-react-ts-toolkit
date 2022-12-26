import { motion, AnimatePresence } from "framer-motion";
// material
import { Dialog } from "@mui/material";
import React, { FC } from "react";

interface DialogAnimateProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const DISTANCE = 120;

const TRANSITION_ENTER = {
	duration: 0.64,
	ease: [0.43, 0.13, 0.23, 0.96],
};
const TRANSITION_EXIT = {
	duration: 0.48,
	ease: [0.43, 0.13, 0.23, 0.96],
};

const varFadeInUp = {
	initial: { y: DISTANCE, opacity: 0 },
	animate: { y: 0, opacity: 1, transition: TRANSITION_ENTER },
	exit: { y: DISTANCE, opacity: 0, transition: TRANSITION_EXIT },
};

const DialogAnimate: FC<DialogAnimateProps> = ({
	open = false,
	onClose,
	children,
}) => {
	return (
		<AnimatePresence>
			{open && (
				<Dialog
					fullWidth
					maxWidth="xs"
					open={open}
					onClose={onClose}
					PaperComponent={motion.div as any}
					PaperProps={{
						sx: {
							borderRadius: 2,
							bgcolor: "background.paper",
						},
						...varFadeInUp,
					}}
				>
					{children}
				</Dialog>
			)}
		</AnimatePresence>
	);
};

export default DialogAnimate;

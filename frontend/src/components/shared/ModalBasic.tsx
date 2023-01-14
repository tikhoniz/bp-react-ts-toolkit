import { FC } from "react";
// material
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { ModalUnstyled } from "@mui/base";
import { styled } from "@mui/material";
// icons
import CloseIcon from "@mui/icons-material/Close";

const StyledModal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10%;
`;

const Backdrop = styled("div")`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.8);
	-webkit-tap-highlight-color: transparent;
`;

interface ModalBasicProps {
	open: boolean;
	title?: string;
	onClose: () => void;
	children: React.ReactElement;
	sx?: any;
}

const ModalBasic: FC<ModalBasicProps> = ({
	open,
	title,
	onClose,
	children,
	sx,
}) => {
	return (
		<StyledModal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			slots={{ backdrop: Backdrop }}
			closeAfterTransition={true}
			sx={{ ...sx }}
		>
			<Card
				sx={{
					position: "relative",
					minWidth: "300px",
					maxWidth: "1536px",
					maxHeight: "100%",
					overflowY: "scroll",
				}}
			>
				<CardHeader
					title={title}
					action={
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					}
					sx={{
						position: "sticky",
						top: " 0px",
						backgroundColor: "#ffffff",
						paddingY: 3,
						borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
					}}
				/>

				<CardContent>{children}</CardContent>
			</Card>
		</StyledModal>
	);
};

export default ModalBasic;

import { FC, useRef, useState } from "react";
// material
import { alpha, Avatar, IconButton } from "@mui/material";
// components
import PersonIcon from "@mui/icons-material/Person";
import { IUser } from "../../models/IUser";
import LoadableImage from "../shared/LoadableImage";
import MenuPopover from "./MenuPopover";

interface AccountPopoverProps {
	user: IUser;
}

const AccountPopover: FC<AccountPopoverProps> = ({ user }) => {
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					padding: 0,
					width: 46,
					height: 46,
					...(open && {
						"&:before": {
							zIndex: 1,
							content: "''",
							width: "100%",
							height: "100%",

							borderRadius: "50%",
							position: "absolute",
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
						},
					}),
				}}
			>
				<Avatar sx={{ width: "44px", height: "44px" }}>
					{user?.image ? (
						<LoadableImage
							src={`${process.env.REACT_APP_AVATAR_URL + user?.image}.jpg`}
							placeholderSrc={`${
								process.env.REACT_APP_PLACEHOLDER_AVATAR_URL + user?.image
							}.jpg`}
							alt={user?.name}
							containerStyle={{
								top: 0,
								width: "100%",
								height: "100%",
								position: "absolute",
							}}
						/>
					) : (
						<PersonIcon
							sx={{
								width: "90%",
								height: "90%",
							}}
						/>
					)}
				</Avatar>
			</IconButton>

			<MenuPopover
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				sx={{ width: 220 }}
				user={user}
			/>
		</>
	);
};

export default AccountPopover;

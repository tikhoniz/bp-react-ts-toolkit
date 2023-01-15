import { FC, lazy, useEffect, useState } from "react";
// models
import { IUser } from "../../models/IUser";
// material
import { Box, Drawer, IconButton } from "@mui/material";
// components

// data
import { menuMobile } from "../../data/menuConfig";
// icons
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// lazy components
const MenuMobileItem = (lazy(() => import("./MenuMobileItem")));

interface MenuMobileProps {
	pathname: string;
	user: IUser | null;
}

const MenuMobile: FC<MenuMobileProps> = ({ pathname, user }): JSX.Element => {
	//const iOS =
	//	typeof navigator !== "undefined" &&
	//	/iPad|iPhone|iPod/.test(navigator.userAgent);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			handleDrawerClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			<IconButton
				onClick={handleDrawerOpen}
				sx={{ position: "absolute", left: 20 }}
			>
				{open ? (
					<MenuOpenIcon sx={{ fontSize: 45 }} color="action" />
				) : (
					<MenuIcon sx={{ fontSize: 45 }} color="action" />
				)}
				<span className="visually-hidden">burger menu</span>
			</IconButton>

			<Drawer
				open={open}
				onClose={handleDrawerClose}
				ModalProps={{ keepMounted: true }}
				PaperProps={{ sx: { pb: 5, width: 260 } }}
			>
				<Box
					component="img"
					alt="empty content"
					src="/svg/logo-bp-reverse.svg"
					sx={{
						width: 44,
						height: 44,
						cursor: "pointer",
						ml: { xs: 2, sm: 3 },
						mb: 3,
						mt: "22px",
					}}
				/>

				{menuMobile.map((link): any => {
					if (link.path === "/auth" && user) return null;
					return (
						<MenuMobileItem key={link.title} item={link} pathname={pathname} />
					);
				})}
			</Drawer>
		</>
	);
};

export default MenuMobile;

import { FC, lazy } from "react";
// models
import { IUser } from "../../models/IUser";
// material
import { Stack } from "@mui/material";
// components
// config
import { menuDesktop } from "../../data/menuConfig";
// lazy components
const MenuDesktopItem = (lazy(() => import("./MenuDesktopItem")));

interface MenuDesktopProps {
	user: IUser | null;
	isHome: boolean;
	pathname: string;
	isOffset: boolean;
}

const MenuDesktop: FC<MenuDesktopProps> = ({
	user,
	isHome,
	pathname,
	isOffset,
}): JSX.Element => {
	return (
		<Stack direction="row" marginRight={5}>
			{menuDesktop.map((link): any => {
				if (link.path === "/auth" && user) return null;
				return (
					<MenuDesktopItem
						key={link.title}
						item={link}
						pathname={pathname}
						isOffset={isOffset}
						isHome={isHome}
					/>
				);
			})}
		</Stack>
	);
};

export default MenuDesktop;

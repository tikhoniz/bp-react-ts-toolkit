import { FC } from "react";
import { NavLink } from "react-router-dom";
// material
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { alpha, styled } from "@mui/material";

//----------------------------------------------------------------------
const ITEM_SIZE = 48;
const PADDING = 1.5;

const LinkStyle = styled(NavLink)(({ theme }) => ({
	...theme.typography.subtitle1,
	height: ITEM_SIZE,
	textTransform: "capitalize",
	textDecoration: "none",
	letterSpacing: 1,
	paddingLeft: theme.spacing(PADDING),
	color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

interface MenuMobileItemProps {
	pathname: string;
	item: { icon: React.ReactElement; title: string; path: string };
}

const MenuMobileItem: FC<MenuMobileItemProps> = ({
	item,
	pathname,
}): JSX.Element => {
	const { icon, title, path } = item;
	const isActive = pathname === path;

	return (
		<LinkStyle
			to={path}
			sx={{
				...(isActive && {
					color: "primary.main",
					fontWeight: "fontWeightBold",

					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.selectedOpacity
						),
				}),
			}}
		>
			<ListItemButton>
				<ListItemIcon
					sx={{
						...(isActive && {
							color: "primary.main",
						}),
					}}
				>
					{icon}
				</ListItemIcon>
				<ListItemText disableTypography primary={title} />
			</ListItemButton>
		</LinkStyle>
	);
};

export default MenuMobileItem;

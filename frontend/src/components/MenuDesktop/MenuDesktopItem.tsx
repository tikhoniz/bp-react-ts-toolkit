import { NavLink } from "react-router-dom";
// material
import { styled } from "@mui/material";

//---------------------------- STYLES -----------------------------------
const LinkStyle = styled(NavLink)(({ theme }) => ({
	fontWeight: theme.typography.fontWeightRegular,
	color: theme.palette.text.primary,
	marginRight: theme.spacing(5),
	transition: theme.transitions.create("opacity", {
		duration: theme.transitions.duration.shortest,
	}),
	cursor: "pointer",
	textDecoration: "none",
	letterSpacing: 1,
	"&:hover": {
		opacity: 0.48,
	},
}));
// ----------------------------------------------------------------------

const MenuDesktopItem = ({
	item,
	pathname,
	isHome,
	isOffset,
}: any): JSX.Element => {
	const { title, path } = item;
	const isActive = pathname === path;
	return (
		<LinkStyle
			to={path}
			sx={{
				fontWeight: "fontWeightMedium",
				...(isHome && { color: "common.white" }),
				...(isOffset && { color: "text.primary" }),
				...(isActive && {
					color: "primary.main",
				}),
			}}
		>
			{title}
		</LinkStyle>
	);
};

export default MenuDesktopItem;

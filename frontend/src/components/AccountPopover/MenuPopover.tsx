import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// material
import {
	Box,
	Button,
	Divider,
	Popover,
	MenuItem,
	Typography,
	Stack,
} from "@mui/material";
import { alpha, styled } from "@mui/material";
// store
//import { useAppDispatch } from "../../../../hooks/redux";
//import { logout } from "../../../../store/actionCreators/userActions";
// icons
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAppDispatch } from "../../hooks/redux";
import { logout } from "../../store/actionCreators/userActions";

interface MenuItemProps {
	children: React.ReactNode;
	onClick: () => void;
	component: React.ElementType;
	to: string;
}

const SIZE_ICON = "medium";
const COLOR_ICON = "secondary";
// ----------------------------------------------------------------------

const ArrowStyle = styled("span")(({ theme }: any) => ({
	[theme.breakpoints.up("sm")]: {
		top: -7,
		zIndex: 1,
		width: 12,
		right: 20,
		height: 12,
		content: "''",
		position: "absolute",
		borderRadius: "0 0 4px 0",
		transform: "rotate(-135deg)",
		background: theme.palette.background.paper,
		borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
		borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
	},
}));

const MenuItemStyle = styled(MenuItem as React.FC<MenuItemProps>)(
	({ theme }): any => ({
		color: theme.palette.text.primary,
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		paddingLeft: theme.spacing(2.5),
		paddingRight: theme.spacing(2.5),
	})
);

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	{
		label: "Профиль",
		icon: <AccountBoxIcon fontSize={SIZE_ICON} color={COLOR_ICON} />,
		linkTo: "/profile",
	},
	{
		label: "Настройка",
		icon: <SettingsIcon fontSize={SIZE_ICON} color={COLOR_ICON} />,
		linkTo: "/profile/settings",
	},
	{
		label: "Админ панель",
		icon: <AdminPanelSettingsIcon fontSize={SIZE_ICON} color={COLOR_ICON} />,
		linkTo: "/admin-dashboard",
		admin: true,
	},
];

export default function MenuPopover({
	user,
	children,
	sx,
	onClose,
	...other
}: any) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const item = localStorage.getItem("roles");
	let roles = [];
	if (item) {
		roles = JSON.parse(item);
	}
	const isAdmin = roles.includes(process.env.REACT_APP_ADMIN);

	const logOut = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<Popover
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			PaperProps={{
				sx: {
					mt: 1.5,
					ml: 0.5,
					overflow: "inherit",
					boxShadow: (theme: any) => theme.customShadows.z20,
					border: (theme: any) => `solid 1px ${theme.palette.grey[500_8]}`,
					width: 200,
					...sx,
				},
			}}
			onClick={onClose}
			{...other}
		>
			<ArrowStyle />
			<Box sx={{ my: 1.5, px: 2.5 }}>
				<Typography variant="subtitle1" noWrap>
					{user?.name}
				</Typography>
				<Typography variant="body2" noWrap sx={{ color: "text.tertiary" }}>
					{user?.email}
				</Typography>
			</Box>

			<Divider sx={{ my: 1 }} />

			{MENU_OPTIONS.map((option) => {
				if (option?.admin && !isAdmin) return null;
				return (
					<MenuItemStyle
						onClick={onClose}
						key={option.label}
						component={NavLink}
						to={option.linkTo}
					>
						{/*<Box
							component={"img"}
							src={option.icon}
							sx={{
								mr: 2,
								width: 26,
								height: 26,
							}}
						/>*/}
						{/*<Box
							sx={{
								mr: 2,
								//width: 26,
								//height: 26,
							}}
						>*/}
						<Stack direction="row" spacing={2}>
							{option.icon}
							{/*</Box>*/}
							<Typography>{option.label}</Typography>
						</Stack>
					</MenuItemStyle>
				);
			})}

			<Box sx={{ p: 2, pt: 1.5 }}>
				<Button fullWidth color="inherit" variant="outlined" onClick={logOut}>
					Выйти
				</Button>
			</Box>
		</Popover>
	);
}

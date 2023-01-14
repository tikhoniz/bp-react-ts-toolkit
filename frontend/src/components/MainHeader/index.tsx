import { lazy } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { AppBar, Box, Container, styled, Toolbar } from "@mui/material";
import useOffSetTop from "../../hooks/useOffSetTop";
// style
import { customShadows } from "../../theme/shadows";
// hooks
import { useAppSelector } from "../../hooks/redux";
// components
import Loadable from "../shared/Loadable";
import MHidden from "../@material-extend/MHidden";
// lazy components
const AccountPopover = Loadable(lazy(() => import("../AccountPopover")));
const MenuDesktop = Loadable(lazy(() => import("../MenuDesktop")));
const MenuMobile = Loadable(lazy(() => import("../MenuMobile")));

const APP_BAR_DESKTOP = "72px";

//----------------------------
const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
	transition: theme.transitions.create(["height", "background-color"], {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.shorter,
	}),
	height: APP_BAR_DESKTOP,
}));

//------------------------------

const MainHeader = () => {
	const { pathname } = useLocation();
	const { user, checkAuthDone } = useAppSelector((state) => state.userReducer);

	const isOffset = useOffSetTop(20);

	const isHomePage = pathname === "/";
	const isZoomPage = pathname === "/zoom";

	return (
		<AppBar
			id="header"
			sx={{
				boxShadow: 0,
				bgcolor: "transparent",
				gridArea: "header",
			}}
		>
			<ToolbarStyle
				disableGutters
				sx={{
					...(isOffset && {
						bgcolor: "background.default",
						boxShadow: customShadows.z8,
					}),
				}}
			>
				<Container
					maxWidth="xl"
					sx={{
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: { xs: "center", md: "space-between" },
					}}
				>
					<MHidden width="mdDown">
						<RouterLink to="/">
							<Box
								component="img"
								alt="logo"
								src={
									isOffset && isHomePage
										? "/svg/logo-bp-full.svg"
										: !isOffset && !isHomePage
										? "/svg/logo-bp-full.svg"
										: "/svg/logo-bp-reverse.svg"
								}
								sx={{ width: 44, height: 44, cursor: "pointer" }}
							/>
						</RouterLink>
					</MHidden>

					{!isZoomPage && checkAuthDone && (
						<MHidden width="mdDown">
							<MenuDesktop
								user={user}
								pathname={pathname}
								isOffset={isOffset}
								isHome={isHomePage}
							/>
						</MHidden>
					)}

					{user && (
						<Box sx={{ position: "absolute", right: 26, minWidth: 50 }}>
							<AccountPopover user={user} />
						</Box>
					)}

					{checkAuthDone && (
						<MHidden width="mdUp">
							<>
								<MenuMobile pathname={pathname} user={user} />
								{!isHomePage && (
									<RouterLink to="/">
										<Box
											component="img"
											alt="logo"
											src={"/svg/logo-bp-full.svg"}
											sx={{ width: 44, height: 44, cursor: "pointer" }}
										/>
									</RouterLink>
								)}
							</>
						</MHidden>
					)}
				</Container>
			</ToolbarStyle>
		</AppBar>
	);
};

export default MainHeader;

import { FC, lazy } from "react";
// material
import { styled } from "@mui/material";
// components
import Loadable from "../components/shared/Loadable";
// lazy components
const MainFooter = Loadable(lazy(() => import("../components/MainFooter")));
const MainHeader = Loadable(lazy(() => import("../components/MainHeader")));

const RootStyle = styled("div")({
	minHeight: "100vh",
	display: "grid",
	gridTemplateColumns: "1fr",
	gridTemplateRows: "auto 1fr auto",
	gridTemplateAreas: `"header" "main" "footer"`,
});

interface MainLayoutProps {
	children: React.ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }): JSX.Element => {
	return (
		<RootStyle id="move_top">
			<MainHeader />
			{children}
			<MainFooter />
		</RootStyle>
	);
};

export default MainLayout;

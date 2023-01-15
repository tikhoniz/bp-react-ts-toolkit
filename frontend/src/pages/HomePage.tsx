import { lazy } from "react";
// material
import { styled } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
// components
import Page from "../components/shared/Page";

const Hero = lazy(() => import("../components/Home/Hero"));
const InfoBox = lazy(() => import("../components/shared/InfoBox"));
const DeviceWidget = lazy(() => import("../components/Home/DeviceWidget"));

//-------------------- STYLE ----------------------
const RootStyle = styled(Page)(({ theme }) => ({
	position: "relative",
	minHeight: "100%",
}));
//-------------------------------------------------

const HomePage = (): JSX.Element => {
	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<RootStyle title="Bright's Pilates | Онлайн тренировки у Вас дома">
			<Hero />
			<DeviceWidget />

			<InfoBox
				leftSide={false}
				head="Ваш Tренер"
				image={`/images/coaches/head-teacher-image${
					isDesktop ? "" : isTablet ? "-tablet" : "-mobile"
				}.jpg`}
				placeholderImage={`/images/coaches/tiny_head-teacher-image${
					isDesktop ? "" : "-mobile"
				}.jpg`}
				btnTitle="О тренере"
				alt="Красивая девушка с вьющимися волосами сидит на полу и улыбается"
				url="/coaches/diana-head-coach"
				text='"...не перестаю каждый день удивляться уникальности метода Пилатес, его логичности и простоте с одной стороны, глубине и осознаности с другой..."'
				//icon={<PersonIcon />}
			/>
		</RootStyle>
	);
};

export default HomePage;

import { lazy } from "react";
import { styled } from "@mui/material";
// components
import Page from "../components/shared/Page";
import Loadable from "../components/shared/Loadable";
// lazy components
const Pricing = Loadable(lazy(() => import("../components/Pricing")));

//--------------------
const RootStyle = styled(Page)(({ theme }: any) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(15),
	backgroundColor: theme.palette.primary.lighter,
}));
//---------------------

const PricingPage = (): JSX.Element => {
	return (
		<RootStyle title="Стоимость | Bright's Pilates">
			<Pricing />
		</RootStyle>
	);
};

export default PricingPage;

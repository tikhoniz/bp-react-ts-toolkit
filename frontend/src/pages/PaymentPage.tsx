// material
import { styled } from "@mui/material";
import { lazy } from "react";
// components
import Loadable from "../components/shared/Loadable";
import Page from "../components/shared/Page";
// lazy pages
const Payment = Loadable(lazy(() => import("../components/Payment")));

//--------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(15),
}));
//---------------------

const PaymentPage = (): JSX.Element => {
	return (
		<RootStyle title="Страница оплаты | Bright's Pilates">
			<Payment />
		</RootStyle>
	);
};

export default PaymentPage;

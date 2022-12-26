import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// material
import { styled } from "@mui/material";
// store
import { useAppDispatch, useAppSelector } from "../hooks/redux";
// components
import Page from "../components/shared/Page";
import SuccessPayment from "../components/shared/SuccessPayment";
import LoadingScreen from "../components/shared/loaders/LoadingScreen";
// utils
import { getUserLastOrder } from "../store/actionCreators/orderActions";

//-------------------- STYLE ----------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(10),
	paddingBottom: theme.spacing(10),
}));
//-------------------------------------------------

const SuccessPaymentPage = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { order, error } = useAppSelector((state) => state.orderReducer);
	const { user } = useAppSelector((state) => state.userReducer);

	useEffect(() => {
		if (error) {
			navigate("/pricing");
		}

		if (user && !error) {
			dispatch(getUserLastOrder(user?.id));
		}
		// eslint-disable-next-line
	}, [error, user]);

	return (
		<RootStyle title="Успешная оплата | Bright's Pilates">
			{order ? (
				<SuccessPayment description={order?.description} />
			) : (
				<LoadingScreen />
			)}
		</RootStyle>
	);
};

export default SuccessPaymentPage;

import { LoadingButton } from "@mui/lab";
import { Box, Link } from "@mui/material";
import { styled } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import $api from "../../http";
import { fCurrency } from "../../utils/formatNumber";

// ----------------------------------------------------------------------
const LinkStyle = styled(Link)(({ theme }) => ({
	color: "rgba(26, 26, 26, 0.5)",
	fontWeight: 400,
	fontSize: "14px",
	"&:hover": {
		textDecoration: "none",
	},
}));
// ----------------------------------------------------------------------

const StripeCheckout = ({ order }: any) => {
	const [redirect, setRedirect] = useState(false);
	const { user } = useAppSelector((state) => state.userReducer);

	const checkoutHandler = async () => {
		setRedirect(true);

		await $api
			.post(`/stripe/create-checkout-session`, {
				order,
				user,
			})
			.then((res) => {
				if (res.data) {
					window.location.href = res.data;
				}
			})
			.catch((err) => console.log("Error", err.message));
	};

	return (
		<>
			<LoadingButton
				fullWidth
				size="large"
				type="submit"
				variant="contained"
				loading={redirect}
				onClick={checkoutHandler}
				sx={{
					mt: 5,
					mb: 3,
					borderRadius: "6px",
					backgroundColor: "#343145",
					"&:hover": {
						backgroundColor: "#22212F",
					},
				}}
			>
				<Box
					component="span"
					sx={{
						opacity: 0.5,
						fontWeight: 400,
						fontSize: 18,
						letterSpacing: 1,
					}}
				>
					{`Оплатить ${fCurrency(
						order.discount ? order.discountPrice : order.regularPrice
					)}`}
				</Box>
			</LoadingButton>

			<LinkStyle
				href="https://stripe.com/"
				target="_blank"
				sx={{
					display: "flex",
					cursor: "pointer",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				Powered by
				<Box
					component={"img"}
					src="/svg/payment/icon_stripe.svg"
					sx={{
						ml: 0.5,
						width: 55,
						height: 27,
					}}
				/>
			</LinkStyle>
		</>
	);
};

export default StripeCheckout;

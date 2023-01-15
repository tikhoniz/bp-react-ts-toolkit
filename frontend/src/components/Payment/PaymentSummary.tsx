import { lazy } from "react";
// material
import { Card, styled } from "@mui/material";
import { Divider, Typography, Stack } from "@mui/material";
import { fCurrency } from "../../utils/formatNumber";
// components
import Label from "../shared/Label";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// lazy components
const PayPalCheckout = (lazy(() => import("./PayPalCheckout")));
const StripeCheckout = (lazy(() => import("./StripeCheckout")));

const CARD_HEIGHT = "395px";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
	padding: theme.spacing(3),

	[theme.breakpoints.up("sm")]: {
		padding: theme.spacing(9),
	},
	[theme.breakpoints.up("md")]: {
		padding: theme.spacing(3),
		height: CARD_HEIGHT,
	},
}));

// ----------------------------------------------------------------------

export default function PaymentSummary({ order, paymentMethod }: any) {
	const { description, regularPrice, discount, discountPrice } = order;

	return (
		<RootStyle>
			<Typography variant="h6">Ваша покупка:</Typography>

			<Stack direction="row" justifyContent="space-between">
				<Typography
					variant="h4"
					sx={{
						fontWeight: 400,
					}}
				>
					{description}
				</Typography>
			</Stack>

			<Stack direction="row" spacing={10} justifyContent="end" sx={{ pt: 4 }}>
				<Typography
					variant="h5"
					component="p"
					sx={{
						position: "relative",
						fontWeight: 500,
					}}
				>
					{discount && (
						<Label
							color="warning"
							variant="ghost"
							sx={{ position: "absolute", top: -24, left: 24 }}
						>
							Скидка {discount}
						</Label>
					)}
					Cтоимость:
				</Typography>

				<Typography
					variant="h5"
					sx={{
						mx: 1,
						textDecoration: discount ? "line-through" : "none",
					}}
				>
					{fCurrency(regularPrice)}
				</Typography>
			</Stack>

			<Divider sx={{ borderStyle: "dashed" }} />

			<Stack direction="row" spacing={10} justifyContent="end">
				<Typography
					variant="h5"
					component="p"
					sx={{
						fontWeight: 500,
					}}
				>
					Итог:
				</Typography>

				<Typography variant="h5" component="p" sx={{ mx: 1 }}>
					{fCurrency(discount ? discountPrice : regularPrice)}
				</Typography>
			</Stack>

			<Divider sx={{ borderStyle: "dashed", mb: 1 }} />

			<Typography
				variant="caption"
				sx={{ color: "text.secondary", fontWeight: 300, mt: 1 }}
			>
				* все налоги включены
			</Typography>
			{paymentMethod === "paypal" && (
				<PayPalScriptProvider
					options={{
						"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID as string,
						components: "buttons",
						currency: "USD",
					}}
				>
					<PayPalCheckout order={order} />
				</PayPalScriptProvider>
			)}
			{paymentMethod === "credit_card" && <StripeCheckout order={order} />}
		</RootStyle>
	);
}

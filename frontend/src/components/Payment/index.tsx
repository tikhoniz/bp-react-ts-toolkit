import { lazy, useState } from "react";
import { useParams } from "react-router-dom";
// material
import { useTheme } from "@mui/material";
import { Box, Grid, Container, Typography, useMediaQuery } from "@mui/material";
// data
import plans from "../../data/plans";

// animate
import { motion } from "framer-motion";

// lazy components
const PaymentMethods = (lazy(() => import("./PaymentMethods")));
const PaymentSummary = (lazy(() => import("./PaymentSummary")));

// ----------------------------------------------------------------------

const Payment = () => {
	const [paymentMethod, setPaymentMethod] = useState("credit_card");
	const { id: planId } = useParams();

	const keys: string[] = Object.keys(plans);
	const prices: any = plans;
	let price = null;

	keys.forEach((key) => {
		if (prices[key].id === planId) {
			price = prices[key];
		}
	});

	const theme = useTheme();
	const upMd = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Container maxWidth="lg">
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<Box sx={{ mb: 5 }}>
					<Typography variant="h3" align="center" paragraph>
						Завершение оплаты
					</Typography>
					<Typography align="center" sx={{ color: "text.secondary" }}>
						Выберите удобный способ оплаты
					</Typography>
				</Box>
				<Grid container spacing={upMd ? 5 : 2}>
					<Grid item xs={12} md={5}>
						<PaymentMethods
							placeOrder={price}
							paymentMethod={paymentMethod}
							setPaymentMethod={setPaymentMethod}
						/>
					</Grid>

					<Grid item xs={12} md={7}>
						<PaymentSummary order={price} paymentMethod={paymentMethod} />
					</Grid>
				</Grid>
			</motion.div>
		</Container>
	);
};

export default Payment;

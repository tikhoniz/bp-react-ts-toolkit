// material
import { Container, Typography } from "@mui/material";
//components
import PricingBlock from "./PricingBlock";
// animate
import { motion } from "framer-motion";

function Pricing() {
	return (
		<Container
			maxWidth="lg"
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.55 }}
		>
			<Typography variant="h3" align="center">
				Выберите блок групповых тренировок
			</Typography>

			<Typography
				align="center"
				variant="body1"
				sx={{ color: "text.tertiary", mb: 5 }}
			>
				Все занятия проходят онлайн в формате реального времени
			</Typography>

			<PricingBlock />
		</Container>
	);
}

export default Pricing;

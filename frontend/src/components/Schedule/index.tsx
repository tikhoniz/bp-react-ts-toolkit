// material
import {
	Container,
	CardHeader,
	styled,
	Stack,
	Typography,
} from "@mui/material";
// components
import Calendar from "./Calendar";
// icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// animate
import { motion } from "framer-motion";

const LableStyle = styled("span")({
	width: 55,
	height: 20,
	backgroundColor: "#00AB5671",
	border: "2px solid #00AB56",
	borderRadius: "4px",
	display: "inline-block",
});

const StackStyle = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	[theme.breakpoints.up("sm")]: {
		flexDirection: "row",
	},
}));

const Schedule = (): JSX.Element => {
	return (
		<Container maxWidth="xl">
			<StackStyle>
				<CardHeader
					component={motion.div}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					title="Расписание тренировок"
					sx={{ mb: 3, whiteSpace: "nowrap" }}
					avatar={<CalendarMonthIcon sx={{ fontSize: 30 }} />}
				/>

				<Stack
					direction="row"
					alignItems="center"
					spacing={1.5}
					sx={{ ml: 3, mb: { xs: 3, sm: 0 } }}
				>
					<LableStyle />

					<Typography
						variant="overline"
						sx={{
							letterSpacing: "4px",
						}}
					>
						бесплатный класс
					</Typography>
				</Stack>
			</StackStyle>
			<Calendar />
		</Container>
	);
};

export default Schedule;

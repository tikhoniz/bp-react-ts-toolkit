import { Link as RouterLink } from "react-router-dom";
// material
import {
	Stack,
	Paper,
	Radio,
	Button,
	Typography,
	RadioGroup,
	FormControlLabel,
	Card,
} from "@mui/material";
import { styled } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import payment from "../../data/payment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CARD_HEIGHT = "395px";

// -----------------------------STYLE---------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(3),

	[theme.breakpoints.up("md")]: {
		height: CARD_HEIGHT,
	},
}));

const OptionStyle = styled(Paper)(({ theme }: any) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	paddingLeft: theme.spacing(2.5),
	paddingRight: theme.spacing(2),
	border: `solid 1px ${theme.palette.grey[500_32]}`,
	width: "300px",
	marginBottom: "32px",
}));

// ----------------------------------------------------------------------

const PaymentMethods = ({ paymentMethod, setPaymentMethod }: any) => {
	const paymentOptions: any = payment;

	const handleChange = (evt: any) => {
		setPaymentMethod(evt.target.value);
	};

	return (
		<RootStyle>
			<Typography variant="subtitle1" sx={{ mb: 2 }}>
				Mетод оплаты
			</Typography>

			<RadioGroup onChange={handleChange}>
				{Object.keys(paymentOptions).map((key: any) => {
					const { value, title, icons } = paymentOptions[key];

					return (
						<OptionStyle
							key={title}
							sx={{
								...(paymentMethod === value && {
									boxShadow: (theme: any) => theme.customShadows.z8,
								}),
							}}
						>
							<FormControlLabel
								value={value}
								checked={paymentMethod === value}
								control={<Radio checkedIcon={<CheckCircleIcon />} />}
								label={
									<Typography variant="subtitle2" sx={{ ml: 1 }}>
										{title}
									</Typography>
								}
								sx={{ py: { md: 3 }, mx: 0 }}
							/>

							<Stack direction="row" alignItems="center" spacing={1}>
								{icons.map((icon: any) => (
									<img key={icon} alt="logo card" src={icon} />
								))}
							</Stack>
						</OptionStyle>
					);
				})}
			</RadioGroup>

			<Button
				fullWidth
				size="large"
				component={RouterLink}
				to="/pricing"
				variant="outlined"
				color="secondary"
				startIcon={<ArrowBackIosIcon />}
				sx={{ maxWidth: "300px" }}
			>
				Отменить Покупку
			</Button>
		</RootStyle>
	);
};

export default PaymentMethods;

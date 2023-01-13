import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Card, Button, Typography, Box, Stack } from "@mui/material";
import { fCurrency } from "../../../utils/formatNumber";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { FC } from "react";

interface ICard {
	id: string;
	description: string;
	type: string;
	icon: string;
	regularPrice: string;
	discount: string;
	discountPrice: string;
	stripePriceId: string;
	qty: number;
	lists: {
		text: string;
		isAvailable: boolean;
	}[];
	labelAction: string;
}
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }: any) => ({
	maxWidth: 320,
	margin: "auto",
	display: "flex",
	position: "relative",
	alignItems: "center",
	flexDirection: "column",
	padding: theme.spacing(3),
	boxShadow: "none",
	borderRadius: 16,
	border: `2px solid ${theme.palette.primary.main}`,

	[theme.breakpoints.up("md")]: {
		// анимация
		transition: theme.transitions.create("all", {
			easing: theme.transitions.easing.easeInOut,
			duration: 560,
		}),

		"&:hover": {
			boxShadow: theme.customShadows.z24,
			transform: `translateY(-11px)`,
		},
	},
}));

// ----------------------------------------------------------------------

interface PricingCardProps {
	card: ICard;
}

const TextStyle = styled(Typography)(({ theme }) => ({
	fontSize: "60px",
	fontWeight: theme.typography.fontWeightBold,
}));

const PricingCard: FC<PricingCardProps> = ({ card }) => {
	const {
		id,
		qty,
		icon,
		lists,
		discount,
		labelAction,
		regularPrice,
		discountPrice,
	} = card;

	return (
		<RootStyle>
			{discount ? (
				<Stack position="relative" textAlign="center" sx={{ width: "100%" }}>
					<Stack
						flexDirection="row"
						alignItems="center"
						justifyContent="space-around"
						position="absolute"
						top="-10px"
						left="0"
						sx={{ width: "100%" }}
					>
						<Typography
							variant="h4"
							sx={{
								color: "#B78103",
								textTransform: "capitalize",
								fontFamily: "fontFamilySecondary",
							}}
						>
							скидка {discount}
						</Typography>
						<Typography
							component="span"
							variant="h2"
							noWrap
							sx={{
								color: "text.disabled",
								textDecoration: "line-through",
								fontFamily: "fontFamilySecondary",
							}}
						>
							{fCurrency(regularPrice)}
						</Typography>
					</Stack>
					<TextStyle
						sx={{
							mt: 4,
							color: "primary.dark",
							fontFamily: "fontFamilySecondary",
						}}
					>
						{fCurrency(discountPrice)}
					</TextStyle>
				</Stack>
			) : (
				<TextStyle
					sx={{
						color: "primary.dark",
						mt: 4,
						fontFamily: "fontFamilySecondary",
					}}
				>
					{fCurrency(regularPrice)}
				</TextStyle>
			)}

			<Stack
				alignItems="center"
				justifyContent="space-around"
				sx={{
					mt: 2,
				}}
			>
				<TextStyle sx={{ lineHeight: 0.8, fontFamily: "fontFamilyTertiary" }}>
					{qty}
				</TextStyle>
				<Typography
					variant="body1"
					sx={{
						color: "text.secondary",
					}}
				>
					{qty < 2 ? "тренировка" : "тренировок"}
				</Typography>
			</Stack>

			<Box
				component="img"
				alt="empty content"
				src={icon}
				sx={{
					width: 100,
					height: 100,
					mt: 3,
				}}
			/>

			<Stack component="ul" spacing={1} alignItems="center" sx={{ my: 2 }}>
				{lists.map((item: any) => (
					<Stack
						key={item.text}
						component="li"
						direction="row"
						sx={{
							typography: "body2",
							color: item.isAvailable ? "text.primary" : "text.disabled",
							textDecoration: item.isAvailable ? "none" : "line-through",
							whiteSpace: "nowrap",
						}}
					>
						<Typography
							variant="body1"
							sx={{
								fontFamily: "fontFamilySecondary",
								color: "text.secondary",
							}}
						>
							<Typography
								component="span"
								sx={{
									color: item.isAvailable ? "primary.dark" : "text.disabled",
								}}
							>
								&#10003;
							</Typography>
							{item.text}
						</Typography>
					</Stack>
				))}
			</Stack>

			<Button
				component={RouterLink}
				variant="contained"
				size="large"
				to={`/payment/${id}`}
				startIcon={<ArrowForwardIosRoundedIcon />}
				sx={{
					minWidth: 245,
					letterSpacing: 2,
					textTransform: "uppercase",
				}}
			>
				{labelAction}
			</Button>
		</RootStyle>
	);
};

export default PricingCard;

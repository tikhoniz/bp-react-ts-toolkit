// material
import { Grid } from "@mui/material";
// data
import plans from "../../../data/plans";
// components
import PricingCard from "./PricingCard";

interface CardWithIndex {
	[index: string]: any;
}

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

const PricingBlock = () => {
	const keys: string[] = Object.keys(plans);

	const prices = plans as CardWithIndex;

	return (
		<Grid container spacing={3}>
			{keys.map((key: string, index: number) => {
				const card: ICard = prices[key];

				return (
					<Grid item xs={12} md={4} key={index}>
						<PricingCard card={card} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default PricingBlock;

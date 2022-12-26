// material
import { TableRow, TableCell, Typography } from "@mui/material";
import { fCurrency } from "../../../../utils/formatNumber";
import { dayMonthYearDate } from "../../../../utils/time";

const PaidOrderRow = ({ order }: any) => {
	const {
		discount,
		createdAt,
		description,
		regular_price,
		discount_price,
		payment_method,
	} = order;

	return (
		<TableRow>
			<TableCell sx={{ padding: "8px 14px" }}>
				<time dateTime={createdAt}>{dayMonthYearDate(createdAt)}</time>
			</TableCell>

			<TableCell sx={{ padding: "8px 14px" }}>
				<Typography variant="body2">{description}</Typography>
			</TableCell>

			<TableCell sx={{ padding: "8px 14px" }}>
				<Typography variant="body2">
					{fCurrency(discount ? discount_price : regular_price)}
				</Typography>
			</TableCell>

			<TableCell
				sx={{ display: { xs: "none", sm: "table-cell" }, padding: "8px 14px" }}
			>
				<Typography variant="subtitle1">{payment_method}</Typography>
			</TableCell>
		</TableRow>
	);
};

export default PaidOrderRow;

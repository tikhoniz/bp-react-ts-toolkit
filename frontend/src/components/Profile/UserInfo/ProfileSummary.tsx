import { FC } from "react";
// store
import { fNumber } from "../../../utils/formatNumber";
// material
import { styled } from "@mui/material";
import { Card, Divider, Stack, Typography } from "@mui/material";

// ---------------------------
const TypographyStyle = styled(Typography)(({ theme }: any) => ({
	fontFamily: theme.typography.fontFamilyTertiary,
}));
// ----------------------------

interface ProfileSummaryProps {
	qtyGroups: string;
	qtyPersonals: string;
}

const ProfileSummary: FC<ProfileSummaryProps> = ({
	qtyGroups,
	qtyPersonals,
}): JSX.Element => {
	return (
		<Card sx={{ display: "flex" }}>
			<Stack
				direction="row"
				width="100%"
				padding="24px 0"
				divider={<Divider orientation="vertical" flexItem />}
			>
				<Stack
					width={1}
					textAlign="center"
					alignItems="center"
					justifyContent="space-between"
				>
					<TypographyStyle variant="h2" sx={{ color: "text.secondary" }}>
						{fNumber(qtyGroups)}
					</TypographyStyle>

					<Typography variant="subtitle1" sx={{ color: "text.tertiary" }}>
						Групповые
					</Typography>
				</Stack>

				<Stack
					width={1}
					textAlign="center"
					alignItems="center"
					justifyContent="space-between"
				>
					<TypographyStyle variant="h2" sx={{ color: "text.secondary" }}>
						{fNumber(qtyPersonals)}
					</TypographyStyle>

					<Typography variant="subtitle1" sx={{ color: "text.tertiary" }}>
						Персональные
					</Typography>
				</Stack>
			</Stack>
		</Card>
	);
};

export default ProfileSummary;

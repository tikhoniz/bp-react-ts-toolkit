import { lazy } from "react";
// material
import { Stack, Typography } from "@mui/material";
import { Link } from "@mui/material";
// lazy
const PrivacyPolicy = lazy(() => import("../Policy/PrivacyPolicy"));

const LINKS = [
	{
		headline: "Правовая информация",
		children: [
			{
				name: "Политика конфиденциальности",
				href: "/privacy-policy",
				component: <PrivacyPolicy />,
			},
		],
	},
];

const PolicyLinks = ({ onClickHandler }: any) => {
	return (
		<>
			{LINKS.map((list) => {
				const { headline, children } = list;
				return (
					<Stack key={headline} spacing={1}>
						<Typography component="p" variant="overline">
							{headline}
						</Typography>
						{children.map((link) => (
							<Link
								key={link.name}
								component="button"
								onClick={() => onClickHandler(link.component)}
								sx={{
									opacity: 0.7,
									color: "text.primary",
									"&:hover": {
										opacity: 0.9,
										textDecoration: "none",
									},
								}}
							>
								{link.name}
							</Link>
						))}
					</Stack>
				);
			})}
		</>
	);
};

export default PolicyLinks;

import { lazy } from "react";
// material
import { Stack, Typography } from "@mui/material";
import { styled, Link } from "@mui/material";
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

const LinkStyle = styled(Link)(({ theme }) => ({
	opacity: 0.7,
	color: theme.palette.text.primary,
	cursor: "pointer",
	"&:hover": {
		opacity: 0.9,
		textDecoration: "none",
	},
}));

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
							<LinkStyle
								key={link.name}
								onClick={() => onClickHandler(link.component)}
							>
								{link.name}
							</LinkStyle>
						))}
					</Stack>
				);
			})}
		</>
	);
};

export default PolicyLinks;

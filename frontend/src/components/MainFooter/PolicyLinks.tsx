// material
import { Stack, Typography } from "@mui/material";
import { Link } from "@mui/material";
import CookiePolicy from "../Policy/CookiePolicy";
import PrivacyPolicy from "../Policy/PrivacyPolicy";
import { useAppDispatch } from "../../hooks/redux";
import { policySliceActions } from "../../store/reducers/PolicySlice";

const LINKS = [
	{
		headline: "Правовая информация",
		children: [
			{
				title: "Политика конфиденциальности",
				component: <PrivacyPolicy />,
			},
			{
				title: "Политика файлов Cookies",
				component: <CookiePolicy />,
			},
		],
	},
];

const PolicyLinks = () => {
	const dispatch = useAppDispatch();
	const { openPolicy } = policySliceActions;

	return (
		<>
			{LINKS.map((list) => {
				const { headline, children } = list;
				return (
					<Stack key={headline} spacing={1} alignItems="flex-start">
						<Typography component="p" variant="overline">
							{headline}
						</Typography>
						{children.map((link) => (
							<Link
								key={link.title}
								component="button"
								onClick={() =>
									dispatch(
										openPolicy({ component: link.component, title: link.title })
									)
								}
								sx={{
									opacity: 0.7,
									color: "text.primary",
									"&:hover": {
										opacity: 0.9,
										textDecoration: "none",
									},
								}}
							>
								{link.title}
							</Link>
						))}
					</Stack>
				);
			})}
		</>
	);
};

export default PolicyLinks;

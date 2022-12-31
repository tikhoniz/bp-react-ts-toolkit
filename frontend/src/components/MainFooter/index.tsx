// material
import { styled } from "@mui/material";
import { Grid, Stack, Divider, Container, Typography } from "@mui/material";
// utils
import { fDateYear } from "../../utils/time";
// lazy components
import SocialLinks from "./SocialLinks";
import PolicyLinks from "./PolicyLinks";
import ModalBasic from "../shared/ModalBasic";
import { policySliceActions } from "../../store/reducers/PolicySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

//------------------------- STYLE ------------------------------
const RootStyle = styled("div")(({ theme }) => ({
	gridArea: "footer",
	position: "relative",
	backgroundColor: theme.palette.background.default,
}));

// ---------------------------------------------------------------

const MainFooter = () => {
	const dispatch = useAppDispatch();
	const { closePolicy } = policySliceActions;
	const { policy } = useAppSelector((state: any) => state.policyReducer);

	return (
		<>
			<RootStyle>
				<Divider />
				<Container maxWidth="xl" sx={{ px: 4, pt: 4 }} disableGutters>
					<Grid
						container
						justifyContent={{ xs: "center", md: "space-between" }}
						sx={{ textAlign: { xs: "center", md: "left" }, pb: 1 }}
					>
						<Grid item xs={12} md={7}>
							<Stack
								spacing={5}
								direction={{ xs: "column", md: "row" }}
								justifyContent="space-between"
							>
								<PolicyLinks />
							</Stack>
						</Grid>

						<Grid item xs={8} md={3} sx={{ pt: { xs: 4, md: 0 } }}>
							<Stack
								height="100%"
								alignItems={{ xs: "center", md: "flex-end" }}
								spacing={2}
							>
								<Stack direction="column">
									<Typography component="p" variant="overline">
										Kонтакты
									</Typography>
									<Stack
										direction="row"
										justifyContent={{ xs: "center", md: "flex-end" }}
									>
										<SocialLinks />
									</Stack>
								</Stack>
							</Stack>
						</Grid>
					</Grid>

					<Stack
						direction={{ xs: "column", md: "row" }}
						justifyContent={{ xs: "center", md: "space-between" }}
						sx={{
							width: "100%",
							alignItems: "center",
							mt: 2,
							pb: 2,
							textAlign: { xs: "center", md: "right" },
						}}
					>
						<Typography component="p" variant="body2">
							©{fDateYear(new Date())}. Все права защищены.
						</Typography>
					</Stack>
				</Container>
			</RootStyle>

			<ModalBasic
				title={policy?.title}
				open={!!policy}
				onClose={() => dispatch(closePolicy())}
			>
				{policy?.component}
			</ModalBasic>
		</>
	);
};

export default MainFooter;

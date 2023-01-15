import { FC, lazy } from "react";
// material
import { Box, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
// components
// animate
import { motion } from "framer-motion";
import { useAppSelector } from "../../../hooks/redux";
// lazy components
const ZoomToggle = lazy(() => import("./ZoomToggle"));
const ProfileAbout = lazy(() => import("./ProfileAbout"));
const UpcomingClasses = lazy(() => import("./UpcomingClasses"));
const ProfileClassesSummary = lazy(() => import("./ProfileSummary"));

const UserInfo: FC = (): JSX.Element => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	const { user } = useAppSelector((state) => state.userReducer);

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Stack spacing={3}>
						<Grid container spacing={3}>
							<Grid
								item
								xs={12}
								component={motion.div}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.35 }}
							>
								<ProfileClassesSummary
									qtyGroups={user?.groups}
									qtyPersonals={user?.personals}
								/>
							</Grid>

							{/* //- ZoomToggle is shown only when the desktop screen */}
							{isDesktop && (
								<Grid
									item
									md={12}
									component={motion.div}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.35 }}
								>
									<ZoomToggle isZoom={user?.zoomApp} userId={user?.id} />
								</Grid>
							)}
						</Grid>

						<Box
							component={motion.div}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.35 }}
							sx={{ display: { xs: "none", md: "block" } }}
						>
							<ProfileAbout user={user} />
						</Box>
					</Stack>
				</Grid>

				<Grid
					item
					xs={12}
					md={8}
					component={motion.div}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.35 }}
				>
					<Stack spacing={3}>
						<UpcomingClasses
							userId={user?.id}
							isZoom={user?.zoomApp}
							groups={user?.groupList}
						/>
					</Stack>
				</Grid>

				<Grid
					item
					xs={12}
					component={motion.div}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.35 }}
					sx={{ display: { xs: "block", md: "none" } }}
				>
					<ProfileAbout user={user} />
				</Grid>
			</Grid>
		</>
	);
};

export default UserInfo;

import { Link as RouterLink } from "react-router-dom";
// material
import { Button, Container, Typography } from "@mui/material";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
// components
import LoadableImage from "../shared/LoadableImage";
//icons
import ScheduleIcon from "@mui/icons-material/Schedule";

const DeviceWidget = () => {
	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Container maxWidth="xl" sx={{ mb: { xs: 7, md: 10, lg: 15 } }}>
			<Typography
				variant="h2"
				sx={{
					textAlign: "center",
					pb: { xs: 3, sm: 5, md: 6, lg: 7, xl: 8 },
				}}
			>
				Онлайн Пилатес Cтудия
			</Typography>

			<LoadableImage
				src={`/images/home/desktop-laptop-tablet-phone${
					isDesktop ? "" : isTablet ? "-tablet" : "-mobile"
				}.png`}
				placeholderSrc={`/images/home/tiny_desktop-laptop-tablet-phone${
					isDesktop ? "" : "-mobile"
				}.png`}
				width="1920px"
				height="894px"
				alt="devices"
			/>

			<Stack alignItems="center">
				<Button
					component={RouterLink}
					variant="contained"
					size="large"
					to="/schedule"
					startIcon={<ScheduleIcon />}
					sx={{
						minWidth: 245,
						marginTop: theme.spacing(7),
						letterSpacing: 1,
						textTransform: "uppercase",
					}}
				>
					Расписание
				</Button>
			</Stack>
		</Container>
	);
};

export default DeviceWidget;

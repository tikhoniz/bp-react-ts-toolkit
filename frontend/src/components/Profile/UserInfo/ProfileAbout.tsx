import { FC, useState } from "react";
// store
import { useAppDispatch } from "../../../hooks/redux";
import { sendConfirmationEmail } from "../../../store/actionCreators/userActions";
// models
import { IUser } from "../../../models/IUser";
// material
import PlaceIcon from "@mui/icons-material/Place";
import {
	Box,
	Card,
	Stack,
	Alert,
	Tooltip,
	Typography,
	CardHeader,
	IconButton,
	AlertTitle,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import { LoadingButton } from "@mui/lab";
// icons
import PhoneIcon from "@mui/icons-material/Phone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

interface ProfileAboutProps {
	user: IUser | null;
}

const ProfileAbout: FC<ProfileAboutProps> = ({ user }): JSX.Element => {
	const [showMore, setShowMore] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);

	const dispatch = useAppDispatch();

	const {
		city,
		about,
		country,
		email: userEmail,
		phoneNumber,
		activationLink,
		emailVerified,
	} = user || {};

	const sendConfirmHandler = async () => {
		setSubmitting(true);
		await dispatch(sendConfirmationEmail({ userEmail }));
		setSubmitting(false);
	};

	return (
		<Card sx={{ minHeight: "195px", minWidth: 270 }}>
			<CardHeader title="О себе" />

			<Stack spacing={2} sx={{ p: 3, pt: 1, position: "relative" }}>
				<Typography variant="body2">
					{about && about.length < 50 ? (
						about
					) : (
						<>
							{showMore ? about : `${about?.substring(0, 50)} ...`}
							<IconButton
								aria-label="show"
								color="primary"
								onClick={() => setShowMore(!showMore)}
								sx={{
									width: 30,
									height: 30,
								}}
							>
								{showMore ? (
									<ExpandLessIcon fontSize="medium" />
								) : (
									<ExpandMoreIcon fontSize="medium" />
								)}
							</IconButton>
						</>
					)}
				</Typography>

				<Stack direction="row" spacing={1}>
					<PlaceIcon
						sx={{
							width: "24px",
							height: "24px",

							color: "text.secondary",
						}}
					/>
					<Typography variant="body2" sx={{ color: "text.tertiary" }}>
						Живет в &nbsp;
						<Typography
							component="span"
							variant="subtitle2"
							sx={{ color: "text.tertiary" }}
						>
							{city && `${city},`} &nbsp;
							{country}
						</Typography>
					</Typography>
				</Stack>

				<Stack spacing={1}>
					<Stack direction="row" spacing={1}>
						<AlternateEmailIcon
							sx={{
								width: "24px",
								height: "24px",
								color: "text.secondary",
							}}
						/>
						<Tooltip
							placement="top"
							title="Электронная почта не подтверждена"
							arrow
							TransitionComponent={Fade}
						>
							<Typography
								variant="body2"
								noWrap
								sx={{
									color: emailVerified ? "text.tertiary" : "warning.dark",
									cursor: emailVerified ? "default" : "help",
								}}
							>
								{userEmail}
							</Typography>
						</Tooltip>
					</Stack>

					<Box>
						{!activationLink && !emailVerified && (
							<LoadingButton
								variant="contained"
								size="small"
								loading={isSubmitting}
								onClick={sendConfirmHandler}
								sx={{ ml: 3 }}
							>
								Подтвердить email
							</LoadingButton>
						)}

						{activationLink && !emailVerified && (
							<Alert severity="success">
								<AlertTitle>Ссылка отправлена</AlertTitle>
								на <strong>{userEmail}</strong> отправлено письмо с ссылкой для
								подтверждения адреса электронной почты
							</Alert>
						)}
					</Box>
				</Stack>

				{phoneNumber && (
					<Stack direction="row">
						<PhoneIcon
							sx={{
								width: "24px",
								height: "24px",
								marginRight: 1,
								color: "text.secondary",
							}}
						/>
						<Typography variant="body2" sx={{ color: "text.tertiary" }}>
							{phoneNumber}
						</Typography>
					</Stack>
				)}
			</Stack>
		</Card>
	);
};

export default ProfileAbout;

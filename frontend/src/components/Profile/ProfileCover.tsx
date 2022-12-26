import { FC } from "react";
// material
import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material";
// components
import LoadableImage from "../shared/LoadableImage";
// icons
import PersonIcon from "@mui/icons-material/Person";

//--------------------------
const InfoStyle = styled("div")(({ theme }) => ({
	position: "absolute",
	zIndex: 99,
	right: "auto",
	left: theme.spacing(2),
	bottom: theme.spacing(7),
	display: "flex",
	alignItems: "center",
	[theme.breakpoints.up("md")]: {
		left: theme.spacing(3),
		bottom: theme.spacing(3),
	},
}));
// --------------------------

interface ProfileCoverProps {
	cover: string;
	avatar: string;
	userName: string;
}

const ProfileCover: FC<ProfileCoverProps> = ({ cover, avatar, userName }) => {
	return (
		<>
			<LoadableImage
				src={`/images/covers/${cover}`}
				placeholderSrc={`/images/covers/tiny_${cover}`}
				width="100%"
				height="100%"
				containerStyle={{
					width: "100%",
					height: "100%",
				}}
				imgStyle={{ position: "absolute", zIndex: 9 }}
				alt="cover"
			/>

			<InfoStyle>
				<Avatar
					sx={{
						mx: "auto",
						borderWidth: 2,
						borderStyle: "solid",
						borderColor: "common.white",
						width: { xs: 100, sm: 128 },
						height: { xs: 100, sm: 128 },
					}}
				>
					{avatar ? (
						<LoadableImage
							src={`${process.env.REACT_APP_AVATAR_URL + avatar}.jpg`}
							placeholderSrc={`${
								process.env.REACT_APP_PLACEHOLDER_AVATAR_URL + avatar
							}.jpg`}
							alt={userName}
							containerStyle={{
								top: 0,
								width: "100%",
								height: "100%",
								position: "absolute",
							}}
						/>
					) : (
						<PersonIcon
							sx={{
								width: "90%",
								height: "90%",
							}}
						/>
					)}
				</Avatar>

				<Box
					sx={{
						ml: { xs: 2, md: 3 },
						color: "common.white",
						textAlign: { xs: "center", sm: "left" },
					}}
				>
					<Typography variant="h4">{userName}</Typography>
				</Box>
			</InfoStyle>
		</>
	);
};

export default ProfileCover;

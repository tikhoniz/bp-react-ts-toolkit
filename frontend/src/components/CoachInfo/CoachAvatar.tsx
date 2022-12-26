import { FC } from "react";
// material
import { Box, Container, Typography, Avatar } from "@mui/material";
// components
import LoadableImage from "../shared/LoadableImage";

interface CoachAvatarProps {
	alt?: string;
	name?: string;
	picture?: string;
	placeholder?: string;
}

const CoachAvatar: FC<CoachAvatarProps> = ({
	alt,
	name,
	picture,
	placeholder,
}) => {
	return (
		<Container maxWidth="lg">
			<Box sx={{ position: "relative" }}>
				<Avatar
					sx={{
						position: "absolute",
						top: { xs: -90, md: -150 },
						left: { xs: 70, md: 70 },
						borderWidth: 5,
						borderStyle: "solid",
						borderColor: "common.white",
						// xs и md это размер экрана
						width: { xs: 180, md: 300 },
						height: { xs: 180, md: 300 },
					}}
				>
					<LoadableImage
						alt={alt}
						src={picture || ""}
						placeholderSrc={placeholder || ""}
						containerStyle={{
							top: 0,
							width: "100%",
							height: "100%",
							position: "absolute",
						}}
					/>
				</Avatar>

				<Typography
					variant="h2"
					sx={{
						position: "absolute",
						top: { xs: 0, md: -66 },
						left: { xs: 0, md: 413 },
					}}
				>
					{name}
				</Typography>
			</Box>
		</Container>
	);
};

export default CoachAvatar;

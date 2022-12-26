import { FC } from "react";
import { alpha, useTheme } from "@mui/material";
import LoadableImage from "../shared/LoadableImage";

interface CoachImageProps {
	alt: string;
	src: string;
}

const CoachImage: FC<CoachImageProps> = ({ alt, src }) => {
	const theme: any = useTheme();

	const shadow = `-40px 40px 80px ${alpha(theme.palette.grey[500], 0.48)}`;

	return (
		<LoadableImage
			src={process.env.REACT_APP_COACHES_URL + src}
			placeholderSrc={process.env.REACT_APP_PLACEHOLDER_COACHES_URL + src}
			width="650px"
			height="520px"
			alt={alt}
			containerStyle={{
				boxShadow: shadow,
				borderRadius: theme.shape.borderRadiusSm,
			}}
			imgStyle={{
				borderRadius: theme.shape.borderRadiusSm,
			}}
		/>
	);
};

export default CoachImage;

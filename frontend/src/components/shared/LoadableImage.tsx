import { FC, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material";

interface LoadableImageProps {
	src: string;
	placeholderSrc: string;
	alt?: string;
	width?: string;
	height?: string;
	imgStyle?: any;
	containerStyle?: any;
}

//-------------------------------------------------

const RootStyle = styled("div")({
	position: "relative",
});

//-------------------------------------------------

const LoadableImage: FC<LoadableImageProps> = ({
	src,
	alt,
	width,
	height,
	imgStyle,
	placeholderSrc,
	containerStyle,
}): JSX.Element => {
	const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

	const imageRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		if (imageRef.current) {
			imageRef.current.src = src || "";
			imageRef.current.onload = () => setImgSrc(src);
		}
	}, [src]);

	const loading = placeholderSrc && imgSrc === placeholderSrc;

	const webpLink = loading
		? placeholderSrc.substring(0, placeholderSrc.lastIndexOf(".")) + ".webp"
		: src?.substring(0, src.lastIndexOf(".")) + ".webp";

	return (
		<RootStyle sx={{ ...containerStyle }}>
			<picture>
				<source srcSet={webpLink} type="image/webp"></source>
				<img
					ref={imageRef}
					src={imgSrc}
					width={width}
					height={height}
					alt={alt}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						transition: "filter 0.5s linear",
						filter: "blur(10px)",
						clipPath: "inset(0)",

						...(!loading && {
							filter: "blur(0px)",
						}),
						...imgStyle,
					}}
				/>
			</picture>
		</RootStyle>
	);
};

export default LoadableImage;

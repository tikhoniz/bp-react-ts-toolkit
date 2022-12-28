import { styled } from "@mui/material";

const ButtonStyle = styled("button")(({ theme, color }) => {
	const styleGoogle = {
		backgroundColor: "#DD4B39",
		backgroundImage: "linear-gradient(#DD4B39, #d13725)",
		textShadow: "0 -1px 0 #c33424",
		"&:hover": {
			backgroundColor: "#F64E38",
			backgroundImage: "linear-gradient(#F64E38, #E54E3A)",
		},
	};

	const styleFacebook = {
		backgroundColor: "#4C69BA",
		backgroundImage: "linear-gradient(#4C69BA, #3B55A0)",
		textShadow: "0 -1px 0 #354C8C",
		"&:hover": {
			backgroundColor: "#5B7BD5",
			backgroundImage: "linear-gradient(#5B7BD5, #4864B1)",
		},
	};

	return {
		boxSizing: "border-box",
		position: "relative",
		padding: "0 15px 0 46px",
		border: "none",
		textAlign: "left",
		lineHeight: "34px",
		whiteSpace: "nowrap",
		borderRadius: "0.2em",
		fontSize: "16px",
		color: " #FFF",
		cursor: "pointer",
		width: "100%",
		"&:before": {
			content: '""',
			boxSizing: "border-box",
			position: "absolute",
			top: 0,
			left: 0,
			width: "34px",
			height: " 100%",

			background: `url('/svg/social/${color}.svg') center / contain no-repeat`,
		},
		"&:active": {
			boxShadow: "inset 0 0 0 32px rgba(0,0,0,0.1)",
		},

		...(color === "google" && { ...styleGoogle }),

		...(color === "facebook" && { ...styleFacebook }),
	};
});

const SocialButton = ({ color, children }: any) => {
	return <ButtonStyle color={color}>{children}</ButtonStyle>;
};

export default SocialButton;

// material
import { useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

function GlobalThemeStyles() {
	const theme = useTheme();

	return (
		<GlobalStyles
			styles={{
				"*": {
					margin: 0,
					padding: 0,
					boxSizing: "border-box",
				},
				html: {
					width: "100%",
					height: "100%",
					WebkitOverflowScrolling: "touch",
				},
				body: {
					width: "100%",
					height: "100%",
				},
				"#__next": {
					width: "100%",
					height: "100%",
				},
				input: {
					"&[type=number]": {
						MozAppearance: "textfield",
						"&::-webkit-outer-spin-button": {
							margin: 0,
							WebkitAppearance: "none",
						},
						"&::-webkit-inner-spin-button": {
							margin: 0,
							WebkitAppearance: "none",
						},
					},
				},
				textarea: {
					"&::-webkit-input-placeholder": {
						color: theme.palette.text.disabled,
					},
					"&::-moz-placeholder": {
						opacity: 1,
						color: theme.palette.text.disabled,
					},
					"&:-ms-input-placeholder": {
						color: theme.palette.text.disabled,
					},
					"&::placeholder": {
						color: theme.palette.text.disabled,
					},
				},

				img: { display: "block", maxWidth: "100%" },

				// Lazy Load Img
				".blur-up": {
					WebkitFilter: "blur(5px)",
					filter: "blur(5px)",
					transition: "filter 400ms, -webkit-filter 400ms",
				},
				".blur-up.lazyloaded ": {
					WebkitFilter: "blur(0)",
					filter: "blur(0)",
				},
				// hidden component
				".visually-hidden": {
					position: "absolute",
					overflow: "hidden",
					clip: " rect(0 0 0 0)",
					width: "1px",
					height: "1px",
					margin: "-1px",
					padding: "0",
					whiteSpace: "nowrap",
					border: "0",
					clipPath: "inset(100%)",
					appearance: "none",
				},
			}}
		/>
	);
}

export default GlobalThemeStyles;

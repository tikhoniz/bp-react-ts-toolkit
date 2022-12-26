// ----------------------------------------------------------------------

export default function Card(theme: any) {
	return {
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: theme.customShadows.z16,
					borderRadius: theme.shape.borderRadius,
					position: "relative",
					zIndex: 0, // Fix Safari overflow: hidden with border radius
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: { variant: "h4" },
				subheaderTypographyProps: {
					variant: "body2",
					marginTop: theme.spacing(0.5),
				},
			},
			styleOverrides: {
				root: {
					padding: theme.spacing(3, 3, 0),
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: theme.spacing(3),
				},
			},
		},
	};
}

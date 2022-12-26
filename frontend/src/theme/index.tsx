import { ReactNode, useMemo } from "react";
// material
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// theme
import palette from "./palette";
import typography from "./typography";
import ComponentsOverrides from "./overrides";
import shadows, { customShadows } from "./shadows";
import shape from "./shape";

interface ThemeProps {
	children?: ReactNode;
}

function ThemeConfig({ children }: ThemeProps): JSX.Element {
	const themeOptions: any = useMemo(
		() => ({
			palette,
			shape,
			typography,
			//breakpoints,
			shadows,
			customShadows,
		}),
		[]
	);
	const theme: any = createTheme(themeOptions);

	theme.components = ComponentsOverrides(theme);

	return (
		<ThemeProvider theme={theme}>
			{/* используется как normalize.css */}
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default ThemeConfig;

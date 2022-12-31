import { alpha } from "@mui/material";

// SETUP COLORS
const GREY = {
	0: "#FFFFFF",
	100: "#F9FAFB",
	200: "#F4F6F8",
	300: "#DFE3E8",
	400: "#C4CDD5",
	500: "#919EAB",
	600: "#637381",
	700: "#454F5B",
	800: "#212B36",
	900: "#161C24",
	500_8: alpha("#919EAB", 0.08),
	500_12: alpha("#919EAB", 0.12),
	500_16: alpha("#919EAB", 0.16),
	500_24: alpha("#919EAB", 0.24),
	500_32: alpha("#919EAB", 0.32),
	500_48: alpha("#919EAB", 0.48),
	500_56: alpha("#919EAB", 0.56),
	500_80: alpha("#919EAB", 0.8),
	250: "#f2f2f2",
};

//* цвета для всей темы
// основные
const PRIMARY = {
	main: "#01A5C0",
	dark: "#0197AE",
	light: "#45BED1",
	lighter: "#def3f6ad",
	darker: "#005249",
	contrastText: "#fff",
};

// дополнительные
const SECONDARY = {
	lighter: "#908AAC",
	light: "#645E84",
	main: "#343145",
	dark: "#1D1C27",
	darker: "#101016",
	contrastText: "#fff",
};

const INFO = {
	lighter: "#D0F2FF",
	light: "#74CAFF",
	main: "#1890FF",
	dark: "#0C53B7",
	darker: "#04297A",
	contrastText: "#fff",
};

const SUCCESS = {
	lighter: "#E9FCD4",
	light: "#AAF27F",
	main: "#3CBD15",
	dark: "#229A16",
	darker: "#08660D",
	contrastText: "#fff",
};

const ERROR = {
	lighter: "#FFE7D9",
	light: "#FFA48D",
	main: "#FF4842",
	dark: "#B72136",
	darker: "#7A0C2E",
	contrastText: "#fff",
};

const WARNING = {
	lighter: "#FFF7CD",
	light: "#FFE16A",
	main: "#FFC107",
	dark: "#B78103",
	darker: "#7A4F01",
	//contrastText: GREY[800],
	contrastText: "#fff",
};
const COMMON = {
	common: { black: "#000000", white: "#ffffff", base: "#51c5cf" },
	primary: { ...PRIMARY },
	secondary: { ...SECONDARY },
	info: { ...INFO },
	success: { ...SUCCESS },
	error: { ...ERROR },
	grey: GREY,
	warning: { ...WARNING },
	divider: GREY[500_24],
	action: {
		hover: GREY[500_8],
		selected: GREY[500_16],
		disabled: GREY[500_80],
		disabledBackground: GREY[500_24],
		focus: GREY[500_24],
		hoverOpacity: 0.08,
		disabledOpacity: 0.48,
	},
};

const palette = {
	...COMMON,
	text: {
		//primary: "#3d3e3e",
		primary: "#294661",
		//primary: "#000e35",

		//secondary: "#294661",
		secondary: "#637381",
		tertiary: "#637381",
		success: "#08660D",
		info: "#0C53B7",
		disabled: GREY[500],
	},
	background: { paper: "#fff", default: "#fff", neutral: GREY[200] },
	action: { active: GREY[600], ...COMMON.action },
};

export default palette;

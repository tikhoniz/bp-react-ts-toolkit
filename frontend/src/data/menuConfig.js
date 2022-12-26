import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
//import RateReviewIcon from "@mui/icons-material/RateReview";
import LoginIcon from "@mui/icons-material/Login";

// ----------------------------------------------------------------------
const ICON_SIZE = { width: 20, height: 20 };

export const menuDesktop = [
	{
		title: "Главная",
		path: "/",
	},
	{
		title: "Расписание",
		path: "/schedule",
	},
	{
		title: "Стоимость",
		path: "/pricing",
	},
	{
		title: "Видео",
		path: "/workout-video",
	},
	//{
	//	title: "Блог",
	//	path: "/blog/posts",
	//},
	{
		title: "Войти",
		path: "/auth",
	},
];

export const menuMobile = [
	{
		title: "Главная",
		path: "/",
		icon: <HomeIcon {...ICON_SIZE} />,
	},
	{
		title: "Расписание",
		path: "/schedule",
		icon: <CalendarMonthIcon {...ICON_SIZE} />,
	},
	{
		title: "Стоимость",
		path: "/pricing",
		icon: <MonetizationOnIcon {...ICON_SIZE} />,
	},
	{
		title: "Видео",
		path: "/workout-video",
		icon: <OndemandVideoIcon {...ICON_SIZE} />,
	},
	//{
	//	title: "Блог",
	//	path: "/blog/posts",
	//	icon: <RateReviewIcon {...ICON_SIZE} />,
	//},
	{
		title: "Войти",
		path: "/auth",
		icon: <LoginIcon {...ICON_SIZE} />,
	},
];

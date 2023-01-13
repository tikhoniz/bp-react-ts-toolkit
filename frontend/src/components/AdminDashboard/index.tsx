import { lazy, useEffect, useState } from "react";
// material
import { Tab, Box, Tabs, Stack, Container, Typography } from "@mui/material";
import { styled } from "@mui/material";
//import GroupClasses from "./GroupClasses";
//import Summary from "./Summary";
//import YoutubeVideos from "./YoutubeVideos";
//import Posts from "./Posts";
//import { getAllGroups } from "../../store/actionCreators/classActions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAllYoutubeVideo } from "../../store/actionCreators/youtubeVideoActions";
//import { getAllPosts } from "../../store/actionCreators/postActions";
import { getAllMessages } from "../../store/actionCreators/messageActions";
import Loadable from "../shared/Loadable";
//import Messages from "./Messages";
// lazy components
const Summary = Loadable(lazy(() => import("./Summary")));
const GroupClasses = Loadable(lazy(() => import("./GroupClasses")));

// ---------------------------- STYLE --------------------------

const TabsWrapperStyle = styled("div")(({ theme }) => ({
	width: "100%",
	display: "flex",
	backgroundColor: theme.palette.background.paper,

	justifyContent: "center",
	[theme.breakpoints.up("sm")]: {
		justifyContent: "flex-start",
	},
	[theme.breakpoints.up("md")]: {
		padding: theme.spacing(3),
		paddingLeft: theme.spacing(10),
	},
}));

const TabStyle = styled(Tab)(({ theme }) => ({
	"&": {
		marginRight: "10px !important",
		minWidth: "60px",
	},
	[theme.breakpoints.up("sm")]: {
		marginRight: "20px  !important",
	},
	[theme.breakpoints.up("md")]: {
		marginRight: "40px !important",
	},
}));
//---------------------------------------------------------------

const AdminDashboard = (): JSX.Element => {
	const { users } = useAppSelector((state) => state.userReducer);
	const { messages } = useAppSelector((state) => state.messageReducer);
	const { adminEvents } = useAppSelector((state) => state.eventReducer);
	const { videoList } = useAppSelector((state) => state.youtubeVideoReducer);

	const [currentTab, setCurrentTab] = useState("summary");

	const handleChangeTab = (event: any, newValue: any) => {
		setCurrentTab(newValue);
	};

	const DASHBOARD_TABS = [
		{
			id: "summary",
			value: "Сводка",
			//icon: <Icon icon={roundAccountBox} width={20} height={20} />,
			component: (
				<Summary
					events={adminEvents}
					users={users}
					messages={messages}
					videos={videoList}
				/>
			),
		},
		{
			id: "groups",
			value: "Групповые классы",
			//icon: <Icon icon={outlineHistoryEdu} width={20} height={20} />,
			component: <GroupClasses classes={adminEvents} />,
		},
		//{
		//	id: "video",
		//	value: "Youtube видео",
		//	//icon: <Icon icon={BaselineForwardToInbox} width={20} height={20} />,

		//	//component: <YoutubeVideos />,
		//},
		//{
		//	id: "posts",
		//	value: "Посты",
		//	//icon: <Icon icon={BaselineForwardToInbox} width={20} height={20} />,

		//	//component: <Posts />,
		//},
		//{
		//	id: "messages",
		//	value: "Сообщения",
		//	//icon: <Icon icon={BaselineForwardToInbox} width={20} height={20} />,

		//	//component: <Messages />,
		//},
	];

	return (
		<Container maxWidth="xl" sx={{ mt: 10 }}>
			<TabsWrapperStyle>
				<Tabs
					value={currentTab}
					scrollButtons="auto"
					variant="scrollable"
					allowScrollButtonsMobile
					onChange={handleChangeTab}
				>
					{DASHBOARD_TABS.map((tab: any) => (
						<TabStyle
							disableRipple
							key={tab.id}
							value={tab.id}
							label={
								<Stack direction="row" alignItems="center" spacing={1}>
									{/*{tab.icon}*/}
									<Typography variant="subtitle1">{tab.value}</Typography>
								</Stack>
							}
							aria-label={tab.id}
						/>
					))}
				</Tabs>
			</TabsWrapperStyle>

			{DASHBOARD_TABS.map((tab) => {
				const isMatched = tab.id === currentTab;
				return isMatched && <Box key={tab.value}>{tab.component}</Box>;
			})}
		</Container>
	);
};

export default AdminDashboard;

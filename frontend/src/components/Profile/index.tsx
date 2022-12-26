import { FC, lazy, useState } from "react";
// models
import { IUser } from "../../models/IUser";
//material
import {
	Tab,
	Box,
	Card,
	Tabs,
	Stack,
	Container,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material";
// components
import Loadable from "../shared/Loadable";
// icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HistoryIcon from "@mui/icons-material/History";
// lazy components
const UserInfo = Loadable(lazy(() => import("./UserInfo")));
const UserHistory = Loadable(lazy(() => import("./UserHistory")));
const ProfileCover = Loadable(lazy(() => import("./ProfileCover")));
const UserQuestions = Loadable(lazy(() => import("./UserQuestions")));

const SIZE_ICON = "medium";

//-------------------------
const TabsWrapperStyle = styled("div")(({ theme }) => ({
	zIndex: 9,
	bottom: 0,
	width: "100%",
	display: "flex",
	position: "absolute",
	backgroundColor: "#F5F5F5",
	justifyContent: "center",
	[theme.breakpoints.up("md")]: {
		justifyContent: "flex-end",
		paddingRight: theme.spacing(3),
	},
}));

const CardStyle = styled(Card)(({ theme }: any) => ({
	marginBottom: 24,
	height: 280,
	position: "relative",
	backgroundColor: theme.palette.background.neutral,
}));
//----------------------------
const PROFILE_TABS = [
	{
		id: "profile",
		value: "Профиль",
		icon: <AccountBoxIcon fontSize={SIZE_ICON} />,
		component: <UserInfo />,
	},
	{
		id: "contact-us",
		value: "Задать вопрос",
		icon: <ContactSupportIcon fontSize={SIZE_ICON} />,
		component: <UserQuestions />,
	},
	{
		id: "history",
		value: "История",
		icon: <HistoryIcon fontSize={SIZE_ICON} />,
		component: <UserHistory />,
	},
];
//------------------------------------------------------------------

interface ProfileProps {
	user: IUser;
}

const Profile: FC<ProfileProps> = ({ user }) => {
	const [currentTab, setCurrentTab]: any = useState("profile");

	const handleChangeTab = (event: any, newValue: any) => {
		setCurrentTab(newValue);
	};

	return (
		<Container maxWidth={"xl"}>
			<CardStyle>
				<ProfileCover
					cover={user.cover}
					avatar={user.image}
					userName={user.name}
				/>

				<TabsWrapperStyle>
					<Tabs
						value={currentTab}
						scrollButtons="auto"
						variant="scrollable"
						allowScrollButtonsMobile
						onChange={handleChangeTab}
					>
						{PROFILE_TABS.map((tab: any) => {
							const isMatched = tab.id === currentTab;
							return (
								<Tab
									disableRipple
									value={tab.id}
									key={tab.value}
									label={
										<Stack
											direction="row"
											alignItems="center"
											spacing={1}
											sx={{
												opacity: isMatched ? 1 : 0.75,
											}}
										>
											{tab.icon}
											<Typography variant="subtitle1">{tab.value}</Typography>
										</Stack>
									}
									aria-label={tab.id}
								/>
							);
						})}
					</Tabs>
				</TabsWrapperStyle>
			</CardStyle>

			{PROFILE_TABS.map((tab: any) => {
				const isMatched = tab.id === currentTab;
				return isMatched && <Box key={tab.value}>{tab.component}</Box>;
			})}
		</Container>
	);
};

export default Profile;

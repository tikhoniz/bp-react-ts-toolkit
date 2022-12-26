// material
import { styled } from "@mui/material/styles";
// store
import { useAppSelector } from "../hooks/redux";
// components
import UserSetting from "../components/Profile/UserSetting";
import Page from "../components/shared/Page";

//--------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(15),
}));
//---------------------

const ProfileSettingPage = (): JSX.Element => {
	const { user } = useAppSelector((state) => state.userReducer);

	return (
		<RootStyle title="Редактирование профиля | Bright's Pilates">
			{user && <UserSetting user={user} />}
		</RootStyle>
	);
};

export default ProfileSettingPage;

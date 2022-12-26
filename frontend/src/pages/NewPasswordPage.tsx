import { styled } from "@mui/material";
import NewPasswordForm from "../components/Auth/ChangePassword/NewPasswordForm";
// components
import Page from "../components/shared/Page";

//--------------------
const RootStyle = styled(Page)({
	position: "relative",
	minHeight: "100%",
});
//---------------------

const NewPasswordPage = (): JSX.Element => {
	return (
		<RootStyle title="Установка нового пароля | Online Pilates studio">
			<NewPasswordForm />
		</RootStyle>
	);
};

export default NewPasswordPage;

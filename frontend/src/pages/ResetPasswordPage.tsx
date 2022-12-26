import { styled } from "@mui/material";
import ResetPasswordForm from "../components/Auth/ChangePassword/ResetPasswordForm";
import Page from "../components/shared/Page";

//------------------------
const RootStyle = styled(Page)({
	position: "relative",
	minHeight: "100%",
});
//------------------------

const ResetPasswordPage = (): JSX.Element => {
	return (
		<RootStyle title="Изменить пароль | Online Pilates studio">
			<ResetPasswordForm />
		</RootStyle>
	);
};

export default ResetPasswordPage;

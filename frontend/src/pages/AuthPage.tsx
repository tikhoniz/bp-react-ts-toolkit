import { lazy } from "react";
// material
import { styled } from "@mui/material";
// components
const Page = lazy(() => import("../components/shared/Page"));
const Login = lazy(() => import("../components/Auth/Login"));

//--------------------
const RootStyle = styled(Page)({
	position: "relative",
});
//--------------------

const AuthPage = (): JSX.Element => {
	return (
		<RootStyle title="Вход в аккаунт | Online Pilates studio">
			<Login />
		</RootStyle>
	);
};

export default AuthPage;

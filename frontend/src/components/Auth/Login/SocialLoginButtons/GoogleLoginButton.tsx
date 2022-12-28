import { LoginSocialGoogle, IResolveParams } from "reactjs-social-login";
import { useAppDispatch } from "../../../../hooks/redux";
import { authSocial } from "../../../../store/actionCreators/userActions";
import { userSliceActions } from "../../../../store/reducers/UserSlice";
import SocialButton from "./SocialButton";

const GoogleLoginButton = ({ isLogin }: any) => {
	const dispatch = useAppDispatch();
	const { loading, loaded } = userSliceActions;

	const onLoginSuccess = async (provider: any, profile: any) => {
		const userObject = {
			email: profile.email,
			name: profile.given_name,
			last_name: profile.family_name,
			provider: provider,
		};

		await dispatch(authSocial({ userObject }));
	};

	return (
		<LoginSocialGoogle
			client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
			onLoginStart={() => dispatch(loading())}
			onResolve={({ provider, data }: IResolveParams) => {
				onLoginSuccess(provider, data);
			}}
			onReject={(err) => {
				//console.log(err);
				dispatch(loaded());
			}}
		>
			<SocialButton color="google">
				{isLogin ? "Войти" : "Регистрация"} с аккаунтом Google
			</SocialButton>
		</LoginSocialGoogle>
	);
};

export default GoogleLoginButton;

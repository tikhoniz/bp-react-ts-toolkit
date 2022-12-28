import { LoginSocialFacebook, IResolveParams } from "reactjs-social-login";
import { useAppDispatch } from "../../../../hooks/redux";
import { authSocial } from "../../../../store/actionCreators/userActions";
import { userSliceActions } from "../../../../store/reducers/UserSlice";
import SocialButton from "./SocialButton";

const FacebookLoginButton = ({ isLogin }: any) => {
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
		<LoginSocialFacebook
			appId={process.env.REACT_APP_FB_APP_ID as string}
			onLoginStart={() => dispatch(loading())}
			onResolve={({ provider, data }: IResolveParams) => {
				onLoginSuccess(provider, data);
			}}
			onReject={(err) => {
				console.log(err);
				dispatch(loaded());
			}}
		>
			<SocialButton color="facebook">
				{isLogin ? "Войти" : "Регистрация"} с аккаунтом Facebook
			</SocialButton>
		</LoginSocialFacebook>
	);
};

export default FacebookLoginButton;

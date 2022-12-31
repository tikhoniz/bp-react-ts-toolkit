import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
// material
import ThemeConfig from "./theme";
import { styled } from "@mui/material";
import GlobalThemeStyles from "./theme/globalStyles";
// hooks
import { useAppDispatch, useAppSelector } from "./hooks/redux";
// store
import { checkAuth } from "./store/actionCreators/userActions";
import { userSliceActions } from "./store/reducers/UserSlice";
// components
import Loadable from "./components/shared/Loadable";
import { AnimatePresence } from "framer-motion";
// lazy components
const MainLayout = Loadable(lazy(() => import("./layouts/MainLayout")));
const Authorized = Loadable(lazy(() => import("./components/Authorized")));
const RequireAuthorization = Loadable(
	lazy(() => import("./components/RequireAuthorization"))
);
const ScrollToTop = Loadable(
	lazy(() => import("./components/shared/ScrollToTop"))
);
const Message = Loadable(
	lazy(() => import("./components/shared/messages/Message"))
);
const ErrorMessage = Loadable(
	lazy(() => import("./components/shared/messages/ErrorMessage"))
);
const CookieNotification = Loadable(
	lazy(() => import("./components/shared/messages/CookieNotification"))
);
// lazy pages
const HomePage = Loadable(lazy(() => import("./pages/HomePage")));
const ZoomPage = Loadable(lazy(() => import("./pages/ZoomPage")));
const AuthPage = Loadable(lazy(() => import("./pages/AuthPage")));
const PaymentPage = Loadable(lazy(() => import("./pages/PaymentPage")));
const ProfilePage = Loadable(lazy(() => import("./pages/ProfilePage")));
const PricingPage = Loadable(lazy(() => import("./pages/PricingPage")));
const SchedulePage = Loadable(lazy(() => import("./pages/SchedulePage")));
const NewPasswordPage = Loadable(lazy(() => import("./pages/NewPasswordPage")));
const SingleCoachPage = Loadable(lazy(() => import("./pages/SingleCoachPage")));

const PageNotFound = Loadable(lazy(() => import("./pages/404")));

const VideoWorkoutsPage = Loadable(
	lazy(() => import("./pages/VideoWorkoutsPage"))
);
const ResetPasswordPage = Loadable(
	lazy(() => import("./pages/ResetPasswordPage"))
);
const ProfileSettingPage = Loadable(
	lazy(() => import("./pages/ProfileSettingPage"))
);
const SuccessPaymentPage = Loadable(
	lazy(() => import("./pages/SuccessPaymentPage"))
);
// ---------------------------------
const MainStyle = styled("main")({
	gridArea: "main",
	position: "relative",
});
// ---------------------------------

function App() {
	const dispatch = useAppDispatch();
	const { clearError, clearMessage } = userSliceActions;
	const { error, message } = useAppSelector((state) => state.userReducer);
	const [cookies, setCookie] = useCookies(["cookieNotification"]);

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<>
			<ThemeConfig>
				<GlobalThemeStyles />
				<ScrollToTop />
				<MainLayout>
					<MainStyle id="main">
						<AnimatePresence>
							{!cookies.cookieNotification && (
								<CookieNotification
									clickHandler={() => setCookie("cookieNotification", "closed")}
								/>
							)}

							{error && (
								<ErrorMessage
									data={error}
									clickHandler={() => dispatch(clearError())}
								/>
							)}

							{message && (
								<Message
									message={message}
									clickHandler={() => dispatch(clearMessage())}
								/>
							)}
						</AnimatePresence>
						<Routes>
							{/* public routes */}
							<Route path="/" element={<HomePage />} />
							<Route path="/pricing" element={<PricingPage />} />
							<Route path="/schedule" element={<SchedulePage />} />
							<Route path="/coaches/:id" element={<SingleCoachPage />} />
							<Route path="/workout-video" element={<VideoWorkoutsPage />} />

							{/*auth routes*/}
							<Route element={<Authorized />}>
								<Route path="/auth" element={<AuthPage />} />
								<Route path="/auth/reset" element={<ResetPasswordPage />} />
								<Route
									path="/auth/set-new-password/:token"
									element={<NewPasswordPage />}
								/>
							</Route>
							{/* user routes */}
							<Route
								element={
									<RequireAuthorization
										allowedRoles={[process.env.REACT_APP_USER]}
									/>
								}
							>
								<Route path="/zoom" element={<ZoomPage />} />
								<Route path="/profile" element={<ProfilePage />} />
								<Route path="/payment/:id" element={<PaymentPage />} />

								<Route
									path="/payment/success"
									element={<SuccessPaymentPage />}
								/>

								<Route
									path="/profile/settings"
									element={<ProfileSettingPage />}
								/>
							</Route>

							{/* wrong routes */}
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</MainStyle>
				</MainLayout>
			</ThemeConfig>
		</>
	);
}

export default App;

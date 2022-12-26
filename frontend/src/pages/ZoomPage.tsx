import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ZoomMtg } from "@zoomus/websdk";
// models
import { IUser } from "../models/IUser";
// material
import { styled } from "@mui/material";
// store
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getSignature } from "../store/actionCreators/zoomActions";

//--------------------
const RootStyle = styled("div")({
	position: "relative",
	minHeight: "100%",
});
//---------------------

interface IMeeting {
	conferenceId: string;
	accessCode: string;
}

const ZoomPage = (): JSX.Element => {
	const { meeting, signature } = useAppSelector((state) => state.zoomReducer);
	const { user } = useAppSelector((state) => state.userReducer);
	const { conferenceId, accessCode } = (meeting as IMeeting) || {};
	const { email, name, roles } = (user as IUser) || {};
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (meeting) {
			const isAdmin = roles.includes(process.env.REACT_APP_ADMIN);
			if (signature) {
				ZoomMtg.setZoomJSLib("https://source.zoom.us/2.9.5/lib", "/av");
				ZoomMtg.preLoadWasm();
				ZoomMtg.prepareWebSDK();
				ZoomMtg.i18n.load("ru-RU");
				ZoomMtg.i18n.reload("ru-RU");

				startMeeting(signature);
			} else {
				dispatch(
					getSignature({ meetingNumber: conferenceId, role: isAdmin ? 1 : 0 })
				);
			}
		} else {
			navigate(-1);
		}
		// eslint-disable-next-line
	}, [signature]);

	function startMeeting(signature: any) {
		const zmmtg = document.getElementById(
			"zmmtg-root"
		) as HTMLDivElement | null;
		const header = document.getElementById("header") as HTMLDivElement | null;

		if (typeof document.getElementById("zmmtg-root") !== "undefined") {
			if (header !== null) header.style.zIndex = "0";
			if (zmmtg !== null) zmmtg.style.display = "block";
		}

		ZoomMtg.init({
			debug: true,
			leaveUrl: "/profile",
			disablePreview: true,
			disableInvite: true,
			isSupportAV: true,
			disableJoinAudio: true,
			success: (success: any) => {
				ZoomMtg.join({
					signature: signature,
					sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY,
					meetingNumber: conferenceId,
					userName: name,
					userEmail: email,
					passWord: accessCode,

					success: (success: any) => {
						//console.log("ZoomMtg.join SUCCESS", success);
					},
					error: (error: any) => {
						console.log(error);
					},
				});
			},
			error: (error: any) => {
				console.log(error);
			},
		});
	}

	return (
		<RootStyle title="Онлайн Пилатес студия Bright's Pilates | Онлайн тренировка">
			<Helmet>
				<link
					type="text/css"
					rel="stylesheet"
					href="https://source.zoom.us/2.9.5/css/bootstrap.css"
				/>
				<link
					type="text/css"
					rel="stylesheet"
					href="https://source.zoom.us/2.9.5/css/react-select.css"
				/>
			</Helmet>
		</RootStyle>
	);
};

export default ZoomPage;

import { lazy } from "react";
import { useParams } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
// components
import Page from "../components/shared/Page";
import LoadableImage from "../components/shared/LoadableImage";
// data
import { coaches } from "../data/coaches";
// lazy pages
const CoachAbout = (
	lazy(() => import("../components/CoachInfo/CoachAbout"))
);
const CoachAvatar = (
	lazy(() => import("../components/CoachInfo/CoachAvatar"))
);

//--------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingBottom: theme.spacing(10),
	paddingTop: theme.spacing(9),
}));
//--------------------

const SingleCoachPage = (): JSX.Element => {
	const params = useParams();
	const coachId = params.id;

	const coach = coaches.find((coach) => coach.id === coachId);

	return (
		<RootStyle title={`${coach?.name} | Bright's Pilates`}>
			<LoadableImage
				width="1920px"
				height="1080px"
				src="/images/coaches/coach-cover-image.jpg"
				placeholderSrc="/images/coaches/tiny_coach-cover-image.jpg"
				alt="Девушка занимается пилатесом напротив окна"
				imgStyle={{ maxHeight: "540px", aspectRatio: "16 / 9" }}
			/>

			<CoachAvatar
				name={coach?.name}
				picture={coach?.picture}
				placeholder={coach?.placeholder}
				alt={coach?.alt}
			/>

			<CoachAbout story={coach?.story} images={coach?.images} />
		</RootStyle>
	);
};

export default SingleCoachPage;

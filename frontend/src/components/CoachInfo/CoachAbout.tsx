import { FC } from "react";
// material
import { Grid, Container, Typography } from "@mui/material";
import { styled } from "@mui/material";
// components
import CoachImage from "./CoachImage";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	textAlign: "center",
	paddingTop: theme.spacing(5),
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("md")]: {
		textAlign: "left",
	},
}));

const TypographyStyle = styled(Typography)(({ theme }) => ({
	...theme.typography.body1,
	fontSize: 18,
	textAlign: "justify",
	letterSpacing: 1,
}));

// ----------------------------------------------------------------------
interface IStory {
	[key: string]: any;
}
interface IImages {
	[key: string]: any;
}

interface CoachAboutProps {
	story?: IStory;
	images?: IImages;
}

const CoachAbout: FC<CoachAboutProps> = ({ story = {}, images = {} }) => {
	return (
		<RootStyle>
			<Container maxWidth="lg">
				<Grid container>
					{/* первый текстовый блок */}
					<Grid
						item
						xs={12}
						md={12}
						sx={{ pl: { sm: 30, md: 50 }, mt: { xs: 10, sm: 0 } }}
					>
						<TypographyStyle>{story?.part_1}</TypographyStyle>
					</Grid>

					<Grid item xs={12} md={12} sx={{ pl: { md: 50 } }}>
						{/* второй текстовый блок */}
						<TypographyStyle>{story.part_2}</TypographyStyle>
					</Grid>
				</Grid>
				{/* =================================== Start first block ============================================= */}
				<Grid container spacing={3} mt={1} alignItems="center">
					{/* третий текстовый блок */}
					<Grid item xs={12} md={8}>
						<TypographyStyle>{story.part_3}</TypographyStyle>
						{/* четвертый текстовый блок */}
						<TypographyStyle>{story.part_4}</TypographyStyle>
					</Grid>

					{/* первый блок фотографий колонка из двух фото */}
					<Grid item xs={12} md={4}>
						<Grid container spacing={3} sx={{ pl: { md: 5 } }}>
							<Grid item sm={6} md={12}>
								<CoachImage
									alt={images.image_1.title}
									src={images.image_1.src}
								/>
							</Grid>
							<Grid item sm={6} md={12}>
								<CoachImage
									alt={images.image_2.title}
									src={images.image_2.src}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* =================================== End first block =============================================== */}

				{/* =================================== Start second block ============================================= */}
				<Grid
					container
					spacing={3}
					alignItems="center"
					sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
				>
					{/* второй блок фотографий  из двух фото */}
					<Grid item xs={12} md={4}>
						<Grid container spacing={3} sx={{ pr: { md: 5 } }}>
							<Grid item sm={6} md={12}>
								{/*<Stack spacing={3}>*/}

								<CoachImage
									alt={images.image_3.title}
									src={images.image_3.src}
								/>
							</Grid>
							<Grid item sm={6} md={12}>
								<CoachImage
									alt={images.image_4.title}
									src={images.image_4.src}
								/>

								{/*</Stack>*/}
							</Grid>
						</Grid>
					</Grid>
					{/* пятый текстовый блок */}
					<Grid item xs={12} md={8}>
						<TypographyStyle>{story.part_5}</TypographyStyle>
						<TypographyStyle>{story.part_6}</TypographyStyle>
						<TypographyStyle>{story.part_7}</TypographyStyle>
						<TypographyStyle>{story.part_8}</TypographyStyle>
					</Grid>
				</Grid>
				{/* =================================== End second block =============================================== */}

				{/* =================================== Start third block ============================================= */}

				{/* девятый текстовый блок */}
				<Grid container mt={5}>
					<Grid item>
						<TypographyStyle>{story.part_9}</TypographyStyle>
					</Grid>
				</Grid>
				<Grid item>
					<TypographyStyle>{story.part_10}</TypographyStyle>
				</Grid>

				{/* третий горизонтальный блок фотографий из трех фото горизонтальная*/}
				<Grid container spacing={3} mt={5}>
					<Grid item xs={12} md={12} lg={12}>
						<Grid container spacing={3} alignItems="flex-end">
							<Grid item sm={4}>
								<CoachImage
									alt={images.image_5.title}
									src={images.image_5.src}
								/>
							</Grid>
							<Grid item sm={4}>
								<CoachImage
									alt={images.image_6.title}
									src={images.image_6.src}
								/>
							</Grid>
							<Grid item sm={4}>
								<CoachImage
									alt={images.image_7.title}
									src={images.image_7.src}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* одиннадцатый текстовый блок */}
				<Grid container mt={5}>
					<Grid item xs={12} md={12} lg={12}>
						<Grid container spacing={3}>
							<Grid item>
								<TypographyStyle>{story.part_11}</TypographyStyle>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{/* третий горизонтальный блок фотографий из трех фото горизонтальная*/}
				<Grid container spacing={3} mt={5}>
					<Grid item xs={12} md={12} lg={12}>
						<Grid container spacing={3} alignItems="flex-end">
							<Grid item sm={4}>
								<CoachImage
									alt={images.image_8.title}
									src={images.image_8.src}
								/>
							</Grid>
							<Grid item sm={4}>
								<CoachImage
									alt={images.image_9.title}
									src={images.image_9.src}
								/>
							</Grid>
							<Grid item sm={4}>
								<CoachImage
									alt={images.image_10.title}
									src={images.image_10.src}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* седьмой текстовый блок */}
				<Grid container mt={5}>
					<Grid item>
						<TypographyStyle>{story.part_12}</TypographyStyle>
					</Grid>
				</Grid>
			</Container>
		</RootStyle>
	);
};
export default CoachAbout;

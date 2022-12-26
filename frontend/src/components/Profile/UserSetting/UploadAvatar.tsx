import { FC } from "react";
import { isString } from "lodash";
//import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
// material
import { alpha, styled } from "@mui/material";
import { Box, Typography, Paper } from "@mui/material";
// utils
import { fData } from "../../../utils/formatNumber";
// icons
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }: any) => ({
	width: 144,
	height: 144,
	margin: "auto",
	borderRadius: "50%",
	padding: theme.spacing(1),
	border: `1px dashed ${theme.palette.grey[500_32]}`,
}));

const DropZoneStyle = styled("div")({
	zIndex: 0,
	width: "100%",
	height: "100%",
	outline: "none",
	display: "flex",
	overflow: "hidden",
	borderRadius: "50%",
	position: "relative",
	alignItems: "center",
	justifyContent: "center",
	"& > *": { width: "100%", height: "100%" },
	"&:hover": {
		cursor: "pointer",
		"& .placeholder": {
			zIndex: 9,
		},
	},
});

const PlaceholderStyle = styled("div")(({ theme }: any) => ({
	display: "flex",
	position: "absolute",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "center",
	//color: theme.palette.text.secondary,
	backgroundColor: theme.palette.background.neutral,
	transition: theme.transitions.create("opacity", {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.shorter,
	}),
	"&:hover": { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

interface UploadAvatarProps {
	accept: object;
	data: string;
	maxSize: number;
	onDrop: (acceptedFiles: string) => void;
	multiple: boolean;
	error: boolean;
	caption: JSX.Element;
}

const UploadAvatar: FC<UploadAvatarProps> = ({
	error,
	data,
	caption,
	sx,
	...other
}: any) => {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragReject,
		fileRejections,
	} = useDropzone({
		multiple: false,
		...other,
	});

	const ShowRejectionItems = () => (
		<Paper
			variant="outlined"
			sx={{
				py: 1,
				px: 2,
				my: 2,
				borderColor: "error.light",
				bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
			}}
		>
			{fileRejections.map(({ file, errors }) => {
				const { path, size }: any = file;
				return (
					<Box key={path} sx={{ my: 1 }}>
						<Typography variant="subtitle2" noWrap>
							{path} - {fData(size)}
						</Typography>
						{errors.map((e) => (
							<Typography key={e.code} variant="caption" component="p">
								- {e.message}
							</Typography>
						))}
					</Box>
				);
			})}
		</Paper>
	);

	return (
		<>
			<RootStyle sx={sx}>
				<DropZoneStyle
					{...getRootProps()}
					sx={{
						...(isDragActive && { opacity: 0.72 }),
						...((isDragReject || error) && {
							color: "error.main",
							borderColor: "error.light",
							bgcolor: "error.lighter",
						}),
					}}
				>
					<input {...getInputProps()} />

					{data && (
						<Box
							component="img"
							alt="avatar"
							src={
								isString(data)
									? process.env.REACT_APP_AVATAR_URL + data + ".jpg"
									: data.preview
							}
							sx={{ zIndex: 8, objectFit: "cover" }}
						/>
					)}

					<PlaceholderStyle
						className="placeholder"
						sx={{
							...(data && {
								opacity: 0,
								color: "common.white",
								bgcolor: "grey.900",
								"&:hover": { opacity: 0.62 },
							}),
						}}
					>
						<AddAPhotoIcon fontSize="large" sx={{ mt: 1 }} />
						<Typography variant="caption">
							{data ? "Обновить фото" : "Загрузить фото"}
						</Typography>
					</PlaceholderStyle>
				</DropZoneStyle>
			</RootStyle>

			{caption}

			{fileRejections.length > 0 && <ShowRejectionItems />}
		</>
	);
};

export default UploadAvatar;

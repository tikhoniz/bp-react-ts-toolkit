import { LoadingButton } from "@mui/lab";

const ActionButton = ({ sx, loading, onClick, label, variant }: any) => {
	return (
		<LoadingButton
			type="submit"
			variant={variant}
			loading={loading}
			sx={{ ...sx }}
			onClick={onClick}
		>
			{label}
		</LoadingButton>
	);
};

export default ActionButton;

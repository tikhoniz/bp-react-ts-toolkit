import { NavLink } from "react-router-dom";
import { FC } from "react";
// hooks
import { useAppDispatch } from "../../../hooks/redux";
// store
import { eventSliceActions } from "../../../store/reducers/EventSlice";
// material
import { Button } from "@mui/material";

interface SingupButtonProps {
	url: string;
	variant?: any;
	sx: object;
}

const SingupButton: FC<SingupButtonProps> = ({ sx, url, variant }) => {
	const dispatch = useAppDispatch();
	const { setEvent } = eventSliceActions;

	return (
		<Button
			to={url}
			type="button"
			variant={variant || "outlined"}
			component={NavLink}
			onClick={() => dispatch(setEvent(null))}
			sx={{
				...sx,
			}}
		>
			Вход
		</Button>
	);
};

export default SingupButton;

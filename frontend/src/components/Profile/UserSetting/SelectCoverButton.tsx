import { useRef, useState } from "react";
import {
	Box,
	Typography,
	MenuItem,
	Menu,
	Divider,
	Tooltip,
	IconButton,
} from "@mui/material";
//data
import MoreVertIcon from "@mui/icons-material/MoreVert";
import coverList from "../../../data/covers";

function SelectCoverButton({ changeHandler, user, disabled }: any) {
	const [open, setOpen] = useState(false);

	const menuRef = useRef(null);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (value: any) => {
		changeHandler(value);
		handleClose();
	};

	return (
		<Box sx={{ position: "absolute", top: 4, right: 4, zIndex: 2 }}>
			<Tooltip title="Нажмите, чтобы выбрать обои">
				<IconButton ref={menuRef} onClick={handleOpen} disabled={disabled}>
					<MoreVertIcon sx={{ fontSize: 40, color: "common.white" }} />
				</IconButton>
			</Tooltip>

			<Menu
				open={open}
				anchorEl={menuRef.current}
				onClose={handleClose}
				PaperProps={{
					sx: { width: 200, maxWidth: "100%" },
				}}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Typography variant="subtitle2" sx={{ ml: 2 }}>
					Картинки
				</Typography>
				{coverList.images.map((option) => (
					<MenuItem
						key={option.value}
						selected={option.value === user.cover}
						onClick={() => handleChange(option.value)}
						sx={{ typography: "body2" }}
					>
						{option.label}
					</MenuItem>
				))}

				<Divider />
				<Typography variant="subtitle2" sx={{ ml: 2 }}>
					Однотонные
				</Typography>
				{coverList.simple.map((option) => (
					<MenuItem
						key={option.value}
						selected={option.value === user.cover}
						onClick={() => handleChange(option.value)}
						sx={{ typography: "body2" }}
					>
						{option.label}
					</MenuItem>
				))}

				<Divider />
				<Typography variant="subtitle2" sx={{ ml: 2 }}>
					Текстура
				</Typography>
				{coverList.texture.map((option) => (
					<MenuItem
						key={option.value}
						selected={option.value === user.cover}
						onClick={() => handleChange(option.value)}
						sx={{ typography: "body2" }}
					>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
}

export default SelectCoverButton;

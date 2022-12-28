import React from "react";
// material
import { styled } from "@mui/material";
import { Link, Typography } from "@mui/material";

//-------------------------------------------------------

const HeaderStyle = styled("header")(({ theme }) => ({
	position: "absolute",
	top: -35,
	right: 0,
	zIndex: 9,
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
}));

const ToggleMode = ({ mode, changeModeHandler }: any) => {
	return (
		<HeaderStyle>
			<Typography variant="subtitle1">
				{mode ? "Нет аккаунта?" : "Уже есть аккаунт?"} &nbsp;
			</Typography>
			<Link
				component="button"
				underline="none"
				variant="subtitle1"
				onClick={() => changeModeHandler((prev: boolean) => !prev)}
				sx={{ "&:hover": { textDecoration: "underline" } }}
			>
				{mode ? "Регистрация" : "Вход"}
			</Link>
		</HeaderStyle>
	);
};

export default ToggleMode;

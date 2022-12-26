import { Navigate, Outlet } from "react-router-dom";

const Authorized = () => {
	const token: any = localStorage.getItem("token");

	return token && token !== "undefined" ? (
		<Navigate to="/" replace />
	) : (
		<Outlet />
	);
};

export default Authorized;

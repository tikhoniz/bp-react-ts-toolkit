import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuthorization = ({ allowedRoles }: any) => {
	const location: any = useLocation();
	const token: any = localStorage.getItem("token");
	const item: any = localStorage.getItem("roles");

	let roles: [] = [];
	if (item) {
		roles = JSON.parse(item);
	}

	return token && roles?.find((role: any) => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : (
		<Navigate to="/auth" replace state={{ from: location }} />
	);
};

export default RequireAuthorization;

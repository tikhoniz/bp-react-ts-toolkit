import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface AdminAuthorizedProps {
	allowedRoles: [string];
}

const AdminAuthorized: FC<AdminAuthorizedProps> = ({ allowedRoles }) => {
	const token: string | null = localStorage.getItem("token");
	const item: string | null = localStorage.getItem("roles");

	let roles: [] = [];
	if (item) {
		roles = JSON.parse(item);
	}

	return token && roles?.find((role: any) => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : (
		<Navigate to="/" replace />
	);
};

export default AdminAuthorized;

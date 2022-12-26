import ApiError from "../exceptions/api-error";
import tokenService from "../service/token-service";

export default function (roles: string | string[]) {
	return function (
		//req: { method: string; headers: { authorization: any } },
		req: any,
		res: any,
		next: (arg0: ApiError | undefined) => void
	) {
		if (req.method === "OPTIONS") {
			next(undefined);
		}

		try {
			const authorizationHeader = req.headers.authorization;

			if (!authorizationHeader) {
				return next(ApiError.UnathorizedError());
			}

			const accessToken = authorizationHeader.split(" ")[1];

			if (!accessToken) {
				return next(ApiError.UnathorizedError());
			}

			const decodedData: any = tokenService.validateAccessToken(accessToken);

			let hasRole = false;

			decodedData.roles.forEach((role: any) => {
				if (roles.includes(role)) {
					hasRole = true;
				}
			});

			if (!hasRole) return next(ApiError.ForbiddenError());

			next(undefined);
		} catch (error) {
			return next(ApiError.UnathorizedError());
		}
	};
}

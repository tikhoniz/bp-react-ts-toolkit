export default class ApiError extends Error {
	status: any;
	errors: never[];

	constructor(status: number, message: string | undefined, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static UnathorizedError() {
		return new ApiError(401, "Пользователь не авторизован");
	}

	static ForbiddenError() {
		return new ApiError(
			403,
			"У вас нет разрешения на выполнение этого действия"
		);
	}

	static BadRequest(message: string, errors = []) {
		return new ApiError(400, message, errors);
	}
}

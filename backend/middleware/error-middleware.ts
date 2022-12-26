import ApiError from "../exceptions/api-error";

export default function (err: any, req: any, res: any, next: any) {
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}

	return res
		.status(500)
		.json({ message: `Неизвестная ошибка. ${err.message}` });
}

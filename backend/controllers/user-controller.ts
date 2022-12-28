import { validationResult } from "express-validator";
// error
import ApiError from "../exceptions/api-error";
// service
import userService from "../service/user-service";

class UserController {
	//* @desc  Вход и регистрация через социальные сети
	//* @route  POST /api/users/authSocial
	//* @access Public
	async authSocial(req: any, res: any, next: any) {
		try {
			const { userObject } = req.body;

			if (!userObject.email) {
				return next(ApiError.BadRequest("Недостаточно данных"));
			}

			const user = await userService.getUser(userObject.email);

			if (user) {
				const userData = await userService.loginSocial(user);

				res.cookie("refreshToken", userData.refreshToken, {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				}); //30d

				return res.json(userData);
			} else {
				const userData = await userService.registrationSocial(userObject);

				res.cookie("refreshToken", userData.refreshToken, {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				}); //3

				return res.json(userData);
			}
		} catch (error) {
			next(error);
		}
	}
	//* @desc  Регистрация с электронной почтой
	//* @route  POST /api/users/registration
	//* @access Public
	async registration(req: any, res: any, next: any) {
		try {
			const errors: any = validationResult(req);

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
			}

			const { name, email, password } = req.body;

			if (!name || !email || !password) {
				return next(ApiError.BadRequest("Указаны не все данные"));
			}

			const userData = await userService.registration(name, email, password);

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}); //30d

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
	//* @desc  Вход с электронной почтой
	//* @route  POST /api/users/login
	//* @access Public
	async login(req: any, res: any, next: any) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return next(ApiError.BadRequest("Указаны не все данные"));
			}

			const userData = await userService.login(email, password);

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}); //30d

			return res.status(200).json(userData);
		} catch (error) {
			next(error);
		}
	}
	//* @desc  Выход
	//* @route  POST /api/users/logout
	//* @access Private/User
	async logout(req: any, res: any, next: any) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);

			res.clearCookie("refreshToken");

			return res.json(token);
		} catch (error) {
			next(error);
		}
	}
	//* @desc  Отправка письма для подтверждения почты
	//* @route  POST /api/users/send/confirmationEmail
	//* @access Private/User
	async sendConfirmationEmail(req: any, res: any, next: any) {
		try {
			const { userEmail } = req.body;

			const updatedUser = await userService.sendConfirmationEmail(userEmail);

			return res.json(updatedUser);
		} catch (error) {
			next(error);
		}
	}
	//* @desc  Подтверждение почты
	//* @route  POST /api/users/activate/:link
	//* @access Private/User
	async activate(req: any, res: any, next: any) {
		try {
			const activationLink = req.params.link;

			const response = await userService.activate(activationLink);

			return res.redirect(
				`${process.env.CLIENT_URL}/activate/success/${response.email}`
			);
		} catch (error) {
			return res.redirect(`${process.env.CLIENT_URL}/activate/error`);
		}
	}
	//* @desc  Обновление токена пользователя
	//* @route  POST /api/users/refresh
	//* @access Private/User
	async refresh(req: any, res: any, next: any) {
		try {
			// достаем рефреш токен из запроса
			const { refreshToken } = req.cookies;

			const userData = await userService.refresh(refreshToken);

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}); //30d

			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Регистрация пользователя на тренировку
	//* @route  POST /api/users/event/registration
	//* @access Private/User
	async registerForEvent(req: any, res: any, next: any) {
		try {
			const { eventId, userId } = req.body;

			const userData = await userService.registerForEvent(eventId, userId);

			res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Отмена регистрации пользователя на тренировку
	//* @route  POST /api/users/event/cancel
	//* @access Private/User
	async cancelEvent(req: any, res: any, next: any) {
		try {
			const { eventId, userId } = req.body;

			const userData = await userService.cancelEvent(eventId, userId);

			res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Изменение состояния Zoom
	//* @route  POST /api/users/zoom
	//* @access Private/User
	async changeZoomMode(req: any, res: any, next: any) {
		try {
			const { userId, mode } = req.body;

			const userData = await userService.changeZoom(userId, mode);

			res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Изменение данных пользователя
	//* @route  POST /api/users/update/:id
	//* @access Private/User
	async updateUser(req: any, res: any, next: any) {
		const userId = req.params.id;
		try {
			const { updatedUser } = req.body;

			const data = await userService.updateUser(userId, updatedUser);

			res.json(data);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Отправка ссылку на изменение пароля
	//* @route  POST /api/users/password/:email/sendlink
	//* @access Public
	async sendLinkToChangePassword(req: any, res: any, next: any) {
		const userEmail = req.params.email;

		try {
			const data = await userService.sendLinkNewPassword(userEmail);

			res.json(data);
		} catch (error) {
			next(error);
		}
	}

	//* @desc  Установка нового пароля
	//* @route  POST /api/users/password/reset/:token
	//* @access Private/User
	async setNewUserPassword(req: any, res: any, next: any) {
		const token = req.params.token;
		const { password } = req.body;

		try {
			const data = await userService.setNewPassword(password, token);

			res.json(data);
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();

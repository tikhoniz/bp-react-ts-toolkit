import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import crypto from "crypto";
// error
import ApiError from "../exceptions/api-error";
// models
import UserModel from "../models/user-model";
import RoleModel from "../models/role-model";
import EventModel from "../models/event-model";
// DTO
import UserDto from "./dtos/user-dto";
// service
import tokenService from "./token-service";
import mailService from "./mail-service";

class UserService {
	async registration(name: string, email: string, password: string) {
		const candidate = await UserModel.findOne({ email });

		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с почтовым адресом ${email} уже существует`
			);
		}

		const hashPassword = await bcrypt.hash(password, 12);
		const userRole = await RoleModel.findOne({ value: "USER" });

		const user: any = await UserModel.create({
			name,
			email,
			password: hashPassword,
			roles: [userRole?.key],
		});

		mailService.sendRegistrationMail(user);

		// убирает часть информации о пользователе
		const userDto = new UserDto(user);
		userDto.roles = user.roles;

		// генерируем токены передавая в качестве параметра развернутый инстанс класса UserDto и добавляем роли поскольку они исключены из DTO
		const tokens = tokenService.generateTokens({
			id: userDto.id,
			name: userDto.name,
			email: userDto.email,
			roles: user.roles,
		});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async sendConfirmationEmail(email: any) {
		const activationLink = uuidv4();

		mailService.sendActivationMail(
			email,
			`${process.env.CLIENT_URL}/api/users/activate/${activationLink}`
		);

		const user: any = await UserModel.findOneAndUpdate(
			{ email },
			{
				activation_link: activationLink,
			},
			{
				new: true, // установить значение true, чтобы вернуть документ после применения обновления.
			}
		);

		if (!user) {
			throw ApiError.BadRequest("Пользователь не найден");
		}

		const userDto = new UserDto(user);

		return userDto;
	}

	async activate(activationLink: any) {
		const user = await UserModel.findOne({ activation_link: activationLink });

		if (!user) {
			throw ApiError.BadRequest("Некорректная ссылка активации");
		}
		user.email_verified = true;
		user.activation_link = undefined;

		await user.save();

		return { email: user.email };
	}

	async login(email: string, password: string) {
		const user: any = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.BadRequest(
				`Пользователь с почтовым адресом ${email} не зарегистрирован`
			);
		}

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) {
			throw ApiError.BadRequest(`Неверный пароль`);
		}

		// убирает часть информации о пользователе
		const userDto = new UserDto(user);
		userDto.roles = user.roles;

		// генерируем токены передавая в качестве параметра развернутый инстанс класса UserDto
		const tokens = tokenService.generateTokens({
			id: userDto.id,
			name: userDto.name,
			email: userDto.email,
			roles: user.roles,
		});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async loginSocial(user: any) {
		if (!user.email_verified) {
			await UserModel.findOneAndUpdate(
				{ _id: user._id },
				{
					email_verified: true,
				},
				{ new: true }
			);
		}

		// убирает часть информации о пользователе
		const userDto = new UserDto(user);
		userDto.roles = user.roles;
		userDto.emailVerified = true;

		// генерируем токены передавая в качестве параметра развернутый инстанс класса UserDto
		const tokens = tokenService.generateTokens({
			id: userDto.id,
			name: userDto.name,
			email: userDto.email,
			roles: user.roles,
		});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async registrationSocial(user: any) {
		const userRole = await RoleModel.findOne({ value: "USER" });

		const newUser: any = await UserModel.create({
			name: user.name,
			last_name: user.last_name,
			email: user.email,
			email_verified: true,
			password: uuidv4(),
			roles: [userRole?.key],
			provider: user.provider,
		});

		mailService.sendRegistrationMail(newUser);

		// убирает часть информации о пользователе
		const userDto = new UserDto(newUser);
		userDto.roles = newUser.roles;

		// генерируем токены передавая в качестве параметра развернутый инстанс класса UserDto и добавляем роли поскольку они исключены из DTO
		const tokens = tokenService.generateTokens({
			id: userDto.id,
			name: userDto.name,
			email: userDto.email,
			roles: user.roles,
		});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string) {
		const userData: any = tokenService.validateRefreshToken(refreshToken);

		const tokenFromDB = await tokenService.findToken(refreshToken);

		if (!userData || !tokenFromDB) {
			throw ApiError.UnathorizedError();
		}

		const user: any = await UserModel.findById(userData.id);

		// убирает часть информации о пользователе
		const userDto = new UserDto(user);
		userDto.roles = user.roles;

		// генерируем токены передавая в качестве параметра развернутый инстанс класса UserDto
		const tokens = tokenService.generateTokens({
			id: userDto.id,
			name: userDto.name,
			email: userDto.email,
			roles: user.roles, //! раскомментировать
		});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async getUsers() {
		const users = await UserModel.find({});

		return users;
	}

	async getUser(email: string) {
		const user = await UserModel.findOne({ email });

		return user;
	}

	async updateUser(userId: string, updatedUser: any) {
		if (!userId || !updatedUser) {
			throw ApiError.BadRequest(`Некорректные данные`);
		}

		const user: any = await UserModel.findOneAndUpdate(
			{ _id: userId },
			updatedUser,
			{
				new: true, // Вы должны установить для нового параметра значение true, чтобы вернуть документ после применения обновления.
			}
		);

		const userDto = new UserDto(user);

		return userDto;
	}

	async registerForEvent(eventId: string, userId: string) {
		if (!eventId || !userId) {
			throw ApiError.BadRequest(`Некорректные данные`);
		}

		const user: any = await UserModel.findOneAndUpdate(
			{ _id: userId },
			{ $addToSet: { group_list: eventId } }, // $addToSet добавляет только уникальное значение

			{ new: true }
		);

		if (!user) {
			throw ApiError.BadRequest(`Не удалось зарегистрироваться на класс`);
		}

		await EventModel.findOneAndUpdate(
			{ _id: eventId },
			{ $addToSet: { participants: userId } }, // $addToSet добавляет только уникальное значение
			{ new: true }
		);

		const userDto = new UserDto(user);

		return userDto;
	}

	async cancelEvent(eventId: string, userId: string) {
		if (!eventId || !userId) {
			throw ApiError.BadRequest(`Некорректные данные`);
		}

		const user: any = await UserModel.findOneAndUpdate(
			{ _id: userId },
			{
				$pull: { group_list: eventId },
			},
			{ new: true }
		);

		if (!user) {
			throw ApiError.BadRequest(`Не удалось отменить запись на класс`);
		}

		await EventModel.findOneAndUpdate(
			{ _id: eventId },
			{
				$pull: { participants: userId },
			}
		);

		const userDto = new UserDto(user);

		return userDto;
	}

	async changeZoom(userId: string, mode: string) {
		if (typeof mode !== "boolean") {
			throw ApiError.BadRequest(`Некорректные данные`);
		}

		const user: any = await UserModel.findOneAndUpdate(
			{ _id: userId },
			{
				zoom_app: mode,
			},
			{ new: true }
		);

		const userDto = new UserDto(user);

		return userDto;
	}

	async sendLinkNewPassword(email: string) {
		const user: any = await UserModel.findOne({ email });

		// легкая валидация на уровне сервера
		if (!email || !email.includes("@")) {
			throw ApiError.BadRequest(`Некорректный email`);
		}

		crypto.randomBytes(32, async (error, buffer) => {
			if (error) {
				throw ApiError.BadRequest(`Ошибка: ${error}`);
			}

			const token = buffer.toString("hex"); //! выяснить про буффер и hex

			user.reset_token = token;
			user.reset_token_exp = Date.now() + 60 * 60 * 1000;

			await user.save();

			mailService.resetPasswordMail(
				email,
				`${process.env.CLIENT_URL}/auth/set-new-password/${token}`
			);

			const userDto = new UserDto(user);

			return userDto;
		});
	}

	async setNewPassword(password: any, token: any) {
		const user: any = await UserModel.findOne({
			reset_token: token,
			reset_token_exp: { $gt: Date.now() },
		});

		if (!user) {
			throw ApiError.BadRequest(
				`К сожалению, ссылка на изменение пароля устарела.`
			);
		}

		const hashPassword = await bcrypt.hash(password, 12);

		user.password = hashPassword;
		user.reset_token = undefined;
		user.reset_token_exp = undefined;

		await user.save();

		const userDto = new UserDto(user);

		return userDto;
	}
}

export default new UserService();

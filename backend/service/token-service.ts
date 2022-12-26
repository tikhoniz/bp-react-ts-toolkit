import jwt from "jsonwebtoken";
// models
import tokenModel from "../models/token-model";

class TokenService {
	generateTokens(payload: any) {
		const accessToken = jwt.sign(
			payload,
			process.env.JWT_ACCESS_SECRET as string,
			{
				expiresIn: "30m",
				//expiresIn: "4s",
			}
		);

		const refreshToken = jwt.sign(
			payload,
			process.env.JWT_REFRESH_SECRET as string,
			{
				expiresIn: "30d",
			}
		);

		return { accessToken, refreshToken };
	}

	validateAccessToken(token: any) {
		try {
			const userData = jwt.verify(
				token,
				process.env.JWT_ACCESS_SECRET as string
			);

			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token: any) {
		try {
			const userData = jwt.verify(
				token,
				process.env.JWT_REFRESH_SECRET as string
			);

			return userData;
		} catch (error) {
			return null;
		}
	}

	async saveToken(userId: any, refreshToken: any) {
		const tokenData = await tokenModel.findOne({ user: userId });

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		const token = await tokenModel.create({ user: userId, refreshToken });
		return token;
	}

	async removeToken(refreshToken: any) {
		const tokenData = await tokenModel.deleteOne({ refreshToken });

		return tokenData;
	}

	async findToken(refreshToken: any) {
		const tokenData = await tokenModel.findOne({ refreshToken });

		return tokenData;
	}
}

export default new TokenService();

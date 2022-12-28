import axios from "axios";

const $api = axios.create({
	withCredentials: true, // настройка прицепляет cookies автоматически
	baseURL: process.env.REACT_APP_API_URL,
});

// interceptors перехватчик
$api.interceptors.request.use((config: any) => {
	// config - инстанс axios
	// добавляет к запросу на сервер Header Authorization и помещает туда токен  из localStorage
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

	return config;
});

$api.interceptors.response.use(
	// если ответ сервера 200 ничего не делать
	(config: any) => {
		return config;
	},

	async (error) => {
		// перехватывает ответ от сервера
		const originalRequest = error.config;
		if (
			error.response.status === 401 && // если ответ 401 (accessToken протух)
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/users/refresh`,
					{
						withCredentials: true,
					}
				);

				localStorage.setItem("token", response.data.accessToken);

				return $api.request(originalRequest);
			} catch (error) {
				//console.log("Не авторизован interceptors");
			}
		}

		throw error;
	}
);

export default $api;

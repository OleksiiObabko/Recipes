import axios, {AxiosResponse} from "axios";
import {createBrowserHistory, History} from "history";


import {baseURL} from "../configs";
import {authService} from "./auth.service";

type AxiosRes<G> = Promise<AxiosResponse<G>>

const history: History = createBrowserHistory();

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
	const accessToken = authService.getAccessToken();

	if (accessToken) {
		config.headers.Authorization = accessToken;
	}

	return config;
});

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedRequestsQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedRequestsQueue = [];
};

axiosService.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const originalRequest = error.config;
	const refreshToken = authService.getRefreshToken();

	if (error.response?.status === 401 && !originalRequest._retry) {
		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedRequestsQueue.push({resolve, reject});
			}).then(token => {
				originalRequest.headers.Authorization = token;
				return axiosService(originalRequest);
			}).catch(err => {
				return Promise.reject(err);
			});
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			if (!refreshToken) {
				throw new Error("No refresh token");
			}

			const {data: newTokenData} = await authService.refresh(refreshToken);
			authService.setTokenData(newTokenData);

			processQueue(null, newTokenData.accessToken);
			originalRequest.headers.Authorization = newTokenData.accessToken;
			return axiosService(originalRequest);
		} catch (e) {
			processQueue(e, null);
			authService.deleteTokenData();
			history.replace("/login?expSession=true");
			return Promise.reject(e);
		} finally {
			isRefreshing = false;
		}
	}

	return Promise.reject(error);
});

export type {
	AxiosRes
};

export {
	axiosService,
	history
};

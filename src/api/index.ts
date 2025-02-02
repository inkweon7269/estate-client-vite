import { getCookie, removeCookie, setCookie } from '@/utilies';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import mem from 'mem';

import { postAuthTokenAccessTokenApi, postAuthTokenRefreshTokenApi } from './auth';

const EXCERPT_APIS = ['/v1/auth/login', '/v1/auth/token/access', '/v1/auth/token/refresh'];
const isExcerptApi = (url: string): boolean => {
    return EXCERPT_APIS.some((pattern) => {
        const regex = new RegExp(`^${pattern.replace(/\*/g, '[^/]+')}$`);
        return regex.test(url);
    });
};

const handleTokenError = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    location.href = '/login';
};

const axiosRefreshInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getAccessAndRefreshToken = mem(
    async () => {
        try {
            const refreshToken = getCookie('refreshToken');

            if (!refreshToken) {
                handleTokenError();
                return;
            }

            const accessTokenResponse = await postAuthTokenAccessTokenApi(refreshToken);
            const refreshTokenResponse = await postAuthTokenRefreshTokenApi(refreshToken);

            const newAccessToken = accessTokenResponse.data.accessToken;
            const newRefreshToken = refreshTokenResponse.data.refreshToken;

            setCookie('accessToken', newAccessToken);
            setCookie('refreshToken', newRefreshToken);

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            handleTokenError();
            console.error(error);
        }
    },
    { maxAge: 1000 },
);

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (!config.url || isExcerptApi(config.url)) {
        return config;
    }

    const accessToken = getCookie('accessToken');
    if (!accessToken) {
        location.href = '/login';
        return Promise.reject(new Error('No accessToken available'));
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
        const {
            config,
            response: { status },
        } = err;

        if (!config.url || status !== 401 || config.sent) {
            return Promise.reject(err);
        }

        config.sent = true;

        try {
            const res = await getAccessAndRefreshToken();
            if (res && res.accessToken) {
                config.headers.Authorization = `Bearer ${res.accessToken}`;
                return axiosInstance(config);
            }

            return Promise.reject(new Error('Failed access and refresh token'));
        } catch (error) {
            return Promise.reject(error);
        }
    },
);

export { axiosInstance, axiosRefreshInstance };

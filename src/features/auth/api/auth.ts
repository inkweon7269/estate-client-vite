import { axiosInstance, axiosRefreshInstance } from '@/api';
import { JoinRequest, LoginRequest } from '@/features/auth/interface/auth.request.interface.ts';

export const postJoinApi = (data: JoinRequest) => {
    return axiosInstance({
        method: 'POST',
        url: `/v1/auth/register`,
        data,
    });
};

export const postLoginApi = ({ email, password }: LoginRequest) => {
    const basicToken = btoa(`${email}:${password}`);
    return axiosInstance({
        method: 'POST',
        url: `/v1/auth/login`,
        headers: {
            Authorization: `Basic ${basicToken}`,
        },
    });
};

export const getUserProfileApi = () => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/user/profile`,
    });
};

export const postAuthTokenAccessTokenApi = (refreshToken: string) => {
    return axiosRefreshInstance({
        method: 'POST',
        url: `/v1/auth/token/access`,
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};

export const postAuthTokenRefreshTokenApi = (refreshToken: string) => {
    return axiosRefreshInstance({
        method: 'POST',
        url: `/v1/auth/token/refresh`,
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};

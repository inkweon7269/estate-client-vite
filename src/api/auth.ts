import axiosInstance from '@/api/index.ts';

export const postLoginApi = ({ email, password }: { email: string; password: string }) => {
    const basicToken = btoa(`${email}:${password}`);
    return axiosInstance({
        method: 'POST',
        url: `/v1/auth/login`,
        headers: {
            Authorization: `Basic ${basicToken}`,
        },
    });
};

export const postAuthTokenAccessTokenApi = (refreshToken: string) => {
    return axiosInstance({
        method: 'POST',
        url: `/v1/auth/token/access`,
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};

export const postAuthTokenRefreshTokenApi = (refreshToken: string) => {
    return axiosInstance({
        method: 'POST',
        url: `/v1/auth/token/refresh`,
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};

export const getUserProfileApi = (accessToken: string) => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/user/profile`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

import axios from 'axios';

export const postLoginApi = ({ email, password }: { email: string; password: string }) => {
    const basicToken = btoa(`${email}:${password}`);
    return axios({
        method: 'POST',
        url: `/v1/auth/login`,
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${basicToken}`,
        },
    });
};

export const getUserProfileApi = (token: string) => {
    return axios({
        method: 'GET',
        url: `/v1/user/profile`,
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

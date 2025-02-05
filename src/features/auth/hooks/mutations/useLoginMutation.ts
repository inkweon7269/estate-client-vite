import { postLoginApi } from '@/features/auth/api/auth.ts';
import { LoginRequest } from '@/features/auth/interface/auth.request.interface.ts';
import { LoginResponse } from '@/features/auth/interface/auth.response.interface.ts';
import { setCookie } from '@/utilies';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLoginMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (loginData: LoginRequest) => {
            const res = await postLoginApi(loginData);
            return res.data;
        },
        onSuccess: async (data: LoginResponse) => {
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            navigate('/profile');
        },
        onError: (error, loginData, context) => {
            if (isAxiosError(error)) {
                console.error('onError', error?.response?.data?.message, loginData, context);
            }
        },
        onSettled: (data, error, variables, context) => {
            console.log('onSettled', data, error, variables, context);
        },
        retry: 3, // 변이 실패 시 3번 재시도
        retryDelay: 500, // 0.5초 간격으로 재시도
    });
};

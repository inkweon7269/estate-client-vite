import { getUserProfileApi, postLoginApi } from '@/features/auth/api/auth.ts';
import { LoginRequest } from '@/features/auth/interface/auth.request.interface.ts';
import { UserProfileResponse } from '@/features/auth/interface/auth.response.interface.ts';
import { getCookie, setCookie } from '@/utilies';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useUserProfileQuery = () => {
    return useQuery<UserProfileResponse, Error>({
        queryKey: ['user'],
        queryFn: async () => {
            const accessToken = getCookie('accessToken');
            const res = await getUserProfileApi(accessToken);
            return res.data;
        },
    });
};

export const useLoginMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (loginData: LoginRequest) => {
            const res = await postLoginApi(loginData);
            return res.data;
        },
        onSuccess: async (data) => {
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            navigate('/profile');
        },
        onError: (error, loginData, context) => {
            console.log('onError', error, loginData, context);
        },
        onSettled: (data, error, variables, context) => {
            console.log('onSettled', data, error, variables, context);
        },
        retry: 3, // 변이 실패 시 3번 재시도
        retryDelay: 500, // 0.5초 간격으로 재시도
    });
};

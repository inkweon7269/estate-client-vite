import { getUserProfileApi, postLoginApi } from '@/api/auth.ts';
import { getCookie, setCookie } from '@/utilies';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { LoginRequest } from '@/components/auth/interface/auth.request.interface.ts';
import { UserProfileResponse } from '@/components/auth/interface/auth.response.interface.ts';

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
        onError: (error, newPost, context) => {},
        onSettled: (data, error, variables, context) => {},
    });
};

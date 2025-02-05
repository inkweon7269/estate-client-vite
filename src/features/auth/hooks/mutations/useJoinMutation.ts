import { postJoinApi } from '@/features/auth/api/auth.ts';
import { JoinRequest } from '@/features/auth/interface/auth.request.interface.ts';
import { JoinResponse } from '@/features/auth/interface/auth.response.interface.ts';
import { setCookie } from '@/utilies';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useJoinMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (joinData: JoinRequest) => {
            const res = await postJoinApi(joinData);
            return res.data;
        },
        onSuccess: async (data: JoinResponse) => {
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            navigate('/profile');
        },
        onError: (error, joinData, context) => {
            if (isAxiosError(error)) {
                console.error('onError', error?.response?.data?.message, joinData, context);
            }
        },
        retry: 3,
        retryDelay: 500,
    });
};

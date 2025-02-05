import { getUserProfileApi } from '@/features/auth/api/auth.ts';
import { UserProfileResponse } from '@/features/auth/interface/auth.response.interface.ts';
import { getCookie } from '@/utilies';
import { useQuery } from '@tanstack/react-query';

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

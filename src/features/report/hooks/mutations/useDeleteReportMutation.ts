import { deleteReportApi } from '@/features/report/api/report.ts';
import { getCookie } from '@/utilies';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const useDeleteReportMutation = (id: number) => {
    return useMutation({
        mutationFn: async () => {
            const accessToken = getCookie('accessToken');
            const res = await deleteReportApi(accessToken, id);
            return res.data;
        },
        onSuccess: async () => {
            console.log('onSuccess');
        },
        onError: (error, context) => {
            if (isAxiosError(error)) {
                console.error('onError', error?.response?.data?.message, context);
            }
        },
        retry: 3,
        retryDelay: 500,
    });
};

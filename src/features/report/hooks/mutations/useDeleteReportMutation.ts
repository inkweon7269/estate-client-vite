import { deleteReportApi } from '@/features/report/api/report.ts';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const useDeleteReportMutation = (id: number) => {
    return useMutation({
        mutationFn: async () => {
            await deleteReportApi(id);
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

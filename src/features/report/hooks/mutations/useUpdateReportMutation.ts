import { putReportApi } from '@/features/report/api/report.ts';
import { UpdateReportRequest } from '@/features/report/interface/report.request.interface.ts';
import { getCookie } from '@/utilies';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const useUpdateReportMutation = (id: number) => {
    return useMutation({
        mutationFn: async (updateReportRequest: UpdateReportRequest) => {
            const accessToken = getCookie('accessToken');
            const res = await putReportApi(accessToken, id, updateReportRequest);
            return res.data;
        },
        onSuccess: async () => {
            console.log('onSuccess');
        },
        onError: (error, updateReportRequest, context) => {
            if (isAxiosError(error)) {
                console.error('onError', error?.response?.data?.message, updateReportRequest, context);
            }
        },
        retry: 3,
        retryDelay: 500,
    });
};

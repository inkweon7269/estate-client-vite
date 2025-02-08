import { putReportApi } from '@/features/report/api/report.ts';
import { UpdateReportRequest } from '@/features/report/interface/report.request.interface.ts';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const useUpdateReportMutation = (id: number) => {
    return useMutation({
        mutationFn: async (updateReportRequest: UpdateReportRequest) => {
            await putReportApi(id, updateReportRequest);
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

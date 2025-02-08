import { postReportApi } from '@/features/report/api/report.ts';
import { CreateReportRequest } from '@/features/report/interface/report.request.interface.ts';
import { getCookie } from '@/utilies';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useCreateReportMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (createReportRequest: CreateReportRequest) => {
            const accessToken = getCookie('accessToken');
            const res = await postReportApi(accessToken, createReportRequest);
            return res.data;
        },
        onSuccess: () => {
            navigate('/report');
        },
        onError: (error, createReportRequest, context) => {
            if (isAxiosError(error)) {
                console.error('onError', error?.response?.data?.message, createReportRequest, context);
            }
        },
        retry: 3,
        retryDelay: 500,
    });
};

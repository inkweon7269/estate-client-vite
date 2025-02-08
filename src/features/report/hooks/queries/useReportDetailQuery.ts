import { getReportApi } from '@/features/report/api/report.ts';
import { ReportResponse } from '@/features/report/interface/report.response.interface.ts';
import { getCookie } from '@/utilies';
import { useQuery } from '@tanstack/react-query';

export const useReportDetailQuery = (id: number) => {
    return useQuery<ReportResponse, Error>({
        queryKey: ['report', id],
        queryFn: async () => {
            const accessToken = getCookie('accessToken');
            const res = await getReportApi(accessToken, id);
            return res.data;
        },
    });
};

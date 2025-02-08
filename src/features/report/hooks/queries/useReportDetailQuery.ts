import { getReportApi } from '@/features/report/api/report.ts';
import { ReportResponse } from '@/features/report/interface/report.response.interface.ts';
import { useQuery } from '@tanstack/react-query';

export const useReportDetailQuery = (id: number) => {
    return useQuery<ReportResponse, Error>({
        queryKey: ['report', id],
        queryFn: async () => {
            const res = await getReportApi(id);
            return res.data;
        },
    });
};

import { getReportsApi } from '@/features/report/api/report.ts';
import { PaginationRequest } from '@/features/report/interface/report.request.interface.ts';
import { ReportPaginationResponse } from '@/features/report/interface/report.response.interface.ts';
import { useQuery } from '@tanstack/react-query';

export const useReportPaginationQuery = (params: PaginationRequest) => {
    return useQuery<ReportPaginationResponse, Error>({
        queryKey: ['report'],
        queryFn: async () => {
            const res = await getReportsApi(params);
            return res.data;
        },
    });
};

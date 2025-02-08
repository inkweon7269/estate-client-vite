import { axiosInstance } from '@/api';
import {
    CreateReportRequest,
    PaginationRequest,
    UpdateReportRequest,
} from '@/features/report/interface/report.request.interface.ts';

export const getReportsApi = (params: PaginationRequest) => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/report`,
        params,
    });
};

export const getReportApi = (id: number) => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/report/${id}`,
    });
};

export const postReportApi = (data: CreateReportRequest) => {
    return axiosInstance({
        method: 'POST',
        url: `/v1/report`,
        data,
    });
};

export const putReportApi = (id: number, data: UpdateReportRequest) => {
    return axiosInstance({
        method: 'PUT',
        url: `/v1/report/${id}`,
        data,
    });
};

export const deleteReportApi = (id: number) => {
    return axiosInstance({
        method: 'DELETE',
        url: `/v1/report/${id}`,
    });
};

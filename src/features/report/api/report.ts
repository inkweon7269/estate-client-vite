import { axiosInstance } from '@/api';
import {
    CreateReportRequest,
    PaginationRequest,
    UpdateReportRequest,
} from '@/features/report/interface/report.request.interface.ts';

export const getReportsApi = (accessToken: string, params: PaginationRequest) => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/report`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params,
    });
};

export const getReportApi = (accessToken: string, id: number) => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/report/${id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const postReportApi = (accessToken: string, data: CreateReportRequest) => {
    return axiosInstance({
        method: 'POST',
        url: `/v1/report`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data,
    });
};

export const putReportApi = (accessToken: string, id: number, data: UpdateReportRequest) => {
    return axiosInstance({
        method: 'PUT',
        url: `/v1/report/${id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data,
    });
};

export const deleteReportApi = (accessToken: string, id: number) => {
    return axiosInstance({
        method: 'DELETE',
        url: `/v1/report/${id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

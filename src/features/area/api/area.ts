import { axiosInstance } from '@/api';

export const getAreaStateApi = () => {
    return axiosInstance({
        method: 'GET',
        url: '/v1/area/state',
    });
};
export const getAreaCountyApi = (stateId: number) => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/area/state/${stateId}/county`,
    });
};

export const getAreaSubDistrictApi = ({ stateId, countyId }: { stateId: number; countyId: number }) => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/area/state/${stateId}/county/${countyId}/sub-district`,
    });
};

export const getAreaApartmentApi = ({
    stateId,
    countyId,
    subDistrictId,
}: {
    stateId: number;
    countyId: number;
    subDistrictId: number;
}) => {
    return axiosInstance({
        method: 'GET',
        url: `/v1/area/state/${stateId}/county/${countyId}/sub-district/${subDistrictId}/apartment`,
    });
};

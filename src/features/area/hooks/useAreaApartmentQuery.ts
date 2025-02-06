import { getAreaApartmentApi } from '@/features/area/api/area.ts';
import { AreaApartmentResponse } from '@/features/area/interface/area.response.interface.ts';
import { useQuery } from '@tanstack/react-query';

export const useAreaApartmentQuery = ({
    stateId,
    countyId,
    subDistrictId,
}: {
    stateId: number | null;
    countyId: number | null;
    subDistrictId: number | null;
}) => {
    return useQuery<AreaApartmentResponse[], Error>({
        queryKey: ['apartment', stateId, countyId, subDistrictId],
        queryFn: async () => {
            if (!stateId || !countyId || !subDistrictId) {
                return [];
            }
            const res = await getAreaApartmentApi({ stateId, countyId, subDistrictId });
            return res.data;
        },
        enabled: !!stateId && !!countyId && !!subDistrictId,
    });
};

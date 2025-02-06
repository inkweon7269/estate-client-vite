import { getAreaSubDistrictApi } from '@/features/area/api/area.ts';
import { AreaSubDistrictResponse } from '@/features/area/interface/area.response.interface.ts';
import { useQuery } from '@tanstack/react-query';

export const useAreaSubDistrictQuery = ({ stateId, countyId }: { stateId: number | null; countyId: number | null }) => {
    return useQuery<AreaSubDistrictResponse[], Error>({
        queryKey: ['subDistrict', stateId, countyId],
        queryFn: async () => {
            if (!stateId || !countyId) {
                return [];
            }
            const res = await getAreaSubDistrictApi({ stateId, countyId });
            return res.data;
        },
        enabled: !!stateId && !!countyId,
    });
};

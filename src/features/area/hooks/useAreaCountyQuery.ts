import { getAreaCountyApi } from '@/features/area/api/area.ts';
import { AreaCountryResponse } from '@/features/area/interface/area.response.interface.ts';
import { useQuery } from '@tanstack/react-query';

export const useAreaCountyQuery = (stateId: number | null) => {
    return useQuery<AreaCountryResponse[], Error>({
        queryKey: ['county', stateId],
        queryFn: async () => {
            if (!stateId) {
                return [];
            }
            const res = await getAreaCountyApi(stateId);
            return res.data;
        },
        enabled: !!stateId,
    });
};

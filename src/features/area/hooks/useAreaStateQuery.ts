import { getAreaStateApi } from '@/features/area/api/area.ts';
import { AreaStateResponse } from '@/features/area/interface/area.response.interface.ts';
import { useQuery } from '@tanstack/react-query';

export const useAreaStateQuery = () => {
    return useQuery<AreaStateResponse[], Error>({
        queryKey: ['state'],
        queryFn: async () => {
            const res = await getAreaStateApi();
            return res.data;
        },
    });
};

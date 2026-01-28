import { useQuery } from '@tanstack/react-query';
import {api, QueryKeysEnum} from "@/api";
import {ApiService} from "@/api/service.ts";


export type GetMaterialsFiltersResponse = {
    topics: string[],
}

export const useMaterialsFilters = () => {
    return useQuery({
        refetchOnMount: true,
        queryFn: async () => {
            const { data } = await api.get<GetMaterialsFiltersResponse>(ApiService.LEGAL_BASE.GET_FILTERS);
            return data;
        },
        queryKey: [QueryKeysEnum.MaterialFilters],
    });
};

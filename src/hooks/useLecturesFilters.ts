import { useQuery } from '@tanstack/react-query';
import {api, QueryKeysEnum} from "@/api";
import {ApiService} from "@/api/service.ts";


export type GetLecturesFiltersResponse = {
    courses: string[],
    tags: string[],
}

export const useLecturesFilters = () => {
    return useQuery({
        refetchOnMount: true,
        queryFn: async () => {
            const { data } = await api.get<GetLecturesFiltersResponse>(ApiService.LECTURES.GET_FILTERS);
            return data;
        },
        queryKey: [QueryKeysEnum.LecturesFilters],
    });
};

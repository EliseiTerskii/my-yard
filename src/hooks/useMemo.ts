'use client';

import {useQuery} from '@tanstack/react-query';
import {api, QueryKeysEnum} from "@/api";
import {ApiService} from "@/api/service.ts";
import {AxiosResponse} from "axios";

export interface Memo {
    relatedArticles: { id: string; title: string }[];
    downloadUrl: string;
}

export const useMemo = () => {
    return useQuery({
        refetchOnMount: true,
        queryFn: async () => {
            const {data} = await api.get<Memo, AxiosResponse<Memo>>(ApiService.GUIDEBOOK.GET);
            return data;
        },
        queryKey: [QueryKeysEnum.Memo],
    });
};

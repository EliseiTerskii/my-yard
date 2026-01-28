import { useQuery } from '@tanstack/react-query';
import {api, QueryKeysEnum} from "@/api";
import {ApiService} from "@/api/service.ts";
import {AxiosResponse} from "axios";

export interface Material {
    id: string,
    title: string,
    image: string,
    readingDuration: 5,
    description: string,
    shortAnswer: string,
    whenImportant: string,
    steps: string[],
    commonMistakes: string[],
    relatedMaterials?: { name: string; url: string }[];
    relatedArticles?: { title: string; id: string }[];
    topic: string,
    tags: string[]
    content: string,
}

export type GetMaterialsRequest = {
    // tags: string,
    topic:  string,
    title: string,
}

export type GetMaterialsResponse = Material[]

export const useMaterials = (params: GetMaterialsRequest) => {
    return useQuery({
        refetchOnMount: true,
        queryFn: async () => {
            const { data } = await api.get<GetMaterialsResponse, AxiosResponse<GetMaterialsResponse>, GetMaterialsRequest>(ApiService.LEGAL_BASE.GET_ALL, {
                params: params,
            });
            return data;
        },
        queryKey: [QueryKeysEnum.Materials, params],
    });
};

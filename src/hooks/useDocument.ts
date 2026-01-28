import {useQuery} from "@tanstack/react-query";
import {api, QueryKeysEnum} from "@/api";
import {AxiosResponse} from "axios";
import {ApiService} from "@/api/service.ts";

export const aiModes = [
    {
        id: "none",
        label: "Без правок",
        description: "Текст останется как есть",
    },
    {
        id: "spelling",
        label: "Только орфография",
        description: "Исправление ошибок и опечаток",
    },
    {
        id: "full",
        label: "Полная правка ИИ",
        description: "Структура, стиль и содержание",
    },
];

export type GetDocumentTemplates = { id: string, title: string, description: string }[];

export type DocumentResponse = {
    aiResponse: string;
    downloadUrl: string;
}

export const useTemplates = () => {
    return useQuery({
        refetchOnMount: true,
        queryFn: async () => {
            const {data} = await api.get<GetDocumentTemplates, AxiosResponse<GetDocumentTemplates>>(ApiService.DOCUMENT.GET_TEMPLATES);
            return data;
        },
        queryKey: [QueryKeysEnum.Templates],
    });
};
'use client';

import {useQuery} from '@tanstack/react-query';
import {api, QueryKeysEnum} from "@/api";
import {ApiService} from "@/api/service.ts";
import {AxiosResponse} from "axios";

export interface Lecture {
    id: string;
    title: string;
    rutubeUrl: string;
    duration: string;
    course: string;
    tags: string[];
    description: string;
    previewImage: string;
    materials?: { name: string; url: string, type: string }[];
    nextLecture?: { id: string, title: string, previewImage: string, description: string };
    learnings: string[];
}

export type GetLecturesRequest = {
    course: string;
    tags: string[];
}

export type GetLecturesResponse = Lecture[]

export const useLectures = (params: GetLecturesRequest) => {
    return useQuery({
        refetchOnMount: true,
        queryFn: async () => {
            const {data} = await api.get<GetLecturesResponse, AxiosResponse<GetLecturesResponse>, GetLecturesRequest>(ApiService.LECTURES.GET_ALL, {
                params: params
            });
            return data;
        },
        queryKey: [QueryKeysEnum.Lectures, params],
    });
};

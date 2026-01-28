'use client';

import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {api, QueryKeysEnum} from '@/api';
import {ApiService} from '@/api/service.ts';
import {AxiosResponse} from 'axios';
import {PaginationParams} from '@/hooks/types.ts';

export interface EventItem {
    id: string;
    title: string;
    eventType: string;
    category: string;
    mainImage: string;
    shortDescription: string;
    summary: string;
    content: string;
    gallery: string[];
    readingTime: number;
    publishedAt: string;

    description: string;
}

export type GetEventsResponse = {
    data: EventItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type GetEventsRequest = PaginationParams;

export const useEvents = () => {
    return useInfiniteQuery({
        queryFn: async ({pageParam}) => {
            const {data} = await api.get<GetEventsResponse, AxiosResponse<GetEventsResponse>, GetEventsRequest>(ApiService.EVENTS.GET_PAST, {
                params: {
                    page: pageParam,
                    limit: 4
                }
            });
            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page + 1 > lastPage.totalPages) {
                return undefined;
            }

            return lastPage.page + 1;
        },
        queryKey: [QueryKeysEnum.Events],
    });
};

export const useUpcomingEvents = () => {
    return useQuery({
        refetchOnMount: true,
        queryFn: async () => {
            const {data} = await api.get<EventItem[], AxiosResponse<EventItem[]>>(ApiService.EVENTS.GET_UPCOMING);
            return data;
        },
        queryKey: [QueryKeysEnum.UpEvents],
    });
};

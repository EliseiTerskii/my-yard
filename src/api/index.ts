import axios from 'axios';

export enum QueryKeysEnum {
    Lectures = 'lectures',
    LecturesFilters = 'lecturesFilters',
    Materials = 'materials',
    MaterialFilters = 'materialFilters',
    Templates = 'templates',
    Memo = 'memo',
    Events = 'events',
    UpEvents = 'upEvents'
}

const apiUrl = 'http://92.53.64.72:3000/v1';

export const api = axios.create({
    baseURL: apiUrl,
    timeout: 20000,
    headers: {
        'x-api-key': 'test'
    }
});
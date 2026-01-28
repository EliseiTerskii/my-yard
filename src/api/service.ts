export class ApiService {
    static readonly LECTURES = {
        GET_ALL: '/lectures',
        GET_FILTERS: '/lectures/filters',
        GET(id: string) {
            return `/lectures/${id}`
        }
    }
    static readonly LEGAL_BASE = {
        GET_ALL: '/legal-base',
        GET_FILTERS: '/legal-base/filters',
        GET(id: string) {
            return `/legal-base/${id}`
        }
    }
    static readonly EVENTS = {
        GET_PAST: '/events',
        GET_UPCOMING: '/events/upcoming',
        GET(id: string) {
            return `/events/${id}`
        }
    }
    static readonly GUIDEBOOK = {
        GET: '/guidebook',
    }
    static readonly DOCUMENT = {
        GET_TEMPLATES: '/documents/templates',
        GENERATE: '/documents/generate',
        GENERATE_FROM_TEXT: '/documents/generateFromText',
    }
}

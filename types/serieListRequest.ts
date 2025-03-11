import { Serie } from "./serie";

export type SerieListRequest = {
    date: {
        maximum: string,
        minimum: string
    },
    page: number,
    results: Serie[],
    total_pages: number,
    total_results: number
};
import { Movie } from "./movie";

export type MovieListRequest = {
    date: {
        maximum: string,
        minimum: string
    },
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
};
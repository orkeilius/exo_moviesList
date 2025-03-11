export type Serie = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    first_air_date: string,
    name: string,
    vote_average: number,
    vote_count: number,

    // info from AccountStates
    favorite?: boolean,
    watchlist?: boolean,
    rated?: {
        value: number
    }
}
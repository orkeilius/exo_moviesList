import axios from 'axios';
import {MovieListRequest} from "../types/MovieListRequest";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
});
const default_headers =   {headers:{
        accept: 'application/json',
        "content-type": 'application/json',
        Authorization: "Bearer "+ process.env.EXPO_PUBLIC_TMDB_API_TOKEN
    }};



/**
 * Retrieves the featured movie from the API.
 *
 * This function sends a GET request to fetch movie data and returns the first result.
 *
 * @returns A promise that resolves to the first movie object from the API response.
 */
export async function getFeaturedMovie() {
    const response = await api.get('/3/discover/movie?page=1');
    return response.data.results[0];
}


/**
 * Fetches a list of movies released within a specified date range.
 *
 * @param {number} page - The page number to retrieve.
 * @returns {Promise<any>} A promise that resolves to the response data containing the list of movies.
 */
export async function getUpComingMovies(page) {
    const response = await api.get('/3/movie/upcoming', {
        ...default_headers,
        params: {
            page: page,
        },
        }
    );
    return response.data as MovieListRequest;
}

export async function getMovieInTheatre(page) {
    const response = await api.get('/3/movie/now_playing', {
            ...default_headers,
            params: {
                page: page,
            },
        }
    );
    return response.data as MovieListRequest;
}


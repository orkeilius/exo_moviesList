import axios from 'axios';

import {MovieListRequest} from "../types/MovieListRequest";
import {Movie} from "../types/movie";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
});
const default_headers = {
    headers: {
        accept: 'application/json',
        "content-type": 'application/json',
        Authorization: "Bearer " + process.env.EXPO_PUBLIC_TMDB_API_TOKEN
    }
};



/**
 * Retrieves the featured movie from the API.
 *
 * This function sends a GET request to fetch movie data and returns the first result.
 *
 * @returns A promise that resolves to the first movie object from the API response.
 */
export async function getFeaturedMovie() {
    const response = await api.get('/3/movie/popular',
        {
            ...default_headers,
        }
    );
    return response.data.results[0] as Movie;

}

export async function getSearchMovies(query) {
    const response = await api.get(`/3/search/movie?query=${query}`, {
        ...default_headers,
        params: {
            query: query,
        },
    }
    );
    return response.data;
}


/**
 * Fetches a list of movies released within a specified date range.
 *
 * @param {number} page - The page number to retrieve.
 * @param sessionId
 * @returns {Promise<any>} A promise that resolves to the response data containing the list of movies.
 */
export async function getUpComingMovies(page,sessionId:string) {
    const response = await api.get('/3/movie/upcoming', {
        ...default_headers,
        params: {
            page: page,
        },
    }
    );
    let output = response.data as MovieListRequest;
    output.results = await addMoviesUserState(output.results,sessionId);
    return output;
}

export async function getMovieInTheatre(page,sessionId:string) {
    const response = await api.get('/3/movie/now_playing', {
        ...default_headers,
        params: {
            page: page,
        },
    }
    );
    let output = response.data as MovieListRequest;
    output.results = await addMoviesUserState(output.results,sessionId);
    return output;
}


export async function addMoviesUserState(movieList:Movie[],sessionId:string ): Promise<Movie[]> {
    if (sessionId == "") return movieList;
    console.log("e:",sessionId)

    console.log("send userState request",movieList.map(m => m.id));
    return await Promise.all(movieList.map(async (movie) => {
        return addMovieUserState(movie, sessionId).then((res) => {
           return {...movie,...res} as Movie;
        }).catch(console.error);
    })) as Movie[];
}
async function addMovieUserState(movie:Movie,session_id:string):Promise<Movie> {
    const response = await api.get(`/3/movie/`+movie.id+'/account_states', {
        ...default_headers,
        params: {
            session_id
        }
    })
    return {...movie,...response.data} as Movie;
}

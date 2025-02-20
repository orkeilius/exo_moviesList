import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
});

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
 * @param {string} startDate - The start date for the movie release date range (format: YYYY-MM-DD).
 * @param {string} endDate - The end date for the movie release date range (format: YYYY-MM-DD).
 * @returns {Promise<any>} A promise that resolves to the response data containing the list of movies.
 */
export async function getMonthMovies(page, startDate, endDate) {
    const response = await api.get('/3/discover/movie', {
        params: {
            page,
            "primary_release_date.gte": startDate,
            "primary_release_date.lte": endDate,
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
    }
    );
    return response.data;
}


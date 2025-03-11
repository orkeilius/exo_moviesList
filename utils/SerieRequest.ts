import axios, { AxiosResponse } from 'axios';

import { SerieListRequest } from "../types/serieListRequest";
import { SerieDetails } from "../types/serieDetails";

// import { SerieDetails } from '../types/serieDetails';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
});
const defaultHeaders = {
    headers: {
        accept: 'application/json',
        "content-type": 'application/json',
        Authorization: "Bearer " + process.env.EXPO_PUBLIC_TMDB_API_TOKEN
    }
};


export async function getSeries(page) {
const response = await api.get('/3/discover/tv', {
        ...defaultHeaders,
        params: {
            page
        },
    }
    );
    const output = response.data as SerieListRequest;
    return output;

}


export async function getSerieDetails(serieId:number) {
    const response = await api.get(`/3/tv/${serieId}`, {
        ...defaultHeaders,
    });
    console.log("response",response);

    return {...response.data} as SerieDetails;
}



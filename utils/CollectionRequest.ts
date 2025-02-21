import axios, { AxiosResponse } from 'axios';

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



export async function setFavorite(sessionId: string, media_type: string, media_id: number, favorite: boolean) {
    const url = `https://api.themoviedb.org/3/account/${sessionId}/favorite`;
    return await axios.post(url, { media_type, media_id, favorite }, defaultHeaders).catch(e => console.log(e)) as AxiosResponse;
}

export async function setWatchlist(sessionID:number,media_type:string,media_id:number,watchlist:boolean) {
    const url = `https://api.themoviedb.org/3/account/${sessionID}/watchlist`;
    return await axios.post(url, {media_type,media_id,watchlist}, defaultHeaders).catch(e => console.log(e)) as AxiosResponse;
}


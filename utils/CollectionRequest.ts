import axios, {AxiosResponse} from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
});
const default_headers =   {headers:{
        accept: 'application/json',
        "content-type": 'application/json',
        Authorization: "Bearer "+ process.env.EXPO_PUBLIC_TMDB_API_TOKEN
    }};



export async function setFavorite(userID:number,media_type:string,media_id:number,favorite:boolean) {
    const url = `https://api.themoviedb.org/3/account/${userID}/favorite`;
    return await axios.post(url, {media_type,media_id,favorite}, default_headers).catch(e => console.log(e)) as AxiosResponse;
}

export async function setWatchlist(userID:number,media_type:string,media_id:number,watchlist:boolean) {
    const url = `https://api.themoviedb.org/3/account/${userID}/watchlist`;
    return await axios.post(url, {media_type,media_id,watchlist}, default_headers).catch(e => console.log(e)) as AxiosResponse;
}
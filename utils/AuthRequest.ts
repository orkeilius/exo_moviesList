import {Linking} from "react-native";
import axios, {AxiosResponse} from "axios";


const token = "Bearer "+ process.env.EXPO_PUBLIC_TMDB_API_TOKEN;
const default_headers =   {headers:{
        accept: 'application/json',
        "content-type": 'application/json',
        Authorization: token
    }};


export async function openLoginPage():Promise<string> {
    let request_token = await getRequestToken()
    await Linking.openURL('https://www.themoviedb.org/authenticate/'+request_token)
    return request_token;
}

async function getRequestToken(): Promise<string> {

    let url = 'https://api.themoviedb.org/3/authentication/token/new';
    return await axios.get(url,default_headers).then(response => {
        return response.data.request_token;
    }).catch(e => console.log(url,e,e.body));

}

export async function createSession(request_token: string) :Promise<string> {
    let url = 'https://api.themoviedb.org/3/authentication/session/new';
    let response = await axios.post(url, {request_token}, default_headers).catch(e => console.log(e)) as AxiosResponse;
    return response.data.session_id;
}

export async function getUserDetails():Promise<any> {
    const url =  "https://api.themoviedb.org/3/account/null"
    let responce = await axios.get(url,default_headers).catch(e => console.log(e)) as AxiosResponse;
    return {username:responce.data.username,id:responce.data.id};
}

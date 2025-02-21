import { Linking } from "react-native";
import axios, { AxiosResponse } from "axios";


const token = "Bearer " + process.env.EXPO_PUBLIC_TMDB_API_TOKEN;
const defaultHeaders = {
    headers: {
        accept: 'application/json',
        "content-type": 'application/json',
        Authorization: token
    }
};


export async function openLoginPage(): Promise<string> {
    const requestToken = await getRequestToken()
    await Linking.openURL('https://www.themoviedb.org/authenticate/' + requestToken)
    return requestToken;
}

async function getRequestToken(): Promise<string> {

    const url = 'https://api.themoviedb.org/3/authentication/token/new';
    return axios.get(url, defaultHeaders).then(response => {
        return response.data.request_token;
    }).catch(e => console.log(url, e, e.body));

}

export async function createSession(requestToken: string): Promise<string> {
    const url = 'https://api.themoviedb.org/3/authentication/session/new';
    const response = await axios.post(url, { request_token: requestToken }, defaultHeaders).catch(e => console.log(e)) as AxiosResponse;
    return response.data.session_id;
}

export async function getUserDetails(): Promise<any> {
    const url = "https://api.themoviedb.org/3/account/null"
    const responce = await axios.get(url, defaultHeaders).catch(e => console.log(e)) as AxiosResponse;
    return { username: responce.data.username, id: responce.data.id };
}

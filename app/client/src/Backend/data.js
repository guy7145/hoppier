import Axios from "axios";
import env from '../Envs/currentEnv';
const backendUrl = env.backendUrl;


export async function getAllData() {
    return (await Axios.get(`${backendUrl}/data`)).data;
}

export async function getHopData(hopName) {
    return (await Axios.get(`${backendUrl}/data/${hopName}`)).data;
}

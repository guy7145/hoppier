import Axios from "axios";
import env from '../Envs/currentEnv';
const backendUrl = env.backendUrl;


async function fetchHop(hopName) {
    return (await Axios.get(`${backendUrl}/data/hop/${hopName}`)).data;
}

async function fetchAllHops() {
    return (await Axios.get(`${backendUrl}/data/all-hops`)).data;
}

async function fetchHopsMst() {
    return (await Axios.get(`${backendUrl}/data/mst`)).data;
}


class HopsData {
    constructor() {
        this.hopsList = [];
        this.hopsMst = {};
        this.popluateData = this.popluateData.bind(this);
    }

    async popluateData() {
        this.hopsList = await fetchAllHops();
    }
}

export default new HopsData();

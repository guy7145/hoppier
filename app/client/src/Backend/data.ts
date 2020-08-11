import Axios from "axios";
import env from '../Envs/currentEnv';
import {Hop} from "@shared/KnowledgeBase/types";
const backendUrl = env.backendUrl;


async function fetchHop(hopName): Promise<Hop> {
    return (await Axios.get(`${backendUrl}/data/hop/${hopName}`)).data;
}

async function fetchAllHops(): Promise<Array<Hop>> {
    return (await Axios.get(`${backendUrl}/data/all-hops`)).data;
}

async function fetchHopsMst() {
    return (await Axios.get(`${backendUrl}/data/mst`)).data;
}


class HopsData {
    hopsList: Array<Hop>;

    constructor() {
        this.hopsList = [];
        this.populateData = this.populateData.bind(this);
    }

    async populateData() {
        this.hopsList = await fetchAllHops();
    }
}

export default new HopsData();

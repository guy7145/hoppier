import Axios from "axios";
import env from '../Envs/currentEnv';
import {Hop, HopJson} from "@shared/types/hop";
const backendUrl = env.backendUrl;


async function fetchHop(hopName): Promise<HopJson> {
    return (await Axios.get(`${backendUrl}/data/hop/${hopName}`)).data;
}

async function fetchAllHops(): Promise<{[key: string]: HopJson}> {
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
        const hopsObj = await fetchAllHops();

        const hopIndices = {};
        Object.keys(hopsObj).forEach((hopName, index) => hopIndices[hopName] = index);

        this.hopsList = Object.values(hopsObj);
        this.hopsList.forEach((hop) => {
           hop.substitutes = hop.substitutes.map(hopName => this.hopsList[hopIndices[String(hopName)]]);
        });
    }
}

export default new HopsData();

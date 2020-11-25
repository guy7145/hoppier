import {filterHopsWithMissingData, hopCompounds} from "@shared/KnowledgeBase/HopComposition";
import {readFileSync} from 'fs';
import _ from 'lodash/math';
import {mergeDicts} from "../utils/dict";
import {Hop, HopData} from "@shared/types/hop";


const asArray = x => Array.isArray(x) ? x : [x];
const normalizeCompound = (v, vMax) => Array.isArray(v) ? v.map(vv => vv / vMax * 100) : v / vMax * 100;
const normalizeHop = (hop, hopMax) => mergeDicts(hopCompounds.map(comp => ({[comp]: normalizeCompound(hop[comp], hopMax[comp])})))

const hopsObj = JSON.parse(readFileSync('./data.json').toString());
const hopsList = filterHopsWithMissingData(Object.values(hopsObj));

const hopMax = hopsList.reduce(
    (hop1, hop2) => mergeDicts(
        hopCompounds.map(
            comp => (
                {[comp]: _.max([...asArray(hop1[comp]), ...asArray(hop2[comp])])}
            )
        )
    ) as Hop
)

hopsList.forEach(hop => hop.normalized = normalizeHop(hop, hopMax) as HopData)

const hopsObject = hopsList
    .reduce(
        (acc, currentHop) => ({...acc, [currentHop.title.toLowerCase()]: currentHop}),
        {}
    );

export default hopsObject;

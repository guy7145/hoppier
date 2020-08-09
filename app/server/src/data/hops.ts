import {filterHopsWithMissingData} from "@shared/KnowledgeBase/HopComposition";
import {readFileSync} from 'fs';

const hopsObj = JSON.parse(readFileSync('../../data.json').toString());
const hopsList = filterHopsWithMissingData(Object.values(hopsObj));
export default hopsList;

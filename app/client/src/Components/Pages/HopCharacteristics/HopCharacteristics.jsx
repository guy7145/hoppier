import React, {useState} from "react";
import HopContentArea from "./ContentArea/HopContentArea";
import Axis from "./Axis/Axis";
import styles from './hop-characteristics.css';
import {getAllData} from "../../../Backend/data.js";
import {hopChemicals} from "../../../KnowledgeBase/HopComposition";
import _ from 'lodash';


const NO_DATA = '?';


export default function HopCharacteristics() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [hop, setHop] = useState(null);

    if (isLoading) {
        getAllData().then((result) => {
            setData(Object
                .values(result)
                .filter(hop => _.every(hopChemicals.map(c => hop[c] && hop[c] !== '' && hop[c] !== NO_DATA)))
            );
            console.log(`showing ${data.length} different hops`);
            setHop(data[0]);
            setIsLoading(false);
        });
    }

    if (isLoading) {
        return <div>loading...</div>;
    }

    console.log(hop);

    return <div className={styles.hopCharacteristics}>
        <div className={styles.contentArea}>
            <HopContentArea hop={hop}>change hop</HopContentArea>
        </div>
        <div className={styles.axisArea}>
            <Axis setHop={setHop} allHops={data}/>
        </div>
    </div>;
}

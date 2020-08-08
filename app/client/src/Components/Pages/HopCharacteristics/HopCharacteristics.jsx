import React, {useState} from "react";
import HopContentArea from "./ContentArea/HopContentArea";
import Axis from "./Axis/Axis";
import styles from './style.css';
import {getAllData} from "../../../Backend/data.js";


export default function HopCharacteristics() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [hop, setHop] = useState(null);

    if (isLoading) {
        getAllData().then((result) => {
            setData(Object.values(result));
            setHop(data[0]);
            setIsLoading(false);
        });
    }

    if (isLoading) {
        return <div>loading...</div>;
    }

    return <div className={styles.hopCharacteristics}>
        <div className={styles.contentArea}>
            <HopContentArea hop={hop}>change hop</HopContentArea>
        </div>
        <div className={styles.axisArea}>
            <Axis setHop={setHop} allHops={data}/>
        </div>
    </div>;
}

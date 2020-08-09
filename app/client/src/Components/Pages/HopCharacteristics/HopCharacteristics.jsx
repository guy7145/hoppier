import React, {useState} from "react";
import HopContentArea from "./ContentArea/HopContentArea";
import Axis from "./Axis/Axis";
import styles from './hop-characteristics.css';
import Hops from '../../../Backend/data';


export default function HopCharacteristics() {
    const [hop, setHop] = useState(Hops.hopsList[5]);

    return <div className={styles.hopCharacteristics}>
        <div className={styles.contentArea}>
            <HopContentArea hop={hop}>change hop</HopContentArea>
        </div>
        <div className={styles.axisArea}>
            <Axis setHop={setHop} allHops={Hops.hopsList} selectedHopIndex={5}/>
        </div>
    </div>;
}

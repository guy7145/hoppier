import React, {useState} from "react";
import HopContentArea from "./ContentArea/HopContentArea";
import Axis from "./Axis/Axis";
import styles from './hop-characteristics.less';
import Hops from '../../../Backend/data';


export default function HopCharacteristics() {
    const [hops, setHops] = useState([Hops.hopsList[0]]);
    const setHop = hop => setHops([hop]);
    const addHop = hop => setHops([...hops, hop]);
    const removeHop = hop => setHops(hops.filter(other => other !== hop));

    return <div className={styles.hopCharacteristics}>
        <div className={styles.contentArea}>
            <HopContentArea
                hops={hops}
                setHop={setHop}
                addHop={addHop}
                removeHop={removeHop}
            />
        </div>
        <div className={styles.axisArea}>
            <Axis setHop={setHop} allHops={Hops.hopsList} selectedHopIndex={5}/>
        </div>
    </div>;
}

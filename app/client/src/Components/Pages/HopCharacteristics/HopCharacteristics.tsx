import React, {useState} from "react";
import HopContentArea from "./ContentArea/HopContentArea";
import Axis from "./Axis/Axis";
import styles from './hop-characteristics.less';
import Hops from '../../../Backend/data';
import SearchBar from "../../SearchBar/SearchBar";


export default function HopCharacteristics() {
    const [hops, setHops] = useState([Hops.hopsList[0]]);
    const setHop = hop => setHops([hop]);
    const addHop = hop => setHops([...hops, hop]);
    const removeHop = hop => setHops(hops.filter(other => other !== hop));

    return <div className={styles.hopCharacteristics}>
        <SearchBar
            items={Hops.hopsList}
            getKey={hop => hop.title}
            renderItem={(hop, isHighlighted) => <div>{isHighlighted ? '->' : ''} {hop.title}</div>}
            onSelect={setHop}
        />
        <div className={styles.contentArea}>
            <HopContentArea
                hops={hops}
                setHop={setHop}
                addHop={addHop}
                removeHop={removeHop}
            />
        </div>
        <div className={styles.axisArea}>
            <Axis setHop={setHop} allHops={Hops.hopsList} selectedHopIndex={0}/>
        </div>
    </div>;
}

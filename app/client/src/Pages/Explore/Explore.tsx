import React, {useState} from "react";
import styles from './explore.less';
import Hops from '../../Backend/data';
import Radar from "../../Components/Chart/Radar";
import HopsList from "../../Components/HopsList/HopsList";
import getListOperations from "../../Backend/utils";
import distinctColors from "distinct-colors";
import {MAX_COMPARED_HOPS} from "../../consts";


const palette = distinctColors({
    count: MAX_COMPARED_HOPS,
    hueMin: 0,
    hueMax: 360,
    lightMin: 45,
    lightMax: 80,
    quality: 200,
    samples: 1000,
}).map(color => color.hex('rgb'));


export default function Explore() {
    const [hops, setHops] = useState([]);
    const [visibleHops, setVisibleHops] = useState(hops);

    const {setItem: setHop, addItem: addHop, removeItem: removeHop} = getListOperations(hops, setHops);
    const {setItem: setVisibleHop, addItem: showHop, removeItem: hideHop} = getListOperations(visibleHops, setVisibleHops);
    const changeHopVisibility = hop => visibleHops.includes(hop) ? hideHop(hop) : showHop(hop);
    const addHopWithVisibility = (hop) => {
        hop.color = palette.pop();
        addHop(hop);
        showHop(hop);
    };
    const delHopWithVisibility = (hop) => {
        palette.push(hop.color);
        delete hop.color;
        removeHop(hop);
        hideHop(hop);
    };

    return <div className={styles.explorePage}>
        <HopsList
            items={hops}
            visibleItems={visibleHops}
            allItems={Hops.hopsList}
            addItem={addHopWithVisibility}
            delItem={delHopWithVisibility}
            changeItemVisibility={changeHopVisibility}
        />
        <div className={styles.chartArea}>
            <Radar hopsList={visibleHops}/>
        </div>
    </div>;
}

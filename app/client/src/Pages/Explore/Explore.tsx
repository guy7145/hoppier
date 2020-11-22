import React, {useState} from "react";
import styles from './explore.less';
import Hops from '../../Backend/data';
import Radar from "../../Components/Chart/Radar";
import HopsList from "../../Components/HopsList/HopsList";
import getListOperations from "../../Backend/utils";

import {parseLessList} from "../../Utils/less";
import palettes from "../../Styles/palettes.less";

const colors = parseLessList(palettes.hopsColors);

export default function Explore() {
    const [hops, setHops] = useState([]);
    const [visibleHops, setVisibleHops] = useState(hops);

    const {setItem: setHop, addItem: addHop, removeItem: removeHop} = getListOperations(hops, setHops);
    const {setItem: setVisibleHop, addItem: showHop, removeItem: hideHop} = getListOperations(visibleHops, setVisibleHops);
    const changeHopVisibility = hop => visibleHops.includes(hop) ? hideHop(hop) : showHop(hop);
    const addHopWithVisibility = (hop) => {
        addHop(hop);
        showHop(hop);
    };
    const delHopWithVisibility = (hop) => {
        colors.push(hop.color);
        delete hop.color;
        removeHop(hop);
        hideHop(hop);
    };

    let changed = false;
    hops.forEach(hop => {
        const res = hop;
        if(!hop['color']) {
            changed = true;
            res['color'] = colors.pop();
        }
    });

    if (changed) {
        setHops(hops);
    }

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

import React, {useState} from "react";
import styles from './explore.less';
import Hops from '../../Backend/data';
import Radar from "../../Components/Chart/Radar";
import HopsList from "../../Components/HopsList/HopsList";
import getListOperations from "../../Backend/utils";


export default function Explore() {
    const [hops, setHops] = useState(Hops.hopsList.slice(0, 5));
    const [visibleHops, setVisibleHops] = useState(hops);

    const {setItem: setHop, addItem: addHop, removeItem: removeHop} = getListOperations(hops, setHops);
    const {setItem: setVisibleHop, addItem: showHop, removeItem: hideHop} = getListOperations(visibleHops, setVisibleHops);
    const changeHopVisibility = hop => visibleHops.includes(hop) ? hideHop(hop) : showHop(hop);
    const addHopWithVisibility = (hop) => {
        addHop(hop);
        showHop(hop);
    };
    const delHopWithVisibility = (hop) => {
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

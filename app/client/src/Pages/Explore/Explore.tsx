import React, {useState} from "react";
import styles from './explore.less';
import Hops from '../../Backend/data';
import Radar from "../../Components/Chart/Radar";
import HopsList from "../../Components/HopsList/HopsList";
import getListOperations from "../../Backend/utils";
// import distinctColors from "distinct-colors";
// import {MAX_COMPARED_HOPS} from "../../consts";


// const palette = distinctColors({
//     count: MAX_COMPARED_HOPS,
//     hueMin: 0,
//     hueMax: 360,
//     lightMin: 60,
//     lightMax: 70,
//     quality: 200,
//     samples: 1000,
//     chromaMin: 70,
// }).map(color => color.hex('rgb'));

const palette = [
    '#23B5D3',
    '#f39a20',
    '#00ffae',
    '#e053db',
    '#ff1b1c',
    '#3C91E6',
    '#6dff00',
    '#ff5b00',
    '#f7ff00',
].reverse();


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

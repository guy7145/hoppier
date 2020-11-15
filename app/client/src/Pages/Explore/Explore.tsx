import React, {useState} from "react";
import styles from './explore.less';
import Hops from '../../Backend/data';
import Chart from "../../Components/Chart/Chart";
import HopsList from "../../Components/HopsList/HopsList";


export default function Explore() {
    const [hops, setHops] = useState([Hops.hopsList[0]]);
    const setHop = hop => setHops([hop]);
    const addHop = hop => setHops([...hops, hop]);
    const removeHop = hop => setHops(hops.filter(other => other !== hop));

    return <div className={styles.explorePage}>
        {/*<SearchBar*/}
        {/*    items={Hops.hopsList}*/}
        {/*    getKey={hop => hop.title}*/}
        {/*    renderItem={(hop, isHighlighted) => <div>{isHighlighted ? '->' : ''} {hop.title}</div>}*/}
        {/*    onSelect={setHop}*/}
        {/*/>*/}
        {/*<div className={styles.contentArea}>*/}
        {/*    <HopContentArea*/}
        {/*        hops={hops}*/}
        {/*        setHop={setHop}*/}
        {/*        addHop={addHop}*/}
        {/*        removeHop={removeHop}*/}
        {/*    />*/}
        {/*</div>*/}
        <HopsList items={hops} allItems={Hops.hopsList} addItem={addHop} delItem={removeHop}/>
        <div className={styles.chartArea}>
            <Chart hopsList={hops}/>
        </div>
    </div>;
}

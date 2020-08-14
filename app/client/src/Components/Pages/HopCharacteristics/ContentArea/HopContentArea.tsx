import React from "react";
import Chart from "./Chart/Chart";
import Title from "./Title/Title";
import styles from './content-area.less'
import {Hop} from "@shared/KnowledgeBase/types";
import HopInfo from "./HopInfo/HopInfo";


export default function HopContentArea({hops, setHop, addHop}: {hops: Array<Hop>, setHop: (Hop) => void, addHop: (Hop) => void}) {
    return <div className={styles.contentContainer}>
        <div className={styles.descriptionSidebar}>
            <Title hop={hops[0]}/>
            <HopInfo hop={hops[0]} setHop={setHop} addHop={addHop}/>
        </div>
        <div className={styles.chartArea}>
            <Chart hopsList={hops}/>
        </div>
    </div>;
}

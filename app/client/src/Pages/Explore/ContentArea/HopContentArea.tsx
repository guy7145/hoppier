import React from "react";
import Radar from "../../../Components/Chart/Radar";
import Title from "./Title/Title";
import styles from './content-area.less'
import {Hop} from "@shared/types/hop";
import HopInfo from "./HopInfo/HopInfo";
import HopTag from "../../../Components/HopTag/HopTag";


export default function HopContentArea({hops, setHop, addHop, removeHop}: {
        hops: Array<Hop>,
        setHop: (Hop) => void,
        addHop: (Hop) => void,
        removeHop: (Hop) => void,
    }) {
    return <div className={styles.contentContainer}>
        <div className={[styles.descriptionSidebar, hops.length === 1 ? styles.activated : ''].join(' ')}>
            <Title hop={hops[0]}/>
            <HopInfo hop={hops[0]} setHop={setHop} addHop={addHop}/>
        </div>
        <div className={[styles.titlesContainer, hops.length > 1 ? styles.activated : ''].join(' ')}>
            {hops.map(h => <HopTag hop={h} onClick={() => setHop(h)} onRemove={() => removeHop(h)}/>)}
        </div>
        <div className={styles.chartArea}>
            <Radar hopsList={hops}/>
        </div>
    </div>;
}

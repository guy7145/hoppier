import React from "react";
import Chart from "./Chart/Chart";
import Title from "./Title/Title";
import styles from './content-area.less'
import {Hop} from "@shared/types/hop";
import HopInfo from "./HopInfo/HopInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import HopTag from "../../../HopTag/HopTag";


export default function HopContentArea({hops, setHop, addHop, removeHop}: {
        hops: Array<Hop>,
        setHop: (Hop) => void,
        addHop: (Hop) => void,
        removeHop: (Hop) => void,
    }) {
    return <div className={styles.contentContainer}>
        {
            hops.length === 1 && <div className={styles.descriptionSidebar}>
                <Title hop={hops[0]}/>
                <HopInfo hop={hops[0]} setHop={setHop} addHop={addHop}/>
            </div>
        }
        {
            hops.length > 1 && <div className={styles.titlesContainer}>
                {hops.map(h => <HopTag hop={h} onRemove={() => removeHop(h)}/>)}
            </div>
        }
        <div className={styles.chartArea}>
            <Chart hopsList={hops}/>
        </div>
    </div>;
}

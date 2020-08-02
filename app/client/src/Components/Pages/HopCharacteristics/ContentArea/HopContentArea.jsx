import React from "react";
import Description from "./Description/Description";
import Chart from "./Chart/Chart";
import Title from "./Title/Title";
import styles from './content-area.css'


export default function HopContentArea({hop}) {
    return <div className={styles.contentContainer}>
        <div className={styles.descriptionSidebar}>
            <Title hop={hop}/>
            <Description hop={hop}/>
        </div>
        <div className={styles.chartArea}>
            <Chart hopsList={[hop]}/>
        </div>
    </div>;
}

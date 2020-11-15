import React from "react";

import styles from './styles.less';
import {Hop} from "@shared/types/hop";
import Pie from "../Chart/Pie";


export default function Item({hop}: {hop: Hop}) {
    return <div className={styles.itemContainer}>
        <div className={styles.item}>
            <div className={styles.hopName}>
                {hop.title}
            </div>
            <div className={styles.hideIconContainer}>

            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartSizeLimiter}>
                    <Pie hop={hop}/>
                </div>
            </div>
        </div>
    </div>;
}

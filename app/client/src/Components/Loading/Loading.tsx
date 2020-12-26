import React from "react";
import HopIcon from '../../Assets/hop-blue.svg';

import styles from './loading.less';


export default function Loading() {
    return <div className={styles.loading}>
        <div className={styles.canvas}>
            <div className={styles.circle}/>
            <HopIcon className={styles.icon} color={'#ffffff'} fill={'#000'}/>
        </div>
    </div>;
}

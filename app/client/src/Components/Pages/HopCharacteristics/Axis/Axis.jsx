import React from "react";
import styles from './axis.css';

export default function Axis({allHops, setHop}) {
    return <div className={styles.axis}>
        {allHops.map(hop => <button onClick={() => setHop(hop)}>{hop.title}</button> )}
    </div>
}

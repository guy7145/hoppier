import React from "react";
import styles from './description.css';

export default function Description({hop}) {
    return <div className={styles.description}>{hop.description}</div>;
}

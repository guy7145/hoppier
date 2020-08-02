import React from "react";
import styles from './title.css'

export default function Title({hop}) {
    return <div className={styles.title}>{hop.title}</div>;
}
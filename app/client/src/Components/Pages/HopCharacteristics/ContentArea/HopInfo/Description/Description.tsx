import React from "react";
import styles from './description.less';
import {Hop} from "@shared/types/hop";

export default function Description({hop}: {hop: Hop}) {
    return <div className={styles.description}>{hop.description}</div>;
}

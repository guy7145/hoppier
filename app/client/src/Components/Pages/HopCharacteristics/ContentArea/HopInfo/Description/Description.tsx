import React from "react";
import styles from './description.less';
import {Hop} from "@shared/KnowledgeBase/types";

export default function Description({hop}: {hop: Hop}) {
    return <div className={styles.description}>{hop.description}</div>;
}

import React from "react";
import styles from './title.less'
import {Hop} from "@shared/KnowledgeBase/types";

export default function Title({hop}: {hop: Hop}) {
    return <div className={styles.title}>{hop.title}</div>;
}
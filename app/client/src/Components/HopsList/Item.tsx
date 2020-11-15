import React from "react";

import styles from './styles.less';

export default function Item({name}) {
    return <div className={styles.item}>{name}</div>;
}

import React from "react";
import styles from './list-property.less';

export default function ListProperty({name, values}: {name: String, values: Array<any>}) {
    return <div className={styles.listPropertyContainer}>
        <div className={styles.propertyTitle}>{name}</div>
        <div className={styles.listProperty}>
            {values}
        </div>
    </div>;
}

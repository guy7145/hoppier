import React from "react";
import styles from './hop-tag.less';
import {Hop} from "@shared/types/hop";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default function HopTag({hop, onRemove}: {hop: Hop, onRemove: () => void}) {
    return <div className={styles.hopTag}>
        <div className={styles.hopName}>{hop.title}</div>
        <div className={styles.removeHopButton}>
            <FontAwesomeIcon icon={faTimes} onClick={onRemove}/>
        </div>
    </div>;
}

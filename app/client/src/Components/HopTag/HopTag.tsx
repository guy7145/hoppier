import React from "react";
import styles from './hop-tag.less';
import {Hop} from "@shared/types/hop";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default function HopTag({hop, onClick, onRemove}: {hop: Hop, onClick: () => void, onRemove: () => void}) {
    return <div className={styles.hopTag}>
        <div className={styles.hopName} onClick={onClick}>{hop.title}</div>
        <div className={styles.removeHopButtonContainer}>
            <FontAwesomeIcon className={styles.removeHopButton} icon={faTimes} onClick={onRemove}/>
        </div>
    </div>;
}

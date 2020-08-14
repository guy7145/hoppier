import React from "react";
import {Hop} from "@shared/KnowledgeBase/types";
import styles from './hop-link.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faHandPointer} from "@fortawesome/free-solid-svg-icons";

export default function HopLink({hop, onChoose, onAdd}: {hop: Hop, onChoose: () => void, onAdd: () => void}) {
    return <div className={styles.hopLink}>
        {hop.title}
        <div className={styles.hopLinkActions}>
            <div className={styles.hopLinkChoose} onClick={onChoose}><FontAwesomeIcon icon={faHandPointer}/></div>
            <div className={styles.hopLinkAdd} onClick={onAdd}><FontAwesomeIcon icon={faPlus}/></div>
        </div>
    </div>;
}

import React from "react";

import styles from './styles.less';
import {Hop} from "@shared/types/hop";
import Pie from "../Chart/Pie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faTimes, faSearch} from "@fortawesome/free-solid-svg-icons";
import hopIcon from '../../assets/hop-yellow.svg';

type ItemProps = {
    hop: Hop,
    isVisible: boolean,
    changeVisibility: () => void,
    deleteHop: () => void,
}
export default function Item({hop, isVisible, changeVisibility, deleteHop}: ItemProps) {
    return <div className={styles.itemContainer}>
        <div className={styles.item}>
            <div className={styles.hopName}>
                <img src={hopIcon} className={styles.hopIcon}/>
                {hop.title}
            </div>
            <div className={styles.controllersContainer}>
                <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} onClick={changeVisibility}/>
                <FontAwesomeIcon icon={faTimes} onClick={deleteHop}/>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartSizeLimiter}>
                    <Pie hop={hop}/>
                </div>
            </div>
        </div>
    </div>;
}

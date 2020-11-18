import React from "react";

import styles from './styles.less';
import {Hop} from "@shared/types/hop";
import Pie from "../Chart/Pie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faTimes, faSearch} from "@fortawesome/free-solid-svg-icons";
import hopIcon from '../../assets/hop-yellow.svg';
import classNames from "classnames";

type ItemProps = {
    hop: Hop,
    isVisible: boolean,
    changeVisibility: () => void,
    deleteHop: () => void,
}
export default function Item({hop, isVisible, changeVisibility, deleteHop}: ItemProps) {
    return <div className={classNames(styles.itemContainer, !isVisible && styles.hidden)}>
        <div className={styles.item}>
            <div className={styles.hopName}>
                <img src={hopIcon} className={styles.hopIcon} alt={'hop-icon'}/>
                {hop.title}
            </div>
            <div className={styles.controllersContainer}>
                <FontAwesomeIcon
                    className={styles.activeIcon}
                    icon={isVisible ? faEye : faEyeSlash}
                    onClick={changeVisibility}
                />
                <FontAwesomeIcon
                    className={styles.activeIcon}
                    icon={faTimes}
                    onClick={deleteHop}
                />
                <FontAwesomeIcon icon={faSearch}/>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartSizeLimiter}>
                    <Pie hop={hop} colorful={isVisible}/>
                </div>
            </div>
        </div>
    </div>;
}

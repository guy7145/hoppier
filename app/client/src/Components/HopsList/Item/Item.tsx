import React from "react";

import styles from './item.less';
import {Hop} from "@shared/types/hop";
import Pie from "../../Chart/Pie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faTimes} from "@fortawesome/free-solid-svg-icons";
import HopIcon from '../../../Assets/hop-yellow.svg';
import classNames from "classnames";

type ItemProps = {
    hop: Hop,
    isVisible: boolean,
    changeVisibility: () => void,
    deleteHop: () => void,
    color: string,
}

export default function Item({hop, isVisible, changeVisibility, deleteHop, color}: ItemProps) {

    return <div className={classNames(styles.itemContainer, !isVisible && styles.hidden)}>
        <div className={styles.item}>
            <div className={styles.hopNameIconContainer}>
                <HopIcon className={styles.hopIcon}/>
                <div className={styles.hopName}>{hop.title}</div>
            </div>
            <div className={styles.controllersContainer}>
                {
                    <>
                        <FontAwesomeIcon
                            className={classNames(styles.controller, styles.activeIcon)}
                            icon={isVisible ? faEye : faEyeSlash}
                            onClick={changeVisibility}
                        />
                        <FontAwesomeIcon
                            className={classNames(styles.controller, styles.activeIcon)}
                            icon={faTimes}
                            onClick={deleteHop}
                        />
                    </>
                }
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartSizeLimiter}>
                    <Pie hop={hop} colorful={isVisible} color={color}/>
                </div>
            </div>
        </div>
    </div>;
}

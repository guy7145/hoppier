import React, {ReactNode, useState} from "react";

import styles from './item.less';
import {Hop} from "@shared/types/hop";
import Pie from "../../Chart/Pie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import hopIcon from '../../../assets/hop-yellow.svg';
import classNames from "classnames";

type ItemProps = {
    hop: Hop,
    isVisible: boolean,
    changeVisibility: () => void,
    deleteHop: () => void,
    createSearchBar: (onSearchStop: () => void) => ReactNode,
    color: string,
}

export default function Item({hop, isVisible, changeVisibility, deleteHop, createSearchBar, color}: ItemProps) {
    const [isSearching, setIsSearching] = useState(false);

    return <div className={classNames(styles.itemContainer, !isVisible && styles.hidden)}>
        <div className={styles.item}>
            <div className={styles.hopName}>
                <img src={hopIcon} className={styles.hopIcon} alt={'hop-icon'}/>
                {hop.title}
            </div>
            <div className={styles.controllersContainer}>
                {
                    isSearching ? createSearchBar(() => setIsSearching(false)) :
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
                            <FontAwesomeIcon
                                className={styles.controller}
                                icon={faSearch}
                                onClick={() => setIsSearching(true)}
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

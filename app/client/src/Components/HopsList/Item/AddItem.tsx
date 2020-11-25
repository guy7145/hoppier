import React, {useState} from "react";

import SearchBar from "../../SearchBar/SearchBar";
import classNames from "classnames";

import styles from './add-item.less';
import {useKey} from "react-use";
import {andPreventEventDefault} from "../../../Utils/funcUtils";


type AddItemProps<T> = {
    availableItems: Array<T>,
    getItemTitle: (item: T) => string,
    onAddItem: (item: T) => void,
};


export default function AddItem<T>({availableItems, getItemTitle, onAddItem}: AddItemProps<T>) {
    const [isSelecting, setIsSelecting] = useState(false);
    const startSelecting = () => setIsSelecting(true);
    const stopSelecting = () => setIsSelecting(false);

    useKey(
        '=',
        isSelecting ? () => {} : andPreventEventDefault(startSelecting),
        {},
        [isSelecting]
    );

    return <div className={classNames(styles.addItem, isSelecting && styles.search)}>
        <div className={classNames(styles.animatedContainer, isSelecting ? styles.search : styles.button)}>
            {
                isSelecting ? <SearchBar
                    items={availableItems}
                    getKey={getItemTitle}
                    onSelect={(item) => {
                        onAddItem(item);
                        stopSelecting();
                    }}
                    onSearchStop={stopSelecting}
                    initSearching={true}
                /> : <div
                    className={styles.addItemButton}
                    onClick={startSelecting}
                >+</div>
            }
        </div>
    </div>
}

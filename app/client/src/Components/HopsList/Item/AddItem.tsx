import React, {useState} from "react";

import SearchBar from "../../SearchBar/SearchBar";
import classNames from "classnames";

import styles from './add-item.less';


type AddItemProps<T> = {
    availableItems: Array<T>,
    getItemTitle: (item: T) => string,
    onAddItem: (item: T) => void,
};


export default function AddItem<T>({availableItems, getItemTitle, onAddItem}: AddItemProps<T>) {
    const [isSelecting, setIsSelecting] = useState(false);
    const stopSelecting = () => setIsSelecting(false);

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
                    onClick={() => setIsSelecting(true)}
                >+</div>
            }
        </div>
    </div>
}

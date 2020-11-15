import React, {useState} from "react";

import styles from './styles.less';
import SearchBar from "../SearchBar/SearchBar";
import classNames from "classnames";

type AddItemProps<T> = {
    availableItems: Array<T>,
    getItemTitle: (item: T) => string,
    onAddItem: (item: T) => void,
};


export default function AddItem<T>({availableItems, getItemTitle, onAddItem}: AddItemProps<T>) {
    const [isSelecting, setIsSelecting] = useState(false);

    return <div className={styles.addItemButtonItem}>
        <div className={classNames(
            styles.addItemButtonContainer,
            {
                [styles.search]: isSelecting,
                [styles.button]: !isSelecting,
            }
        )}>
            {
                isSelecting ? <SearchBar
                    items={availableItems}
                    getKey={getItemTitle}
                    onSelect={(item) => {
                        onAddItem(item);
                        setIsSelecting(false);
                    }}
                    onSearchStop={() => setIsSelecting(false)}
                    initSearching={true}
                /> : <div className={styles.addItemButton} onClick={() => setIsSelecting(true)}>+</div>
            }
        </div>
    </div>
}

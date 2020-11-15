import React, {useState} from "react";

import styles from './styles.less';
import SearchBar from "../SearchBar/SearchBar";

type AddItemProps<T> = {
    availableItems: Array<T>,
    getItemTitle: (item: T) => string,
    onAddItem: (item: T) => void,
};


export default function AddItem<T>({availableItems, getItemTitle, onAddItem}: AddItemProps<T>) {
    const [isSelecting, setIsSelecting] = useState(false);

    return isSelecting ? <SearchBar
        items={availableItems}
        getKey={getItemTitle}
        onSelect={(item) => {
            onAddItem(item);
            setIsSelecting(false);
        }}
        initSearching={true}
    /> : <div className={styles.addItemButton} onClick={() => setIsSelecting(true)}>+</div>;
}

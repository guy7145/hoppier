import React from "react";

import styles from './styles.less';
import {Hop} from "@shared/types/hop";
import Item from "./Item";
import AddItem from "./AddItem";


type HopsListProps = {
    items: Array<Hop>,
    visibleItems: Array<Hop>,
    allItems: Array<Hop>,
    addItem: (hop: Hop) => void,
    delItem: (hop: Hop) => void,
    changeItemVisibility: (hop: Hop) => void,
};

export default function HopsList({items, visibleItems, allItems, addItem, delItem, changeItemVisibility}: HopsListProps) {
    return <div className={styles.list}>
        {items.map(hop => <Item
            hop={hop}
            isVisible={visibleItems.includes(hop)}
            changeVisibility={() => changeItemVisibility(hop)}
            deleteHop={() => delItem(hop)}
        />)}
        <AddItem
            availableItems={allItems.filter(item => !items.includes(item))}
            getItemTitle={item => item.title}
            onAddItem={addItem}
        />
    </div>;
}

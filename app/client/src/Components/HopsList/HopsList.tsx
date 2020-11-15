import React from "react";

import styles from './styles.less';
import {Hop} from "@shared/types/hop";
import Item from "./Item";
import AddItem from "./AddItem";
import Radar from "../Chart/Radar";


type HopsListProps = {
    items: Array<Hop>,
    allItems: Array<Hop>,
    addItem: (hop: Hop) => void,
    delItem: (hop: Hop) => void,
};

export default function HopsList({items, allItems, addItem, delItem}: HopsListProps) {
    return <div className={styles.list}>
        {items.map(hop => <Item
            hop={hop}
            isVisible={true}
            changeVisibility={() => {}}
            deleteHop={() => delItem(hop)}
        />)}
        <AddItem
            availableItems={allItems.filter(item => !items.includes(item))}
            getItemTitle={item => item.title}
            onAddItem={addItem}
        />
    </div>;
}

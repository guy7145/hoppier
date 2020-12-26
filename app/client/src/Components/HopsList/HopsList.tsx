import React from "react";

import styles from './hops-list.less';
import {Hop} from "@shared/types/hop";
import Item from "./Item/Item";
import AddItem from "./Item/AddItem";
import {MAX_COMPARED_HOPS} from "../../consts";


type HopsListProps = {
    items: Array<Hop>,
    visibleItems: Array<Hop>,
    allItems: Array<Hop>,
    addItem: (hop: Hop) => void,
    delItem: (hop: Hop) => void,
    changeItemVisibility: (hop: Hop) => void,
};

export default function HopsList({items, visibleItems, allItems, addItem, delItem, changeItemVisibility}: HopsListProps) {
    const restItems = allItems.filter(item => !items.includes(item));
    const getItemTitle = item => item.title;
    return <div className={styles.list}>
        {items.map(hop => <Item
            key={hop.title}
            hop={hop}
            isVisible={visibleItems.includes(hop)}
            changeVisibility={() => changeItemVisibility(hop)}
            deleteHop={() => delItem(hop)}
            color={hop['color']}
        />)}
        {
            items.length < MAX_COMPARED_HOPS && <AddItem
                key={'add-hop'}
                availableItems={restItems}
                getItemTitle={getItemTitle}
                onAddItem={addItem}
            />
        }
    </div>;
}

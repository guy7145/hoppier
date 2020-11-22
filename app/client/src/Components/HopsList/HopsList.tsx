import React from "react";

import styles from './hops-list.less';
import {Hop} from "@shared/types/hop";
import Item from "./Item/Item";
import AddItem from "./Item/AddItem";
import SearchBar from "../SearchBar/SearchBar";


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
    const createSearchBar = hop => onSearchStop => <SearchBar
        items={restItems}
        getKey={getItemTitle}
        onSelect={(selectedItem) => {
            // TODO: replace with new hop
        }}
        onSearchStop={onSearchStop}
        initSearching={true}
    />
    return <div className={styles.list}>
        {items.map(hop => <Item
            key={hop.title}
            hop={hop}
            isVisible={visibleItems.includes(hop)}
            changeVisibility={() => changeItemVisibility(hop)}
            deleteHop={() => delItem(hop)}
            createSearchBar={createSearchBar(hop)}
            color={hop['color']}
        />)}
        <AddItem
            key={'add-hop'}
            availableItems={restItems}
            getItemTitle={getItemTitle}
            onAddItem={addItem}
        />
    </div>;
}

import React, {ReactNode, useState} from "react";
import styles from './search-bar.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "react-autocomplete";


export default function SearchBar<T>({items, getKey, renderItem, onSelect}:
    {
        items: Array<T>,
        getKey: (item: T) => string,
        renderItem: (item: T, isHighlighted: boolean) => ReactNode,
        onSelect: (item: string) => void
    }) {
    const [value, setValue] = useState('');

    return <div className={styles.searchContainer}>
        <div className={styles.searchIconContainer}>
            <FontAwesomeIcon className={styles.searchIcon} icon={faSearch}/>
        </div>
        <div className={styles.searchInputContainer}>
            <Autocomplete
                items={items}
                getItemValue={getKey}
                value={value}
                onChange={e => setValue(e.target.value)}
                renderItem={renderItem}
                inputProps={{
                    className: styles.searchInput,
                }}
                wrapperProps={{
                    className: styles.searchInput,
                }}
                shouldItemRender={(item, value) => getKey(item).toLowerCase().includes(value.toLowerCase())}
                onSelect={(v, item) => onSelect(item)}
                renderMenu={items => <div
                    className={styles.autocompleteSuggestions}
                >
                    {items}
                </div>}
            />
        </div>
    </div>;
}

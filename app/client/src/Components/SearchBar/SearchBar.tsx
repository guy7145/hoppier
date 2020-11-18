import React, {useState} from "react";
import styles from './search-bar.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import SearchSuggestions from "./SearchSuggestions";


type SearchBarProps<T> = {
    items: Array<T>,
    getKey: (item: T) => string,
    onSelect: (item: T) => void,
    onSearchStop?: () => void,
    initSearching?: boolean,
    // renderItem: (item: T, isHighlighted: boolean) => ReactNode,
}


export default function SearchBar<T>({items, getKey, onSelect, onSearchStop=() => {}, initSearching=false}: SearchBarProps<T>) {
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [value, setValue] = useState('');

    const startSearch = () => setIsSearching(true)
    const stopSearchTimeout = () => {
        setIsSearching(false);
        setTimeout(onSearchStop, suggestionsOpen ? 100 : 0)
    }

    return <div className={classNames(
        styles.searchContainer,
        suggestionsOpen && styles.open,
    )}>
        <div className={styles.searchIconContainer}>
            <FontAwesomeIcon className={styles.searchIcon} icon={faSearch}/>
        </div>
        <input
            onChange={ev => setValue(ev.target.value)}
            className={styles.searchInput}
            onBlur={stopSearchTimeout}
            onFocus={startSearch}
            autoFocus={initSearching}
            placeholder={'search hops'}
        />
        <SearchSuggestions
            searchQuery={value}
            items={items}
            getKey={getKey}
            onExpand={() => setSuggestionsOpen(true)}
            onFold={() => setSuggestionsOpen(false)}
            isSearching={isSearching}
            onSelect={onSelect}
        />
    </div>;
}

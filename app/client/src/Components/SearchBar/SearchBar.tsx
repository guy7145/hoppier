import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import SearchSuggestions from "./SearchSuggestions";
import {lessTimeToMilliseconds} from "../../Utils/less";

import styles from './search-bar.less';


type SearchBarProps<T> = {
    items: Array<T>,
    getKey: (item: T) => string,
    onSelect: (item: T) => void,
    onSearchStop?: () => void,
    visible?: boolean,
    initSearching?: boolean,
}

const foldTime = lessTimeToMilliseconds(styles.foldTime);

export default function SearchBar<T>(
    {
        items, getKey, onSelect, onSearchStop=() => {}, visible=true, initSearching=false
    }: SearchBarProps<T>) {
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [value, setValue] = useState('');

    const stopSearchTimeout = () => setTimeout(onSearchStop, suggestionsOpen ? foldTime : 0);

    return <div className={classNames(
        styles.searchContainer,
        !visible && styles.hidden,
        suggestionsOpen && styles.open,
    )}>
        <div className={styles.searchIconContainer}>
            <FontAwesomeIcon className={styles.searchIcon} icon={faSearch}/>
        </div>
        {
            visible && <input
                onChange={ev => setValue(ev.target.value)}
                className={styles.searchInput}
                onBlur={stopSearchTimeout}
                autoFocus={initSearching}
                placeholder={'search hops'}
                onLoadStart={() => value !== '' && setValue('')}
            />
        }
        <SearchSuggestions
            searchQuery={value}
            items={items}
            getKey={getKey}
            onExpand={() => setSuggestionsOpen(true)}
            onFold={() => setSuggestionsOpen(false)}
            onSelect={onSelect}
            onEsc={onSearchStop}
        />
    </div>;
}

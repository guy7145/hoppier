import React, {useState} from "react";
import styles from './search-bar.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';
import Separator from "../Separator/Separator";


type SearchBarProps<T> = {
    items: Array<T>,
    getKey: (item: T) => string,
    // renderItem: (item: T, isHighlighted: boolean) => ReactNode,
    onSelect: (item: T) => void,
    onSearchStop?: () => void,
    initSearching?: boolean,
}


export default function SearchBar<T>({items, getKey, onSelect, onSearchStop=() => {}, initSearching=false}: SearchBarProps<T>) {
    const [isSearching, setIsSearching] = useState(false);
    const [isStopping, setIsStopping] = useState(false);
    const [value, setValue] = useState('');
    const valueLower = value.toLowerCase().trim();
    const shouldSuggest = isSearching && !isStopping && valueLower !== '';
    const suggestions = valueLower !== '' ? items.filter(item => getKey(item).toLowerCase().includes(valueLower)) : [];

    const startSearch = () => setIsSearching(true)
    const stopSearchTimeout = () => {
        setIsStopping(true);
        setTimeout(() => {
            setIsStopping(false);
            setIsSearching(false);
            onSearchStop();
        }, shouldSuggest ? 100 : 0)
    }
    const chooseItem = (item) => {
        // setIsSearching(false);
        onSelect(item);
    }

    return <div className={classNames(
        styles.searchContainer,
        shouldSuggest && styles.open,
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
        {
            <div className={classNames(
                styles.suggestedItemsContainer,
                shouldSuggest && styles.visible,
                (!shouldSuggest || isStopping) && styles.foldSuggestions,
            )}>
                <Separator vertical={false} />
                <div className={styles.suggestedItems}>
                    {
                        suggestions.length > 0 ? suggestions.slice(0, 5).map(
                            (item) => {
                                const key = getKey(item);
                                return <div onMouseDown={() => chooseItem(item)} className={styles.suggestion} key={key}>
                                    <div className={styles.searchIconContainer}>
                                        <FontAwesomeIcon className={styles.searchIcon} icon={faSearch}/>
                                    </div>
                                    {key}
                                </div>
                            }) : <div className={classNames(styles.suggestion, styles.noResults)}>
                            no results found
                        </div>
                    }
                </div>
            </div>
        }
    </div>;
}

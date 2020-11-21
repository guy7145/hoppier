import React, {useEffect} from 'react';
import classNames from "classnames";
import styles from "./search-bar.less";
import Separator from "../Separator/Separator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

type SuggestedItemsProp<T> = {
    searchQuery: string,
    items: Array<T>,
    getKey: (item: T) => string,
    onSelect: (item: T) => void,
    onExpand: () => void,
    onFold: () => void,
}

export default function SearchSuggestions<T>(
    {
        searchQuery,
        items,
        getKey,
        onExpand,
        onFold,
        onSelect,
    }: SuggestedItemsProp<T>) {
    searchQuery = searchQuery.toLowerCase().trim();
    const shouldSuggest = searchQuery !== '';
    const suggestions = searchQuery !== '' ? items.filter(item => getKey(item).toLowerCase().includes(searchQuery)) : [];

    useEffect(() => shouldSuggest ? onExpand() : onFold(), [shouldSuggest])
    
    return <div className={classNames(
        styles.suggestedItemsContainer,
        shouldSuggest && styles.visible,
        !shouldSuggest && styles.foldSuggestions,
    )}>
        <Separator vertical={false} />
        <div className={styles.suggestedItems}>
            {
                suggestions.length > 0 ? suggestions.slice(0, 5).map(
                    (item) => {
                        const key = getKey(item);
                        return <div onMouseDown={() => onSelect(item)} className={styles.suggestion} key={key}>
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

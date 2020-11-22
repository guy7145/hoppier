import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import styles from "./search-bar.less";
import Separator from "../Separator/Separator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useKey} from "react-use";
import {concatFunctions} from "../../Utils/funcUtils";

type SuggestedItemsProp<T> = {
    searchQuery: string,
    items: Array<T>,
    getKey: (item: T) => string,
    onSelect: (item: T) => void,
    onExpand: () => void,
    onFold: () => void,
    onEsc: () => void,
}

const andPreventEventDefault = (f) => ev => {
    ev.preventDefault();
    f();
};
const MAX_SUGGESTIONS = 5;
const NO_SUGGESTION_INDEX = -1;
const FIRST_SUGGESTION_INDEX = 0;

export default function SearchSuggestions<T>(
    {
        searchQuery,
        items,
        getKey,
        onExpand,
        onFold,
        onSelect,
        onEsc,
    }: SuggestedItemsProp<T>) {
    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);

    searchQuery = searchQuery.toLowerCase().trim();

    useEffect(() => {
            if (focusedSuggestionIndex > NO_SUGGESTION_INDEX) {
                if (suggestions.length == 0) {
                    setFocusedSuggestionIndex(NO_SUGGESTION_INDEX);
                } else {
                    setFocusedSuggestionIndex(FIRST_SUGGESTION_INDEX);
                }
            }
        },
        [searchQuery],
    )

    const shouldSuggest = searchQuery !== '';
    const suggestions = searchQuery !== '' ?
        items
            .map(item => ({item, key: getKey(item).toLowerCase()}))
            .map(indexedItem => ({...indexedItem, index: indexedItem.key.indexOf(searchQuery)}))
            .filter(indexedItem => indexedItem.index !== -1)
            .slice(0, MAX_SUGGESTIONS)
            .map(indexedItem => ({
                ...indexedItem,
                keyBefore: indexedItem.key.slice(0, indexedItem.index),
                keyAfter: indexedItem.key.slice(indexedItem.index + searchQuery.length, indexedItem.key.length),
            })) : [];

    const resetSuggestion = () => setFocusedSuggestionIndex(NO_SUGGESTION_INDEX);
    const incSuggestion = () =>
        (focusedSuggestionIndex < suggestions.length - 1) && setFocusedSuggestionIndex(focusedSuggestionIndex + 1);
    const decSuggestion = () =>
        (focusedSuggestionIndex > NO_SUGGESTION_INDEX) && setFocusedSuggestionIndex(focusedSuggestionIndex - 1);

    useKey(
        'ArrowUp',
        andPreventEventDefault(decSuggestion),
        {},
        [decSuggestion],
    );
    useKey(
        'ArrowDown',
        andPreventEventDefault(incSuggestion),
        {},
        [incSuggestion],
    );
    useKey(
        'Enter',
        () => focusedSuggestionIndex >= 0 && onSelect(suggestions[focusedSuggestionIndex].item),
        {},
        [focusedSuggestionIndex],
    );
    useKey('Escape', onEsc,{},[incSuggestion]);

    onExpand = concatFunctions(onExpand, resetSuggestion);
    useEffect(() => shouldSuggest ? onExpand() : onFold(), [shouldSuggest]);

    return <div className={classNames(
        styles.suggestedItemsContainer,
        !shouldSuggest && styles.hidden,
    )}>
        <Separator vertical={false} />
        <div className={styles.suggestedItems}>
            {
                suggestions.length > 0 ? suggestions.map(
                    ({item, keyBefore, keyAfter}, itemIndex) => {
                        const key = getKey(item);
                        return <div
                            key={key}
                            className={classNames(
                                styles.suggestion,
                                itemIndex == focusedSuggestionIndex && styles.focused,
                            )}
                            onMouseDown={() => onSelect(item)}
                            onMouseOver={() => setFocusedSuggestionIndex(itemIndex)}
                        >
                            <div className={styles.searchIconContainer}>
                                <FontAwesomeIcon className={styles.searchIcon} icon={faSearch}/>
                            </div>
                            {keyBefore}
                            <strong>{searchQuery}</strong>
                            {keyAfter}
                        </div>
                    }) : <div className={classNames(styles.suggestion, styles.noResults)}>
                    no results found
                </div>
            }
        </div>
    </div>
}

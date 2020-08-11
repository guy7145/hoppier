import React, {useState} from 'react';

export default function DataLoader({asyncDataFetcher, LoadingComponent, children}) {
    const [isLoading, setIsLoading] = useState(true);
    const [startedFetching, setStartedFetching] = useState(false);

    if (!startedFetching) {
        asyncDataFetcher().then(() => {
            setIsLoading(false);
        });
        setStartedFetching(true);
        return LoadingComponent;
    }
    if (isLoading) {
        return LoadingComponent;
    }
    return children;
}

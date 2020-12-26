import React, {useState} from 'react';

export default function DataLoader({asyncDataFetcher, LoadingComponent, ErrorComponent, children}) {
    const [startedFetching, setStartedFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!startedFetching) {
        asyncDataFetcher().then(() => {
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setError(err);
        });
        setStartedFetching(true);
        return LoadingComponent;
    }

    if (isLoading) {
        return LoadingComponent;
    }

    if (error) {
        return ErrorComponent;
    }

    return children;
}

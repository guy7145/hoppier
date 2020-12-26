import React from "react";
import { hot } from 'react-hot-loader/root';
import Explore from "./Pages/Explore/Explore";
import DataLoader from "./Components/DataLoader";
import Hops from './Backend/data';
import Loading from "./Components/Loading/Loading";
import Error from "./Components/Error/Error";

const LOADING_ANIMATION_TIME = 1500;

function App({name}: {name: String}) {
    return (
        <DataLoader
            asyncDataFetcher={() => Promise.all([
                Hops.populateData(),
                new Promise(resolve => setTimeout(resolve, LOADING_ANIMATION_TIME)),
            ])}
            LoadingComponent={<Loading/>}
            ErrorComponent={<Error/>}>
            <title>{name}</title>
            <Explore/>
        </DataLoader>
    );
}

export default hot(App);

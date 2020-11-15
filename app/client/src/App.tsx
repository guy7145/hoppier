import React from "react";
import { hot } from 'react-hot-loader/root';
import Explore from "./Pages/Explore/Explore";
import DataLoader from "./Components/DataLoader";
import Hops from './Backend/data';
import Loading from "./Components/Loading";


function App({name}: {name: String}) {
    return (
        <DataLoader asyncDataFetcher={Hops.populateData} LoadingComponent={<Loading/>}>
            <Explore/>
        </DataLoader>
    );
}

export default hot(App);

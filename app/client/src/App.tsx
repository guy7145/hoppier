import React from "react";
import { hot } from 'react-hot-loader/root';
import HopCharacteristics from "./Components/Pages/HopCharacteristics/HopCharacteristics";
import DataLoader from "./Components/DataLoader";
import Hops from './Backend/data';
import Loading from "./Components/Loading";


function App({name}: {name: String}) {
    return (
        <DataLoader asyncDataFetcher={Hops.populateData} LoadingComponent={<Loading/>}>
            <HopCharacteristics/>
        </DataLoader>
    );
}

export default hot(App);

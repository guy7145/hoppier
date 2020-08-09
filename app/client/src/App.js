import React from "react";
import { hot } from 'react-hot-loader/root';
import HopCharacteristics from "./Components/Pages/HopCharacteristics/HopCharacteristics";
import DataLoader from "./Components/DataLoader";
import Hops from './Backend/data';
import Loading from "./Components/Loading";

class App extends React.Component {
  render() {
    return (
        <DataLoader asyncDataFetcher={Hops.popluateData} LoadingComponent={<Loading/>}>
          <HopCharacteristics/>
        </DataLoader>
    );
  }
}

export default hot(App);

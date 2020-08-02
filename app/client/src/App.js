import React from "react";
import { hot } from 'react-hot-loader/root';
import HopCharacteristics from "./Components/Pages/HopCharacteristics/HopCharacteristics";

class App extends React.Component {
  render() {
    return (
        <HopCharacteristics/>
    );
  }
}

export default hot(App);

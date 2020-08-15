import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./Styles/styles.global.less";


const mountNode = document.getElementById("app");
ReactDOM.render(<App name="BrewDay"/>, mountNode);

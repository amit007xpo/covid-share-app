import React from "react";
import { hydrate } from "react-dom";
import App from "./components/app";
import VideoShare from './components/VideoShare'
// import Routes from '../routes'
// import * as serviceWorker from "./serviceWorker";
// import { BrowserRouter, HashRouter } from "react-router-dom";
const node = document.getElementById('reactele');
const userData = node.dataset.react ? JSON.parse(node.dataset.react) : {};
// const userProps = node.dataset.props ? JSON.parse(node.dataset.props) : {};

hydrate(<App data={userData} />, document.getElementById("reactele"));
// hydrate(<VideoShare />, document.getElementById("comp2"));
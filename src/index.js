import React from "react";
import { hydrate } from "react-dom";
import App from "./components/app";

const node = document.getElementById('reactele');
const userData = node.dataset.react ? JSON.parse(node.dataset.react) : {};

hydrate(<App data={userData} />, document.getElementById("reactele"));
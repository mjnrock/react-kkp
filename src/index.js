import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "mobx-react";
import UiStore from "./stores/UiStore";
import DifferentStore from "./stores/DifferentStore";

const Root = (
    <Provider store={{ UiStore, DifferentStore }}>
        <App />
    </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
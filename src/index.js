import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    // useRouteMatch,
    // useParams
} from "react-router-dom";

import { Provider } from "mobx-react";

import MediaStudioStore from "./components/media-studio/lib/MediaStudioStore";

//? window.store for debugging, remove in prod
let store = window.store = {
    MediaStudioStore
};

const Root = (
    <Provider store={ store }>
        <Router>
            <div>
                <Switch>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
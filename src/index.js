import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    // useRouteMatch,
    // useParams
} from "react-router-dom";

import { Provider } from "mobx-react";

import UiStore from "./stores/UiStore";
import DifferentStore from "./stores/DifferentStore";

import About from "./About";

const Root = (
    <Provider store={{ UiStore, DifferentStore }}>
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/topics">
                        <Topics />
                    </Route>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </div>
        </Router>
    </Provider>
);

function Topics() {
    return <h2>Topics</h2>;
}

ReactDOM.render(Root, document.getElementById("root"));
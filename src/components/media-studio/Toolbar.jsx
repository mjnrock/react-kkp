import React from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class Toolbar extends React.Component {
    render() {
        return (
            <div class="btn-group">
                <button className="btn btn-outline-secondary">Cat</button>
                <button className="btn btn-outline-secondary">Dog</button>
            </div>
        );
    }
};
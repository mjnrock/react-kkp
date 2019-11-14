import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class App extends Component {
    render() {
        // const { UiStore, DifferentStore } = this.props.store;
        const { DifferentStore } = this.props.store;

        return (
            <div>
                <div>{ DifferentStore.text }</div>
            </div>
        );
    }
}

export default App;
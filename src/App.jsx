import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MediaStudio from "./components/media-studio/package";

@inject("store")
@observer
class App extends Component {
    render() {
        const { MediaStudioStore } = this.props.store;

        return (
            <div>
                <div>{ MediaStudioStore.title }</div>
                <hr />
                <MediaStudio.MediaStudio />
            </div>
        );
    }
}

export default App;
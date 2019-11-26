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
                <div>
                    <span className="b">Last Command:&nbsp;</span>
                    <span>{ MediaStudioStore.command }</span>
                </div>
                <hr />
                {/* <canvas id="animus-canvas" width={ 500 } height={ 500 } className="ba br1"></canvas> */}
                <MediaStudio.MediaStudio />
            </div>
        );
    }
}

export default App;
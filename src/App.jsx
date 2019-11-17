import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MediaStudio from "./components/media-studio/package";
import Animus from "./lib/animus/package";

let now = Date.now();
let fs = new Animus.FrameSequence([
    new Animus.Frame({
        cats: 0
    }, 950),
    new Animus.Frame({
        fish: 1000
    }, 1500),
    new Animus.Frame({
        dogs: -1000
    }, 200)
]);

console.log(fs);

let fps = 10,
    spf = 1000 / fps;

setInterval(() => {
    fs._trigger("next", 50)
}, spf);



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
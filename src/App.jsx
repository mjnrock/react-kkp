import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MediaStudio from "./components/media-studio/package";
import Animus from "./lib/animus/package";

let now = Date.now();
let fs = new Animus.FrameSequence([
    [ {}, 500 ],
    [ {}, 1500 ],
    [ {}, 3000 ]
]);

console.log(fs);

let fps = 5,
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
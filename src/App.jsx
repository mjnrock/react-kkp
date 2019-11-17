import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MediaStudio from "./components/media-studio/package";
import Animus from "./lib/animus/package";

let fs = new Animus.Sequencer([
    //? Example transformation and contingent progression into _state.next
    new Animus.Node({}, (frame, data) => {
        let r = Math.random() * 100;

        if(r > 95) {
            frame.setDatum("cats", (frame.getDatum("cats") || 0) + 500);
        }

        return Math.random() * 100 > 40 ? true : false;
    }),
    [ {}, 500 ],
    [ {}, 600 ]
]);

fs._subscribe("next", (scope, result) => {
    console.log(result, scope._prop("index"));
});

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
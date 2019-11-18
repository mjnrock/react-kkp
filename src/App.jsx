import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MediaStudio from "./components/media-studio/package";
import Animus from "./lib/animus/package";

@inject("store")
@observer
class App extends Component {
    componentDidMount() {
        let fs = new Animus.EventSequencer([
            [ "cats", 500 ],
            [ "dogs", 600 ],
            [ "fish", 850 ],
            [ "&^%$2", 300 ],
        ], {
            repeat: true
        }).SetHooks({
            next: ([ sequencer, target, state ], ...args) => {
                console.log(state);

                return true;
            },
            persist: () => console.log("PERSISTED"),
            complete: () => console.log("COMPLETED")
        });
        
        console.log(fs);
        fs.trigger("next");
        fs.trigger("next");
        fs.trigger("next");
        fs.trigger("next");
        fs.trigger("next");
        fs.trigger("next");

        // let fs2 = new Animus.Plugin.RenderCanvasImage(document.getElementById("animus-canvas"), [
        //     // "raccoon.png",
        //     [ "Pusheen.png", 300 ],
        //     new Animus.Plugin.ImageNode("raccoon.png", 1000),
        //     // new Animus.Plugin.ImageNode("Pusheen.png")
        // ]).Start(2);

        // console.log(fs);

        // fs.listen("next", () => console.log("NEXT"));
    }

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
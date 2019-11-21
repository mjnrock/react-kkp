import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MediaStudio from "./components/media-studio/package";
import Animus from "./lib/animus/package";

@inject("store")
@observer
class App extends Component {
    componentDidMount() {
        let sequence = new Animus.Sequence();
        let node = new Animus.TimeNode("cats", 1000);

        sequence.AddNode(node);

        node.Run();
        sequence.RemoveNode(0);

        setTimeout(() => {
            console.log(node.Query());
        }, 2000);



        // let fs = new Animus.IntervalSequencer([
        //         // new Animus.Node("cat", () => {
        //         //     return true;
        //         // }),
        //         [ "cat", 600 ],
        //         [ "dogs", 600 ],
        //         [ "fish", 850 ],
        //         [ "&^%$2", 300 ],
        //     ], 500, { repeat: true });

        // fs.Start();


        // let fs = new Animus.Sequencer([
        //     [ "cats", 500 ],
        //     [ "dogs", 600 ],
        //     [ "fish", 850 ],
        //     [ "&^%$2", 300 ],
        // ], {
        //     repeat: true
        // });
        // .SetHooks({
        //     next: ([ sequencer, target, state ], ...args) => {
        //         console.log(state);

        //         return true;
        //     },
        //     persist: () => console.log("PERSISTED"),
        //     complete: () => console.log("COMPLETED")
        // });
        
        // console.log(fs);
        // fs.trigger("sequence:next");
        // fs.trigger("sequence:next");
        // fs.trigger("sequence:next");
        // fs.ToggleRepeat();
        // fs.trigger("sequence:next");
        // fs.trigger("sequence:next");
        // fs.trigger("sequence:next");

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
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MediaStudio from "./components/media-studio/package";
import Animus from "./lib/animus/package";


@inject("store")
@observer
class App extends Component {
    componentDidMount() {
        let fs = new Animus.RenderCanvas(document.getElementById("animus-canvas"), [
            //? Example transformation and contingent progression into _state.next
            [ "text", 1000 ],
            [ "hello", 300 ],
            [ "yo", 700 ],
            [ "Lorem", 500 ],
            [ "^!#@(*$&^o", 650 ]
        ]).Start(10);

    }

    render() {
        const { MediaStudioStore } = this.props.store;

        return (
            <div>
                <div>{ MediaStudioStore.title }</div>
                <hr />
                <canvas id="animus-canvas" width={ 500 } height={ 500 } className="ba br1"></canvas>
                <MediaStudio.MediaStudio />
            </div>
        );
    }
}

export default App;
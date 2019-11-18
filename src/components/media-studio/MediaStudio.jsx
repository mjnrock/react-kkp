import React from "react";
import { inject, observer } from "mobx-react";
import { fabric as Fabric } from "fabric";

import Toolboxes from "./toolboxes/package";

import "./MediaStudio.css";

@inject("store")
@observer
export default class MediaStudio extends React.Component {
    componentDidMount() {
        this.props.store.MediaStudioStore.mainCanvas = new Fabric.Canvas(
            document.getElementById("ms-canvas"),
            {
                backgroundColor: "#CCC"
            }
        );
    }

    listener(e, eventType, command) {
        this.props.store.MediaStudioStore.setCommand(`ms.${command}`);

        console.log(this.props.store.MediaStudioStore.getCommand());
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h3 className="text-center">Action Toolbar</h3>

                    <Toolboxes.Action.ActionToolbar
                        className="ba br2 pa3"
                        listener={ this.listener.bind(this) }
                    />
                </div>                

                <div>
                    <canvas
                        id="ms-canvas"
                        width={ 500 }
                        height={ 500 }
                    ></canvas>
                </div>

                <div>
                    <h3 className="text-center">Color Toolbar</h3>

                    <Toolboxes.Color.ColorToolbar
                        className="ba br2 pa3"
                        listener={ this.listener.bind(this) }
                    />
                </div>

                <div>
                    <h3 className="text-center">Text Toolbar</h3>

                    <Toolboxes.Text.TextToolbar
                        className="ba br2 pa3"
                        listener={ this.listener.bind(this) }
                    />
                </div>

                <div>
                    <h3 className="text-center">Draw Toolbar</h3>

                    <Toolboxes.Draw.DrawToolbar
                        className="ba br2 pa3"
                        listener={ this.listener.bind(this) }
                    />
                </div>

                <div>
                    <h3 className="text-center">Camera Toolbar</h3>

                    <Toolboxes.Camera.CameraToolbar
                        className="ba br2 pa3"
                        listener={ this.listener.bind(this) }
                    />
                </div>
            </div>
        );
    }
};
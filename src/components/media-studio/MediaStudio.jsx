import React from "react";
import { inject, observer } from "mobx-react";
import { fabric as Fabric } from "fabric";

import Toolboxes from "./toolboxes/package";

import "./MediaStudio.css";

@inject("store")
@observer
export default class MediaStudio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoStream: null
        };
    }

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

    StartVideo(e) {
        if(!this.state.videoStream && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            let _this = this;
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    //video.src = window.URL.createObjectURL(stream);
                    let video = document.getElementById("ms-video");
                    video.srcObject = stream;
                    video.play();
                    
                    _this.setState({
                        videoStream: stream
                    });
                });
        }
    }
    StopVideo(e) {
        if(this.state.videoStream) {
            this.state.videoStream.getTracks().forEach(function(track) {
                track.stop();
            });

            this.setState({
                videoStream: null
            });
        }
    }
    CaptureVideo(e) {
        let canvas = this.props.store.MediaStudioStore.mainCanvas,
            ctx = canvas.getContext("2d");

        ctx.drawImage(document.getElementById("ms-video"), 0, 0, canvas.width, canvas.height);
    }

    render() {
        // let MS = this.props.store.MediaStudioStore;

        return (
            <div className="container">
                <div>
                    <button
                        onClick={ this.StartVideo.bind(this) }
                    >Start</button>
                    <button
                        onClick={ this.StopVideo.bind(this) }
                    >Stop</button>
                    <button
                        onClick={ this.CaptureVideo.bind(this) }
                    >Capture</button>
                    <video
                        id="ms-video"
                        onClick={ this.StartVideo.bind(this) }
                        width={ 500 }
                        height={ 500 }
                    ></video>
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

                    <Toolboxes.ColorToolbox.ColorToolbar
                        className="ba br2 pa3"
                        listener={this.listener.bind(this)}
                    />
                </div>

                <div>
                    <h3 className="text-center">Text Toolbar</h3>

                    <Toolboxes.TextToolbox.TextToolbar
                        className="ba br2 pa3"
                        listener={this.listener.bind(this)}
                    />
                </div>

                <div>
                    <h3 className="text-center">Draw Toolbar</h3>

                    <Toolboxes.DrawToolbox.DrawToolbar
                        className="ba br2 pa3"
                        listener={this.listener.bind(this)}
                    />
                </div>
            </div>
        );
    }
};
import React from "react";
import { inject } from "mobx-react";

@inject("store")
export default class CameraToolbar extends React.Component {
    StartVideo(e) {
        if(!this.props.store.MediaStudioStore.videoStream && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            let _this = this;
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    let video = document.getElementById("ms-video");
                    video.srcObject = stream;
                    video.play();
                    
                    _this.props.store.MediaStudioStore.videoStream = stream;
                });
        }
    }
    StopVideo(e) {
        if(this.props.store.MediaStudioStore.videoStream) {
            this.props.store.MediaStudioStore.videoStream.getTracks().forEach(function(track) {
                track.stop();
            });

            this.props.store.MediaStudioStore.videoStream = null;
        }
    }
    CaptureVideo(e) {
        let canvas = this.props.store.MediaStudioStore.mainCanvas,
            ctx = canvas.getContext("2d");

        ctx.drawImage(document.getElementById("ms-video"), 0, 0, canvas.width, canvas.height);
    }

    listener(e, eventType, command = null) {
        this.props.listener(e, eventType, `draw.${ command }`);
    }

    render() {
        return (                
            <div className={ `${ this.props.className }` }>
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
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    ></video>
                </div>

                <div>
                    <canvas
                        id="ms-canvas"
                        width={ 500 }
                        height={ 500 }
                    ></canvas>
                </div>
            </div>
        );
    }
};
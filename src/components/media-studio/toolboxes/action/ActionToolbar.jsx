import React from "react";

import Button from "components/Button";
import Input from "components/Input";

import "./ActionToolbar.css";

export default class ActionToolbar extends React.Component {
    listener(e, eventType, command = null) {
        this.props.listener(e, eventType, `action.${ command }`);
    }

    render() {
        return (
            <div className="col">

                <div
                    className={ `btn-group ${ this.props.className }` }
                >
                    <Button
                        listener={ this.listener.bind(this) }
                        command={ `background-color` }
                        className={ `btn-outline-secondary pa3 pb2 btn-outline-success` }
                        onClick={ () => {
                            document.getElementById("input-background-color").click();
                        }}
                    >
                        <Input
                            id="input-background-color"
                            type={ "color" }
                            listener={ this.listener.bind(this) }
                            command={ `background-color` }
                            hidden
                        />
                        <i className="material-icons">color_lens</i>
                    </Button>
                    
                    <Button
                        listener={ this.listener.bind(this) }
                        command={ `text` }
                        className={ `btn-outline-secondary pa3 pb2 btn-outline-warning` }
                    >
                        <i className="material-icons">text_fields</i>
                    </Button>
                    
                    <Button
                        listener={ this.listener.bind(this) }
                        command={ `emoji` }
                        className={ `btn-outline-secondary pa3 pb2 btn-outline-danger` }
                    >
                        <span role="img" aria-label="smile">😀</span>
                    </Button>
                    
                    <Button
                        listener={ this.listener.bind(this) }
                        command={ `image` }
                        className={ `fileUpload btn-outline-secondary pa3 pb2 btn-outline-danger` }
                    >
                        <span>
                            <i className="material-icons">image</i>
                        </span>
                        <input
                            type="file"
                            id="imageLoader"
                            className="upload"
                        />
                    </Button>

                    <Button
                        listener={ this.listener.bind(this) }
                        command={ `draw` }
                        className={ `btn-outline-secondary pa3 pb2 btn-outline-danger` }
                    >
                        <i className="material-icons">brush</i>
                    </Button>

                    <Button
                        listener={ this.listener.bind(this) }
                        command={ `camera` }
                        className={ `btn-outline-secondary pa3 pb2 btn-outline-danger` }
                    >
                        <i className="material-icons">camera_alt</i>
                    </Button>
                </div>
            </div>
        );
    }
};
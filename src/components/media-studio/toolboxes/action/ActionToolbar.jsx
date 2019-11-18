import React from "react";

import "./ActionToolbar.css";

export default class ActionToolbar extends React.Component {
    listener(e, eventType, command = null) {
        this.props.listener(e, eventType, `text.${ command }`);
    }

    render() {
        //TODO  Send these to the MediaStudioStore.setCommand() on button clicks, bind/use <Button ... />
        return (
            <div className="row">
                <div className="col">
                    <div className={ `btn-group ${ this.props.className }` }>
                        <button className="btn btn-outline-secondary">
                            <input id="background-color" type="color" hidden />
                            <i class="material-icons">color_lens</i>
                        </button>
                        <button className="btn btn-outline-secondary">
                            <i class="material-icons">text_fields</i>
                        </button>
                        <button className="btn btn-outline-secondary">
                            😀
                        </button>                        
                        <div
                            class="fileUpload btn btn-outline-secondary"
                        >
                            <span>
                                <i class="material-icons">image</i>
                            </span>
                            <input
                                type="file"
                                id="imageLoader"
                                class="upload"
                            />
                        </div>
                        <button className="btn btn-outline-secondary">
                            <i class="material-icons">brush</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};
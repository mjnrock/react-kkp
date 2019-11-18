import React from "react";
import ColorToolbar from "../color/ColorToolbar";

import DrawSize from "./DrawSize";

export default class DrawToolbar extends React.Component {
    listener(e, eventType, command = null) {
        this.props.listener(e, eventType, `draw.${ command }`);
    }

    render() {
        return (                
            <div className={ `container ${ this.props.className }` }>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <ColorToolbar
                                listener={ this.listener.bind(this) }
                            />
                        </div>

                        <div className="row mt2">
                            <DrawSize
                                listener={ this.listener.bind(this) }
                                className={ `col` }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
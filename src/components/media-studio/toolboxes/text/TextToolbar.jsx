import React from "react";
import ColorToolbar from "../color/ColorToolbar";

import TextFormatting from "./TextFormatting";
import TextAlignment from "./TextAlignment";
import TextFont from "./TextFont";

export default class TextToolbar extends React.Component {
    listener(e, eventType, command) {
        this.props.listener(e, eventType, `text.${ command }`);
    }

    render() {
        return (
            <div
                className={ `container ${ this.props.className }` }
            >
                <div className="row">
                    <TextFormatting
                        listener={ this.listener.bind(this) }
                        className={ `col` }
                    />
                </div>
                <div className="row mt2">
                    <TextAlignment
                        listener={ this.listener.bind(this) }
                        className={ `col` }
                    />
                </div>
                <div className="row mt2">
                    <TextFont
                        listener={ this.listener.bind(this) }
                        className={ `col` }
                    />
                </div>
                <div className="row mt2">
                    <ColorToolbar
                        listener={ this.listener.bind(this) }
                    />
                </div>
            </div>
        );
    }
};
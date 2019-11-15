import React from "react";

import Button from "components/Button";

export default class TextFormatting extends React.Component {
    listener(e, eventType, command) {
        this.props.listener(e, eventType, `format.${ command }`);
    }

    render() {
        return (
            <div
                className={ `btn-group ${ this.props.className }` }
            >
                <Button
                    listener={ this.listener.bind(this) }
                    command={ `bold` }
                    className={ `btn-outline-secondary pa3 pb2` }
                >
                    <i className="material-icons">format_bold</i>
                </Button>
                
                <Button
                    listener={ this.listener.bind(this) }
                    command={ `italic` }
                    className={ `btn-outline-secondary pa3 pb2` }
                >
                    <i className="material-icons">format_italic</i>
                </Button>
                
                <Button
                    listener={ this.listener.bind(this) }
                    command={ `underline` }
                    className={ `btn-outline-secondary pa3 pb2` }
                >
                    <i className="material-icons">format_underlined</i>
                </Button>
                
                <Button
                    listener={ this.listener.bind(this) }
                    command={ `strikethrough` }
                    className={ `btn-outline-secondary pa3 pb2` }
                >
                    <i className="material-icons"><i className="material-icons">strikethrough_s</i></i>
                </Button>
            </div>
        );
    }
};
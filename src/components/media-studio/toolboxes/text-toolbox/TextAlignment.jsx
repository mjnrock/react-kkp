import React from "react";

import Button from "components/Button";

export default class TextAlignment extends React.Component {
    listener(e, eventType, command) {
        this.props.listener(e, eventType, `align.${ command }`);
    }

    render() {
        return (
            <div
                className={ `btn-group ${ this.props.className }` }
            >
                <Button
                    listener={ this.listener.bind(this) }
                    command={ `left` }
                    className={ `btn-outline-secondary pa3 pb2` }
                >
                    <i className="material-icons">format_align_left</i>
                </Button>
                
                <Button
                    listener={ this.listener.bind(this) }
                    command={ `center` }
                    className={ `btn-outline-secondary pa3 pb2` }
                >
                    <i className="material-icons">format_align_center</i>
                </Button>
                
                <Button
                    listener={ this.listener.bind(this) }
                    command={ `right` }
                    className={ `btn-outline-secondary pa3 pb2` }
                >
                    <i className="material-icons">format_align_right</i>
                </Button>
                
                <Button
                    listener={ this.listener.bind(this) }
                    command={ `justify` }
                    className={ `btn-outline-secondary pa3 pb2` }
                >
                    <i className="material-icons">format_align_justify</i>
                </Button>
            </div>
        );
    }
};
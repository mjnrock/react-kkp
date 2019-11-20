import React from "react";

export default class Button extends React.Component {
    handler(e) {
        let command = this.props.command !== void 0 ? this.props.command : null;

        if(e.type === "click" && typeof this.props.onClick === "function") {
            this.props.onClick(e, e.type, command, e.target);

            return;
        }
        if(e.type === "mouseover" && typeof this.props.onMouseOver === "function") {
            this.props.onMouseOver(e, e.type, command, e.target);

            return;
        }

        if(typeof this.props.listener === "function") {
            this.props.listener(e, e.type, command, e.target);
        }
    }

    render() {
        return (
            <button
                className={ `btn ${ this.props.className }` }
                command={ this.props.command }
                onClick={ this.handler.bind(this) }
            >
                {
                    this.props.children
                }
            </button>
        );
    }
};
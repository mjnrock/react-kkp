import React from "react";

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "#000"
        };
    }

    handler(e) {
        let value = e.target.value,
            command = this.props.command !== void 0 ? `${ this.props.command }:${ value }` : null;
            
        if(typeof this.props.listener === "function") {
            this.props.listener(e, e.type, command, e.target);
        }

        if(value !== void 0) {
            this.setState({
                value: value
            });
        }
    }

    render() {
        return (
            <input
                id={ this.props.id ? this.props.id : null }
                className={ `${ this.props.className }` }
                type={ this.props.type }
                command={ this.props.command }
                onChange={ this.handler.bind(this) }
                onInput={ this.handler.bind(this) }
                value={ this.state.value }
                hidden={ this.props.hidden ? true : false }
            />
        );
    }
};
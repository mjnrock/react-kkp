import React from "react";
import "./DrawToolbar.css";

export default class DrawToolbar extends React.Component {
    listener(e, eventType, command = null) {
        let prefix = this.props.commandPrefix ? `${ this.props.commandPrefix }.` : "";

        if(command) {
            this.props.listener(e, eventType, `${ prefix }${ command }`);
        } else {
            this.props.listener(e, eventType, `${ prefix }${ e.target.getAttribute("command") }:${ e.target.value }`);
        }
    }

    render() {
        return (                
            <div className={ `container ${ this.props.className }` }>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
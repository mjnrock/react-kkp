import React from "react";

export default class TextFont extends React.Component {
    listener(e, eventType, command = null) {        
        if(command) {
            this.props.listener(e, eventType, `font.${ command }`);
        } else {
            this.props.listener(e, eventType, `font.${ e.target.getAttribute("command") }:${ e.target.value }`);
        }
    }

    render() {
        return (
            <div
                className={ `mt2 ${ this.props.className }` }
            >
                <div className="col">
                    <select
                        className="ba br2 pa3 col"
                        command={ `family` }
                        onChange={ this.listener.bind(this) }
                    >
                        <option> Serif </option>
                        <option> Arial </option>
                        <option> Sans-Serif </option>                                  
                        <option> Tahoma </option>
                        <option> Verdana </option>
                        <option> Lucida Sans Unicode </option>                               
                    </select>
                </div>
            </div>
        );
    }
};
import React from "react";

//? https://casesandberg.github.io/react-color/
import { CirclePicker } from "react-color";

export default class TextFont extends React.Component {
    listener(e, eventType, command = null) {
        console.log(e);
        
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
                <select
                    className="ba br2 pa3"
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
                
                <CirclePicker
                    className="mt3"
                    command={ `color` }
                    onChangeComplete={ (e) => this.listener(e, "change", `color:${ e.hex }`) }
                />
            </div>
        );
    }
};
import React from "react";
import "./ColorToolbar.css";

//? https://casesandberg.github.io/react-color/
import { SliderPicker } from "react-color";

export default class ColorToolbar extends React.Component {
    listener(e, eventType, command = null) {
        let prefix = this.props.commandPrefix ? this.props.commandPrefix : "";

        if(command) {
            this.props.listener(e, eventType, `${ prefix }.${ command }`);
        } else {
            this.props.listener(e, eventType, `${ prefix }.${ e.target.getAttribute("command") }:${ e.target.value }`);
        }
    }

    render() {
        return (                
            <div className={ `container ${ this.props.className }` }>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <SliderPicker
                                className="ma3 col"
                                command={ `color` }
                                onChangeComplete={ (e) => this.listener(e, "change", `color:${ e.hex }`) }
                            />
                        </div>

                        <div className="row mt2">
                            <div className="col">
                                <div className="flex justify-center">
                                    {
                                        [
                                            "#FFF",
                                            "#CCC",
                                            "#888",
                                            "#555",
                                            "#000",
                                        ].map((v, i) => (
                                            <div
                                                key={ v }
                                                className="br-100 mr2"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    backgroundColor: v,
                                                    border: v === "#FFF" ? "1px solid #AAA": null
                                                }}
                                                command={ `color` }
                                                hex={ v }
                                                onClick={ (e) => this.listener(e, e.type, `color:${ e.target.getAttribute("hex") }`) }
                                            ></div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
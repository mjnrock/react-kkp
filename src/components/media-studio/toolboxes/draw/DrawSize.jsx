import React from "react";

import "./DrawSize.css";

export default class DrawSize extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slider: 50
        };
    }

    onSliderChange(e) {
        this.props.listener(e, e.type, `size:${ e.target.value }`);

        this.setState({
            slider: +e.target.value
        });
    }

    render() {
        return (
            <div className={ `${ this.props.className }`}>
                <span>{ this.state.slider || 0 }</span>
                <input type="range" min="1" max="100" value={ this.state.slider } className="col slider" onChange={ this.onSliderChange.bind(this) } />
            </div>
        );
    }
};
import React from "react";
import { inject, observer } from "mobx-react";
import TextFormatting from "./TextFormatting";
import TextAlignment from "./TextAlignment";

@inject("store")
@observer
export default class TextToolbar extends React.Component {
    listener(e, eventType, command) {
        this.props.store.MediaStudioStore.setCommand( `text.${ command }`);

        console.log(this.props.store.MediaStudioStore.getCommand());
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <TextFormatting
                        listener={ this.listener.bind(this) }
                        // className={ `col` }
                    />
                </div>
                <div className="row mt2">
                    <TextAlignment
                        listener={ this.listener.bind(this) }
                        // className={ `col` }
                    />
                </div>
            </div>
        );
    }
};
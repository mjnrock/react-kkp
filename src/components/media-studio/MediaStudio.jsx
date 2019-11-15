import React from "react";
import { inject, observer } from "mobx-react";
import Toolboxes from "./toolboxes/package";

@inject("store")
@observer
export default class MediaStudio extends React.Component {
    listener(e, eventType, command) {
        this.props.store.MediaStudioStore.setCommand(`ms.${ command }`);

        console.log(this.props.store.MediaStudioStore.getCommand());
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h3 className="text-center">Text Toolbar</h3>
                    
                    <Toolboxes.TextToolbox.TextToolbar
                        className="ba br2 pa3"
                        listener={ this.listener.bind(this) }
                    />
                </div>
            </div>
        );
    }
};
import React from "react";
import { inject, observer } from "mobx-react";
import Toolbox from "./toolbox/package";

@inject("store")
@observer
export default class MediaStudio extends React.Component {
    listener(e, eventType, command) {
        this.props.store.MediaStudioStore.setCommand(`ms.${ command }`);

        console.log(this.props.store.MediaStudioStore.getCommand());
    }

    render() {
        return (
            <div>
                <Toolbox.TextToolbar
                    listener={ this.listener.bind(this) }
                />
            </div>
        );
    }
};
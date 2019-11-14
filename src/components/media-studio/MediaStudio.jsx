import React from "react";
import { inject, observer } from "mobx-react";
import Toolbox from "./toolbox/package";

@inject("store")
@observer
export default class MediaStudio extends React.Component {
    render() {
        return (
            <div>
                <Toolbox.TextToolbar />
            </div>
        );
    }
};
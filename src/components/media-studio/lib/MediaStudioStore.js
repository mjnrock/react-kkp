import { action, observable } from "mobx";

class MediaStudioStore {
    @observable mainCanvas;
    @observable videoStream;
    @observable command;
    @observable isDirty = false;

    @action
    setCommand = (command) => {
        this.command = command;
        this.isDirty = true;
    }

    getCommand = () => {
        if(this.isDirty) {
            this.isDirty = false;

            return this.command;
        }

        return false;
    }
}

export default new MediaStudioStore();
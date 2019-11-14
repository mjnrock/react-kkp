import { action, observable } from "mobx";

class DifferentStore {
    @observable text = "yeah!"

    @action
    setText = (text) => {
        this.text = text;
    };
}

export default new DifferentStore();
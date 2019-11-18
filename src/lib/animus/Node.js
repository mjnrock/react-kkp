import AState from "./AState";

//@data <any>: Content data of the <Node>
//@next <int|fn>: How to determine if <Node> should progress (duration or by fn() === true)
//@state? <obj>: Any other data to put in node
export default class Node extends AState {
    constructor(data, next, state = {}) {
        super({
            ...state,
            next,
            data
        });
    }

    getNext() {
        return this.getState().next;
    }

    getDatum(key) {
        return this.getState().data[ key ];
    }
    setDatum(key, value) {
        let data = this.getState().data;

        data[ key ] = value;

        this.prop("data", data);

        return this;
    }
    
    setData(data) {
        this.prop("data", data);

        return this;
    }
}
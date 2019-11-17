import AState from "./AState";

//@data <any>: Content data of the <Frame>
//@next <int|fn>: How to determine if <Frame> should progress (duration or by fn() === true)
//@state? <obj>: Any other data to put in frame
export default class Frame extends AState {
    constructor(data, next, state = {}) {
        super({
            ...state,
            next,
            data
        });
    }

    getNext() {
        return this._getState().next;
    }

    getDatum(key) {
        return this._getState().data[ key ];
    }
    setDatum(key, value) {
        let data = this._getState().data;

        data[ key ] = value;

        this._prop("data", data);

        return this;
    }
    
    setData(data) {
        this._prop("data", data);

        return this;
    }
}
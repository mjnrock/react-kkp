import AState from "./AState";

export default class AEvents extends AState {
    constructor(events = {}, state = {}) {
        super(state);

        this._events = events;

        if("init" in this._events) {
            this._trigger("init");
        }
    }

    _on(name, handler) {
        this._events[ name ] = handler;

        return this;
    }
    _off(name) {
        delete this._events[ name ];

        return this;
    }

    _has(name) {
        return !!this._events[ name ];
    }
    _trigger(name, ...args) {
        let fn = this._events[ name ];

        if(typeof fn === "function") {
            return fn(name, this, this._getState(), ...args);
        }

        return null;
    }
}
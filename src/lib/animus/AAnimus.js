import AState from "./AState";

export default class AAnimus extends AState {
    constructor(events = {}, state = {}) {
        super(state);

        this._events = events;
        this._listeners = {};

        if("init" in this._events) {
            this._trigger("init");
        }
    }

    _listen(name, listener) {
        if(!Array.isArray(this._listeners[ name ])) {
            this._listeners[ name ] = [];
        }

        this._listeners[ name ].push(listener);

        return this;
    }
    _unlisten(name, listener) {
        if(Array.isArray(this._listeners[ name ])) {
            for(let i in this._listeners[ name ]) {
                let list = this._listeners[ name ][ i ];

                if(list.toString() === listener.toString()) {
                    this._listeners[ name ].splice(i, 1);
                }
            }
        }

        return this;
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
            let result = fn(name, this, this._getState(), ...args);

            for(let i in this._listeners[ name ]) {
                let listener = this._listeners[ name ][ i ];

                if(typeof listener === "function") {
                    listener(this, result);
                }
            }

            return result;
        }

        return null;
    }
}
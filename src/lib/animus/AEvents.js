import AState from "./AState";

export default class AEvents extends AState {
    constructor(events = {}, state = {}) {
        super(state);

        this._events = events;
        this._subscribers = {};

        if("init" in this._events) {
            this._trigger("init");
        }
    }

    _subscribe(name, listener) {
        if(!Array.isArray(this._subscribers[ name ])) {
            this._subscribers[ name ] = [];
        }

        this._subscribers[ name ].push(listener);

        return this;
    }
    _unsubscribe(name, listener) {
        if(Array.isArray(this._subscribers[ name ])) {
            for(let i in this._subscribers[ name ]) {
                let list = this._subscribers[ name ][ i ];

                if(list.toString() === listener.toString()) {
                    this._subscribers[ name ].splice(i, 1);
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

            for(let i in this._subscribers[ name ]) {
                let listener = this._subscribers[ name ][ i ];

                if(typeof listener === "function") {
                    listener(this, result);
                }
            }

            return result;
        }

        return null;
    }
}
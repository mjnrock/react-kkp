import AState from "./AState";

export default class AAnimus extends AState {
    constructor(events = {}, state = {}) {
        super(state);

        this.events = events;
        this.listeners = {};

        if("init" in this.events) {
            this.trigger("init");
        }
    }

    listen(name, listener) {
        if(!Array.isArray(this.listeners[ name ])) {
            this.listeners[ name ] = [];
        }

        this.listeners[ name ].push(listener);

        return this;
    }
    unlisten(name, listener) {
        if(Array.isArray(this.listeners[ name ])) {
            for(let i in this.listeners[ name ]) {
                let list = this.listeners[ name ][ i ];

                if(list.toString() === listener.toString()) {
                    this.listeners[ name ].splice(i, 1);
                }
            }
        }

        return this;
    }

    on(name, handler) {
        this.events[ name ] = handler;

        return this;
    }
    off(name) {
        delete this.events[ name ];

        return this;
    }

    has(name) {
        return !!this.events[ name ];
    }
    trigger(name, ...args) {
        let fn = this.events[ name ];

        if(typeof fn === "function") {
            let result = fn(name, this, this.getState(), ...args);

            for(let i in this.listeners[ name ]) {
                let listener = this.listeners[ name ][ i ];

                if(typeof listener === "function") {
                    listener(this, result);
                }
            }

            return result;
        }

        return null;
    }
}
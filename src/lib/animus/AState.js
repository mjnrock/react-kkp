export default class AState {
    constructor(state = {}) {
        this._state = state;
    }

    _getState() {
        return this._state;
    }
    _setState(state = {}) {
        this._state = state;

        return this;
    }

    _hasProp(key) {
        return this._state[ key ] !== void 0;
    }
    _prop(key, value) {
        if(value === void 0) {
            return this._state[ key ];
        } else {
            this._state[ key ] = value;
        }

        return this;
    }
}
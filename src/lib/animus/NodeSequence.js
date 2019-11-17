import AEvents from "./AEvents";
import Node from "./Node";

export default class NodeSequence extends AEvents {
    constructor(frames = []) {
        super();

        this._setState({
            index: 0,
            ticks: 0,
            start: Date.now(),
            previous: null,
            repeat: true
        });
        
        this._on("next", (name, scope, state, ...args) => {
            let frame = scope.GetNode(state.index),
                next = frame.getNext();
            
            scope._prop("ticks", +state.ticks + 1);

            let index = state.index;

            if(index + 1 >= scope.Nodes.length) {
                index = 0;
            } else {
                ++index;
            }
    
            if(typeof next === "number") {
                if(Date.now() >= state.previous + next) {
                    scope._prop("index", index);
                    scope._prop("previous", Date.now());

                    return true;
                }
            } else if(typeof next === "function") {
                if(next(frame, frame._getState().data, scope, ...args) === true) {
                    scope._prop("index", index);
                    scope._prop("previous", Date.now());

                    return true;
                }
            }

            return false;
        });

        this.Nodes = [];
        for(let i in frames) {
            let frame = frames[ i ];

            if(frame instanceof Node) {
                this.Nodes.push(frame);
            } else if(Array.isArray(frame)) {
                let [ data, next, state ] = frame;

                this.Nodes.push(new Node(data, next, state));
            }
        }
    }

    GetNode(index = 0) {
        return this.Nodes[ index ];
    }
    SetNode(index, frame) {
        this.Nodes[ index ] = frame;

        return this;
    }
    AddNode(frame) {
        this.Nodes.push(frame);

        return this;
    }

    Start() {
        this.meta.start = Date.now();
        this.meta.isPlaying = true;

        return this;
    }
    Stop() {
        this.meta.isPlaying = false;

        return this;
    }
    Reset() {
        this.Stop();

        this.meta.index = 0;

        return this;
    }
}
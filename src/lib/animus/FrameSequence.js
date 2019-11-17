import AEvents from "./AEvents";
import Frame from "./Frame";

export default class FrameSequence extends AEvents {
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
            let frame = scope.GetFrame(state.index),
                next = frame.getNext();

            let index = state.index;

            if(index + 1 >= scope.Frames.length) {
                index = 0;
            } else {
                ++index;
            }
    
            if(typeof next === "number") {
                if(Date.now() >= state.previous + next) {
                    scope._prop("index", index);
                    scope._prop("previous", Date.now());
                }
            } else if(typeof next === "function") {
                if(next(frame, frame._getState().data, scope, ...args) === true) {
                    scope._prop("index", index);
                    scope._prop("previous", Date.now());
                }
            }
            
            scope._prop("ticks", +state.ticks + 1);

            console.log(state);
        });

        this.Frames = [];
        for(let i in frames) {
            let frame = frames[ i ];

            if(frame instanceof Frame) {
                this.Frames.push(frame);
            } else if(Array.isArray(frame)) {
                let [ data, next, state ] = frame;

                this.Frames.push(new Frame(data, next, state));
            }
        }
    }

    GetFrame(index = 0) {
        return this.Frames[ index ];
    }
    SetFrame(index, frame) {
        this.Frames[ index ] = frame;

        return this;
    }
    AddFrame(frame) {
        this.Frames.push(frame);

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
import Sequencer from "./Sequencer";

export default class RenderCanvas extends Sequencer {
    constructor(htmlCanvas, frames = [], fps = 5) {
        super(frames);

        this.Canvas = htmlCanvas;
        this.Loop = null;

        this._prop("fps", fps);
        this._listen("next", this.nextListener.bind(this));
    }

    Start(fps = 5) {
        this._prop("fps", fps);
        this.Loop = setInterval(() => {
            this._trigger("next");
        }, 1000 / fps);

        return this;
    }
    Stop() {
        clearInterval(this.Loop);

        return this;
    }

    nextListener(target, result) {
        if(result === true) {
            this.Draw(target);
        }
    }

    Draw(target) {
        if(this.Canvas) {
            let ctx = this.Canvas.getContext("2d");
            ctx.font = "64pt Arial";

            ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
            ctx.fillText(
                target.GetActiveNode()._prop("data"),
                Math.random() * 500,
                Math.random() * 500
            );
        }
    }
};
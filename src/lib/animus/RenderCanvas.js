import Sequencer from "./Sequencer";

export default class RenderCanvas extends Sequencer {
    constructor(htmlCanvas, frames = []) {
        super(frames);

        this.Canvas = htmlCanvas;

        this._listen("next", this.nextListener.bind(this));
    }

    nextListener(target, result) {
        if(result === true) {
            this.Draw(target);
        }
    }

    Draw(target) {
        if(this.Canvas) {
            let ctx = this.Canvas.getContext("2d");
            ctx.font = "30px Arial";

            ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
            ctx.fillText(
                target.GetActiveNode()._prop("data"),
                Math.random() * 500,
                Math.random() * 500
            );
        }
    }
};
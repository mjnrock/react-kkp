import Sequencer from "../Sequencer";

export default class RenderCanvasImage extends Sequencer {
    constructor(htmlCanvas, nodes = [], fps = 5) {
        super(nodes);

        this.Canvas = htmlCanvas;
        this.Loop = null;

        this.prop("fps", fps);
        this.listen("next", this.drawListener.bind(this));
    }

    Start(fps = 5) {
        this.prop("index", 0);
        this.prop("fps", fps);
        this.Loop = setInterval(() => {
            this.trigger("next");
        }, 1000 / fps);

        return this;
    }
    Stop() {
        clearInterval(this.Loop);

        return this;
    }

    drawListener(target, result) {
        if(result === true) {
            this.Draw(target);
        }
    }
    Draw(target) {
        if(this.Canvas) {
            let ctx = this.Canvas.getContext("2d");
            
            // console.log(target.GetActiveNode());

            ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
            // console.log(target.GetActiveNode().getDatum("image"))
            ctx.drawImage(
                target.GetActiveNode().getDatum("image"),
                0,
                0
            );
        }
    }
};
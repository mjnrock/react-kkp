import Node from "./Node";

export default class TimeNode extends Node {
    constructor(data, duration = 1000, state = {}) {
        super(data, state);

        this.prop("_duration", duration);
        this.prop("_start", null);
        this.prop("_end", null);

        this.on("node:run", (target, state, time) => {
            if(this.prop("_start") === null) {
                this.Run();

                return -1;
            }

            if(time === null || time === void 0) {
                time = Date.now();
            }
            
            if(this.prop("_start") && (time >= this.prop("_start") + this.prop("_duration"))) {
                // console.log(this.uuid, "<< NODE COMPLETE >>");
                this.trigger("node:complete");
                
                return true;
            } else {
                // console.log(this.uuid, "<< NODE PERSIST >>");
                this.trigger("node:persist");

                return false;
            }
        });
        this.on("node:complete", () => {
            this.prop("_end", Date.now());

            return this.prop("_end");
        });
    }

    Run() {
        let start = this.prop("_start"),
            end = this.prop("_end");

        if(start === null || (start !== null && end !== null)) {
            this.prop("_start", Date.now());
            this.prop("_end", null);
        }

        this.trigger("node:run");

        return this;
    }
    Query() {
        return this.trigger("node:run");
    }
}
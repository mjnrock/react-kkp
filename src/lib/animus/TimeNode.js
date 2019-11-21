import Node from "./Node";

export default class TimeNode extends Node {
    constructor(data, duration = 1000, state = {}) {
        super(data, state);

        this.prop("_duration", duration);
        this.prop("_start", null);
        this.prop("_end", null);

        this.on("node:run", (target, state, time) => {
            if(time === null || time === void 0) {
                time = Date.now();
            }
            
            if(this.prop("_start") && (time >= this.prop("_start") + this.prop("_duration"))) {
                this.trigger("node:complete");
                
                return true;
            } else {
                this.trigger("node:persit");

                return false;
            }
        });
        this.on("node:complete", () => {
            this.prop("_end", Date.now());

            return this.prop("_end");
        });
    }

    Run() {
        this.prop("_start", Date.now());
        this.prop("_end", null);

        this.trigger("node:run");

        return this;
    }
    Query() {
        return this.trigger("node:run");
    }
}
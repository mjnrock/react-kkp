import AAnimus from "./AAnimus";
import Node from "./Node";

export default class Sequencer extends AAnimus {
    constructor(nodes = [], options = {}) {
        super();

        this.setState({
            index: 0,
            start: Date.now(),
            previous: null,
            repeat: typeof options.repeat === "boolean" ? options.repeat : false,
            hooks: {}
        });

        

        this.Nodes = [];
        for(let i in nodes) {
            let node = nodes[ i ];

            if(node instanceof Node) {
                this.Nodes.push(node);
            } else if(Array.isArray(node)) {
                let [ data, next, state ] = node;

                this.Nodes.push(new Node(data, next, state));
            }
        }



        
        this.on("init", (target, state, ...args) => {
            this.prop("index", 0);

            let hook = this.prop("hooks")[ "init" ];

            if(typeof hook === "function") {
                hook([ this, target, state ], ...args);
            }
        });
        this.on("next", (target, state, ...args) => {
            let hook = this.prop("hooks")[ "next" ];

            if(typeof hook === "function") {
                let result = hook([ this, target, state ], ...args);

                if(result) {
                    this.trigger("complete");
                } else {
                    this.trigger("persist");
                }
            } else {
                this.trigger("complete");
            }
        });
        this.on("persist", (target, state, ...args) => {
            let hook = this.prop("hooks")[ "persist" ];

            if(typeof hook === "function") {
                hook([ this, target, state ], ...args);
            }
        });
        this.on("complete", (target, state, ...args) => {
            let index = this.prop("index"),
                hook = this.prop("hooks")[ "complete" ];

            if(typeof hook === "function") {
                hook([ this, target, state ], ...args);
            }

            if(index < this.Size(true)) {
                index += 1;
            } else {
                if(this.prop("repeat")) {
                    index = 0;
                }
            }

            this.prop("index", index);
        });
    }

    Size(zeroIndexed = false) {
        if(zeroIndexed) {
            return this.Nodes.length - 1;
        }

        return this.Nodes.length;
    }

    GetHooks() {
        return this.prop("hooks");
    }
    SetHooks(hooks = {}) {
        this.prop("hooks", hooks);

        return this;
    }

    GetHook(key) {
        return this.prop("hooks")[ key ];
    }
    SetHook(key, value) {
        let hooks = this.prop("hooks");

        hooks[ key ] = value;
        this.SetHooks(hooks);

        return this;
    }

    GetActiveNode() {
        return this.Nodes[ this.prop("index") ];
    }
    GetNode(index = 0) {
        return this.Nodes[ index ];
    }
    SetNode(index, node) {
        this.Nodes[ index ] = node;

        return this;
    }
    AddNode(node) {
        this.Nodes.push(node);

        return this;
    }

    // Start() {
    //     this.meta.start = Date.now();
    //     this.meta.isPlaying = true;

    //     return this;
    // }
    // Stop() {
    //     this.meta.isPlaying = false;

    //     return this;
    // }
    // Reset() {
    //     this.Stop();

    //     this.meta.index = 0;

    //     return this;
    // }
}
import AAnimus from "./AAnimus";
import Node from "./Node";

export default class Sequencer extends AAnimus {
    constructor(nodes = [], options = {}) {
        super();

        this.setState({
            index: 0,
            start: null,
            end: null,
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



        
        this.on("start", (target, state, ...args) => {
            this.prop("index", 0);
            this.prop("start", Date.now());
            this.prop("end", null);

            let hook = this.prop("hooks")[ "start" ];

            if(typeof hook === "function") {
                hook([ this, target, state ], ...args);
            }
        });
        this.on("end", (target, state, ...args) => {
            this.prop("end", Date.now());

            let hook = this.prop("hooks")[ "end" ];

            if(typeof hook === "function") {
                hook([ this, target, state ], ...args);
            }

            if(this.prop("repeat")) {
                this.prop("index", 0);

                this.trigger("start");
            }
        });
        this.on("next", (target, state, ...args) => {
            let hook = this.prop("hooks")[ "next" ];

            if(this.prop("end") === null) {
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
            } else {
                console.info("[Operation Aborted]: Sequence has ended");
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
                this.trigger("end");
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

    SetRepeat(bool = false) {
        this.prop("repeat", !!bool);

        return this;
    }
    ToggleRepeat() {
        this.prop("repeat", !!!this.prop("repeat"));

        return this;
    }

    Start() {
        this.trigger("start");

        return this;
    }
    End() {
        this.trigger("end");

        return this;
    }
    // Reset() {
    //     this.Stop();

    //     this.meta.index = 0;

    //     return this;
    // }
}
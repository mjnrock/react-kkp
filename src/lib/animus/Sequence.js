import AAnimus from "./AAnimus";
import Node from "./Node";
import TimeNode from "./TimeNode";

export default class Sequence extends AAnimus {
    constructor(nodes = [], options = {}) {
        super();

        this.Nodes = [];
        this.setNodes(nodes);

        this.prop("repeat", typeof options.repeat === "boolean" ? options.repeat : false);

        this.on("sequence:start", (target, state, ...args) => {
            this.prop("_index", -1);
            this.prop("_start", Date.now());
            this.prop("_end", null);

            this.Next(...args);
        });
        this.on("sequence:run", (target, state, ...args) => {
            let node = this.GetActiveNode();
            
            console.log(this.prop("_index"), this.Nodes);

            node.Run();
        });
        this.on("sequence:next", (target, state, ...args) => {
            let index = this.prop("_index");

            if(index === -1) {
                this.prop("_index", 0);
                
                this.Run();
            } else if((index + 1) < this.Size()) {
                this.prop("_index", index + 1);
                
                this.Run();
            } else if(index >= this.Size() - 1 && this.IsRepeating()) {
                this.prop("_index", 0);
                
                this.Run();
            }
        });
        this.on("sequence:end", (target, state, ...args) => {
            this.prop("_end", Date.now());
        });


        //@result:  The returned value from "node:run", if any
        this.on("sequence:listener::node:run", (node, result) => {
            //NOOP
            console.log("<< HEARD: NODE RUN >>");
        });
        this.on("sequence:listener::node:persist", (node, result) => {
            console.log("<< HEARD: NODE PERSIST >>");
            setTimeout(() => this.Run(), 100);
            // this.Run();
        });
        this.on("sequence:listener::node:complete", (node, result) => {
            console.log("<< HEARD: NODE COMPLETE >>");
            setTimeout(() => this.Next(), 100);
            // this.Next();
        });

        this.on("sequence:addNode", (target, state, node) => {
            node.listen("node:run", this.get("sequence:listener::node:run"));
            node.listen("node:persist", this.get("sequence:listener::node:persist"));
            node.listen("node:complete", this.get("sequence:listener::node:complete"));
        });
        this.on("sequence:removeNode", (target, state, node) => {
            node.unlisten("node:run");
            node.unlisten("node:persist");
            node.unlisten("node:complete");
        });

    }

    setNodes(nodes = []) {
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
        
        return this;
    }

    Size(zeroIndexed = false) {
        if(zeroIndexed) {
            return this.Nodes.length - 1;
        }

        return this.Nodes.length;
    }

    GetActiveNode() {
        return this.Nodes[ this.prop("_index") ];
    }
    GetNode(index = 0) {
        return this.Nodes[ index ];
    }
    SetNode(index, node) {
        this.Nodes[ index ] = node;

        this.trigger("sequence:addNode", node);

        return this;
    }
    AddNode(node) {
        this.Nodes.push(node);
        
        this.trigger("sequence:addNode", node);

        return this;
    }
    RemoveNode(index) {
        let [ node ] = this.Nodes.splice(index, 1);

        this.trigger("sequence:removeNode", node);

        return this;
    }

    IsRepeating() {
        return this.prop("repeat");
    }
    SetRepeat(bool = false) {
        this.prop("repeat", !!bool);

        return this;
    }
    ToggleRepeat() {
        this.prop("repeat", !!!this.prop("repeat"));

        return this;
    }

    Start(...args) {
        this.trigger("sequence:start", ...args);

        return this;
    }
    Run(...args) {
        this.trigger("sequence:run", ...args);
    }
    Next(...args) {
        this.trigger("sequence:next", ...args);
    }
    End(...args) {
        this.trigger("sequence:end", ...args);

        return this;
    }
}
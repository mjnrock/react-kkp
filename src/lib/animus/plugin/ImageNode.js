import Node from "./../Node";

export default class ImageNode extends Node {
    constructor(uri, next, state = {}) {
        super({}, next, state);

        // this.on("image", () => console.log("Loaded"));

        let _img = new Image();
        _img.onload = function() {
            this.prop("data", {
                image: _img,
                uri: uri
            });
            this.prop("next", () => true);
            console.log("Loaded");
        }
        _img.src = uri;
    }
}
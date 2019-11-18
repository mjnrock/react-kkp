import Node from "./../Node";

export default class ImageNode extends Node {
    constructor(uri, next, state = {}) {
        super({}, next, state);

        let _img = new Image();
        _img.onload = function() {
            this.prop("data", {
                image: _img,
                uri: uri
            });
            this.prop("next", () => true);
        }.bind(this);
        _img.src = uri;
    }
}
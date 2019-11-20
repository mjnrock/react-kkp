import { fabric } from "fabric";

//?  This is designed for FabricJS canvas
export default class FabricHelper {
    static ProcessCommand(canvas, command) {
        if(canvas && command !== false) {
            let cmds = command.split(".");
    
            if(cmds.length === 3) {
                let [ module, action, focus ] = cmds,
                    [ target, value ] = focus.split(":");
    
                if(action === "action") {
                    if(target === "background-color") {
                        FabricHelper.SetBackgroundColor(canvas, value);
                    } else if(target === "text") {
                        FabricHelper.AddTextNode(canvas, value);
                    }
                } 
            }
        }
    }

    static SetBackgroundColor(canvas, color) {
        if(canvas) {
            canvas.set({
                backgroundColor: color
            });
    
            canvas.renderAll();
        }
    }

    
    static AddTextNode(canvas, value = null) {
        if(canvas) {
            if(value === null) {
                let items = [
                    "Puppies",
                    "Kitters",
                ];
                
                value = items[ Math.floor(Math.random() * items.length) ];
            }

            let text = new fabric.Textbox(value, {
                fill: "#000"
            });
            
            canvas.add(text);
        }
    }
}
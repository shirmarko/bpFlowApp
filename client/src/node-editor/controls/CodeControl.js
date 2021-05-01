import Rete from "rete";

export class CodeControl extends Rete.Control {
    constructor(key) {
        super(key);
        this.render = "js";
        this.key = key;
    }

    handler(el, editor) {
        var btn = document.createElement("button");
        el.appendChild(btn);
        btn.innerHTML = "EDIT CODE";
        let text = "enter your code here";
        const node = this.getNode();
        const key = this.key;

        btn.onclick = function () {
            text = prompt("your code:", text);
            node.data[key] = text;
            // return false;
        };

        //   var text = this.getData(this.key) || "";
        this.putData(this.key, text);

        //   input.value = text;
        //   input.addEventListener("change", () => {
        //     this.putData(this.key, text);
        //   });
    }
}
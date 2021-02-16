var numSocket = new Rete.Socket('Number value');
import CustomNode from "../customNodes/CustomNode";

class NumComponent extends Rete.Component {

    constructor(){
        super("Number");
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", numSocket);
        node.data.isBasic = true;
        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}

module.exports = NumComponent;
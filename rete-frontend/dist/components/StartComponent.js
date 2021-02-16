import CustomStartNode from "../customNodes/CustomStartNode";
const bsyncSocket = new Rete.Socket("BSync");

class StartComponent extends Rete.Component {
    constructor() {
        super("Start");
        this.data.component = CustomStartNode;
    }

    builder(node) {
        var out = new Rete.Output('output', "Output", bsyncSocket);

        node.data.isBasic = true;
        return node
            .addOutput(out)
    }

    worker(node, inputs, outputs) {

    }
}

export default StartComponent;

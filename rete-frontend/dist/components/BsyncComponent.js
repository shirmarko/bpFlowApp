import CustomBSyncNode from "../customNodes/CustomBSyncNode";
const bsyncSocket = new Rete.Socket("BSync");

class BsyncComponent extends Rete.Component {
    constructor(){
        super("Bync");
        this.data.component = CustomBSyncNode;
    }
  
    builder(node) {
        var inp = new Rete.Input('input',"Input", bsyncSocket);
        var out = new Rete.Output('output', "Output", bsyncSocket);
  
        node.data.isBasic = true;
        return node
            .addInput(inp)
            .addOutput(out)
            .addControl(new InputControl('request'))
            .addControl(new InputControl('wait'))
            .addControl(new InputControl('block'))
            //.addControl(new TextControl(this.editor, 'Block'))
    }
  
    worker(node, inputs, outputs) {
  
    }
  }

module.exports = BsyncComponent;

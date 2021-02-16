var numSocket = new Rete.Socket('Number value');
import CustomNode from "../customNodes/CustomNode";

class AddComponent extends Rete.Component {
    constructor(){
        super("Add");
        this.data.component = CustomNode;
    }

    builder(node) {
        var inp1 = new Rete.Input('num',"Number", numSocket);
        var inp2 = new Rete.Input('num2', "Number2", numSocket);
        var out = new Rete.Output('num', "Number", numSocket);

        inp1.addControl(new NumControl(this.editor, 'num'))
        inp2.addControl(new NumControl(this.editor, 'num2'))
        node.data.isBasic = true;
        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 + n2;
        var curNode = this.editor.nodes.find(n => n.id == node.id);
        curNode.controls.get('preview').setValue(sum);
        curNode.data.isBasic = false;
        curNode.update();
        outputs['num'] = sum;
        //document.getElementById(node.id).className = 'node1'; 
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 + n2;
        var curNode = this.editor.nodes.find(n => n.id == node.id);
        curNode.controls.get('preview').setValue(sum);
        curNode.data.isBasic = false;
        curNode.update();
        outputs['num'] = sum;
        //document.getElementById(node.id).className = 'node1'; 
    }
}

module.exports = AddComponent;

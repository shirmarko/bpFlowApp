//bp.registerBThread("any", function(){
//    while(true){
//        selectedEvent =  bp.sync({waitFor:bp.all});
//        //nodesLists["payloads"] = {};
//        bp.log.info("Selected Event " + selectedEvent + "name = " + selectedEvent.name);
//    }
//});

function goToFollowers(curNode, ths, bp, payloads) {
    bp.log.info("curnode = {0} payloads = {1}", curNode.id, payloads);
    const outputs = curNode.outputs;
    bp.log.info("outputs = " + outputs);
    if(outputs.size() > 0){
        let isFirstFound = false;
        let firstOutputNode;
        let firstOutputPayload;
        let firstBP;
        const outputsKeys = outputs.keySet().toArray();
        for(var i in outputsKeys){
            if(outputs.get(outputsKeys[i]).size() > 0  && payloads.hasOwnProperty(outputsKeys[i])){ //check if this output have connected nodes
                let j = 0;
                if(!isFirstFound){
                    j = 1;
                    firstOutputNode = allNodesMap.get(outputs.get(outputsKeys[i]).get(0));
                    firstOutputPayload = payloads[outputsKeys[i]];
                    firstBP = bp;
                }
                for (;j < outputs.get(outputsKeys[i]).size(); j++) {
                    runInNewBT(allNodesMap.get(outputs.get(outputsKeys[i]).get(j)), payloads[outputsKeys[i]] );
                }
                isFirstFound = true;
            }
        }
        if(isFirstFound){
            runInSameBT(firstOutputNode, firstOutputPayload, ths, firstBP);
        }
    }
}

function runInNewBT(curNode, payload) {
    bp.log.info("in runInNewBT@@@@@@@@ - {0} :{1}", curNode.id, payload);
	//var context = JSON.parse(JSON.stringify(payload));
	var context = Object.assign({}, payload);
	bp.log.info("context - {0}", context);
	bp.registerBThread(curNode.id, function() {
		eval("var f=f" + curNode.id);
        //bp.log.info("curNode.id - " + curNode.id);
		const payloads = f(context, this, bp, nodesLists, selectedEvent);

		let curPayloadsMap = nodesLists["payloads"];
		let oldValue = curPayloadsMap.putIfAbsent(curNode.id, context);
		if(oldValue != null){
            curPayloadsMap.replace(curNode.id, oldValue, context);
		}
		bp.log.info("payloads: {0}", payloads);
        goToFollowers(curNode, this, bp, payloads);
	});
}

function runInSameBT(curNode, payload, ths, bp) {
    bp.log.info("in runInSameBT!!!! - {0} : {1}", curNode.id, payload);
    
	eval("var f=f" + curNode.id);

	const payloads = f(payload, ths, bp, nodesLists, selectedEvent);
    let curPayloadsMap = nodesLists["payloads"];
    let oldValue = curPayloadsMap.putIfAbsent(curNode.id, payload);
    if(oldValue != null){
        curPayloadsMap.replace(curNode.id, oldValue, payload);
    }
    goToFollowers(curNode, ths, bp, payloads);

}

//Main:
const allNodesArr = model.getNodes().values().toArray();
const allNodesMap = model.getNodes();

let nodesLists = {};
nodesLists["active"] = activeNodes;
nodesLists["reqnotblocked"] = {};
nodesLists["blocked"] = {};
nodesLists["isDone"] = false;
nodesLists["payloads"] = payloadsMap;
//let selectedEvent;

bp.log.info("activeNodes = {0}", activeNodes);
bp.log.info("nodesLists[active] = {0}", nodesLists["active"]);

var startNodes = [];
for(var i in allNodesArr){
    if(allNodesArr[i].type == "Start"){
        startNodes.push(allNodesArr[i]);
    }
}
for(var i in startNodes){
    //runInNewBT(startNodes[i], {});
    let curNode = startNodes[i];
    nodesLists["payloads"][curNode.id] = {};
	bp.registerBThread(curNode.id, function() {
		eval("var f=f" + curNode.id);
		let payloads = f({}, this, bp, nodesLists, selectedEvent);
        let payload = payloads["Output"];
        if(Array.isArray(payload)){
            bp.log.info("arr size = " + payload.length);
            for(let i = 0; i < payload.length; i++){
                let j = i;
                bp.registerBThread(`${curNode.id}.${j}`, function() {
                    goToFollowers(curNode, this, bp, {"Output": payload[j]});
                });
            }
        }
        else{
            goToFollowers(curNode, this, bp, payloads);
        }
	});
}

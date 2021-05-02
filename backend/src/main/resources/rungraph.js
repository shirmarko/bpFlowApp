/* global bp */

//function SubmissionAddedAll() {
//	return bp.EventSet( "SubmissionAddedAll", function(ev){
//		  var e = JSON.parse(ev.name);
//		  return e.name == "SubmissionAdded";
//		});
//}
//
//function SubmissionAdded(id) {
//	return bp.EventSet( "SubmissionAddedAll", function(ev){
//		  var e = JSON.parse(ev.name);
//		  return e.name == "SubmissionAdded" && e.courseId == id;
//		});
//}


function goToFollowers(curNode, payload, ths, bp) {
    const outputs = curNode.outputs;
    if(outputs.size() > 0){
        //bp.log.info(curNode.id + " goToFollowers, size > 0");
        runInSameBT(allNodesMap.get(outputs.get(0)), payload, ths, bp);

        for (var i = 1; i < outputs.size(); i++) {
            runInNewBT(allNodesMap.get(outputs.get(i)), payload );
        }
    }
}

function runInNewBT(curNode, payload) {
	// Cloning - Is this the right way?
	var context = JSON.parse(JSON.stringify(payload));

	bp.registerBThread(curNode.id, function() {
		eval("var f=f" + curNode.id);

		f(context, this, bp);

		goToFollowers(curNode, context, this, bp);
	});
};

function runInSameBT(c, payload, ths, bp) {
	eval("var f=f" + c.id);

	f(payload, ths, bp);

	goToFollowers(c, payload, ths, bp);
};

//bp.log.info("log test!!!");
//bp.log.info(model);
//bp.log.info(model.getNodes().values());

const allNodesArr = model.getNodes().values().toArray();
const allNodesMap = model.getNodes();
bp.log.info("allNodesArr:" + allNodesArr);
bp.log.info("allNodesMap:" + allNodesMap);

var startNodes = [];
for(var i in allNodesArr){
    bp.log.info("allNodesArr[i]:" + allNodesArr[i]);
    if(allNodesArr[i].type == "Start"){
        //bp.log.info("start" + allNodesArr[i].id);
        startNodes.push(allNodesArr[i]);
    }
}
bp.log.info("startNodes:" + startNodes);
for(var i in startNodes){
    runInNewBT(startNodes[i], {});
}

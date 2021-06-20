
<template>
  <div id="rete" v-show="visible" ref="rete">
    <div>
        <Navbar v-bind:myButtonsVisibility="buttonsVisibility" />
        <ModalChooseExmple/>
        <console v-bind:log="logContent"/>
    </div>
  </div>
</template>

<script>
import {
  init,
} from "../node-editor/index";
import Navbar from "./Navbar.vue";
import ModalChooseExmple from "./ModalChooseExmple.vue";
import Console from "./Console.vue";


export default {
  data() {
    return {
      visible: true,
      logContent: [],
      buttonsVisibility: {
        isStepDisabled: true,
        isStopDisabled: true,
        isDebugDisabled: false,
        isRunDisabled: false
      }
    };
  },
  components: {
    Navbar,
    ModalChooseExmple,
    Console
  },
  mounted() {
    init(this.$refs.rete, this.logContent, this.buttonsVisibility);
  },
};
</script>

<style>
#rete {
  width: 100%;
  height: 100%;
}

.node .control input,
.node .input-control input,
.selectedNode .control input,
.selectedNode .input-control input,
.activeNode .control input,
.activeNode .input-control input,
.blockedNode .control input,
.blockedNode .input-control input {
  width: 140px;
}
select,
input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
.runButton {
  background: #64caa9;
  border: 1px solid #000000;
  border-radius: 11px;
  padding: 7px 41px;
  color: #ffffff;
  display: inline-block;
  font: normal bold 23px/1 "Open Sans", sans-serif;
  text-align: center;
}
.runButton:hover {
  background: #76daba;
}
.debugButton {
  background: #f6b26b;
  border: 1px solid #000000;
  border-radius: 11px;
  padding: 7px 33px;
  color: #ffffff;
  display: inline-block;
  font: normal bold 23px/1 "Open Sans", sans-serif;
  text-align: center;
}
.debugButton:hover {
  background: #ecc69e;
}
.node {
  background: rgba(158, 161, 159, 0.8);
  border: 2px solid rgb(65, 67, 68);
  border-radius: 10px;
  cursor: pointer;
  min-width: 180px;
  height: auto;
  padding-bottom: 6px;
  box-sizing: content-box;
  position: relative;
  user-select: none;
}
.node:hover {
  background: rgb(157, 157, 158);
}
.node.selected,
.selectedNode.selected {
  background: #e3c000;
  border-color: #e3c000;
}
.node .title,
.selectedNode .title,
.activeNode .title,
.blockedNode .title {
  color: white;
  font-family: sans-serif;
  font-size: 18px;
  padding: 8px;
}
.node .output,
.selectedNode .output,
.activeNode .output,
.blockedNode .output {
  text-align: right;
  height: 0px;
}
.node .outputGeneral {
  text-align: right;
  height: 25px;
}
.node .input,
.selectedNode .input,
.activeNode .input,
.blockedNode .input {
  text-align: left;
  height: 0px;
}
.node .input-title,
.node .output-title,
.selectedNode .input-title,
.selectedNode .output-title,
.activeNode .input-title,
.activeNode .output-title,
.blockedNode .input-title,
.blockedNode .output-title {
  vertical-align: middle;
  color: white;
  display: inline-block;
  font-family: sans-serif;
  font-size: 14px;
  margin: 6px;
  line-height: 24px;
}
.node .control-title,
.selectedNode .control-title,
.activeNode .control-title,
.blockedNode .control-title {
  vertical-align: middle;
  color: white;
  display: inline-block;
  font-family: sans-serif;
  font-size: 14px;
  margin: 6px;
  line-height: 24px;
}
.node .input-control,
.selectedNode .input-control,
.activeNode .input-control,
.blockedNode .input-control {
  z-index: 1;
  width: calc(100% - 36px);
  vertical-align: middle;
  display: inline-block;
}
.node .control,
.selectedNode .control,
.activeNode .control,
.blockedNode .control {
  padding: 0px;
  margin-right: 20px;
  margin-left: 15px;
  display: grid;
  grid-template-columns: 65px 1fr;
  justify-items: left;
  align-items: center;
}
.selectedNode {
  background: rgba(10, 155, 46, 0.8);
  border: 2px solid #1a4628;
  border-radius: 10px;
  cursor: pointer;
  min-width: 180px;
  height: auto;
  padding-bottom: 6px;
  box-sizing: content-box;
  position: relative;
  user-select: none;
}
.selectedNode:hover {
  background: rgba(86, 226, 121, 0.8);
}
.activeNode {
  background: rgba(57, 58, 57, 0.8);
  border: 2px solid #4d504e;
  border-radius: 10px;
  cursor: pointer;
  min-width: 180px;
  height: auto;
  padding-bottom: 6px;
  box-sizing: content-box;
  position: relative;
  user-select: none;
}
.activeNode:hover {
  background: rgba(139, 138, 139, 0.8);
}
.blockedNode {
  background: rgba(206, 69, 45, 0.8);
  border: 2px solid #573232;
  border-radius: 10px;
  cursor: pointer;
  min-width: 180px;
  height: auto;
  padding-bottom: 6px;
  box-sizing: content-box;
  position: relative;
  user-select: none;
}
.blockedNode:hover {
  background: rgba(197, 141, 134, 0.8);
}
.triangle-right {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-left: 100px solid rgba(158, 161, 159, 0.8);
  border-bottom: 50px solid transparent;
}
.btn-group button {
  background-color: #343a40; /* Green background */
  border: 1px solid rgb(77, 80, 77); /* Green border */
  color: white; /* White text */
  padding: 5px 10px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
  margin-left: 2px;
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #363c42;
}

#wrapper {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

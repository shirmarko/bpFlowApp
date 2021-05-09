<template>
  <div id="rete" v-show="visible" ref="rete">
    <button class="runButton" v-on:click="OnClickRun">Run</button>
    <button class="debugButton" v-on:click="OnClickDebug">Debug</button>
  </div>
</template>

<script>
import { init } from "../node-editor/index";
import { OnClickRun, OnClickDebug } from "../node-editor/index";


export default {
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    OnClickRun: function () {
      OnClickRun();
    },
    OnClickDebug: function () {
      OnClickDebug();
    }
  },
  mounted() {
    init(this.$refs.rete);
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
.node1 .control input,
.node1 .input-control input {
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
  background: rgb(136, 170, 219);
  border: 2px solid rgb(102, 147, 209);
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
  background: rgb(169, 197, 236);
}
.node.selected,
.node1.selected {
  background: #e3c000;
  border-color: #e3c000;
}
.node .title,
.node1 .title {
  color: white;
  font-family: sans-serif;
  font-size: 18px;
  padding: 8px;
}
.node .output,
.node1 .output {
  text-align: right;
  height: 0px;
}
.node .outputGeneral {
  text-align: right;
  height: 25px;
}

.node .input,
.node1 .input {
  text-align: left;
  height: 0px;
}
.node .input-title,
.node .output-title,
.node1 .input-title,
.node1 .output-title {
  vertical-align: middle;
  color: white;
  display: inline-block;
  font-family: sans-serif;
  font-size: 14px;
  margin: 6px;
  line-height: 24px;
}
.node .control-title,
.node1 .control-title {
  vertical-align: middle;
  color: white;
  display: inline-block;
  font-family: sans-serif;
  font-size: 14px;
  margin: 6px;
  line-height: 24px;
}
.node .input-control,
.node1 .input-control {
  z-index: 1;
  width: calc(100% - 36px);
  vertical-align: middle;
  display: inline-block;
}
.node .control,
.node1 .control {
  padding: 0px;
  margin-right: 20px;
  margin-left: 15px;
  display: grid;
  grid-template-columns: 65px 1fr;
  justify-items: left;
  align-items: center;
}

.node1 {
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

.node1:hover {
  background: rgba(86, 226, 121, 0.8);
}

.triangle-right {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-left: 100px solid rgb(136, 170, 219);
  border-bottom: 50px solid transparent;
}
</style>

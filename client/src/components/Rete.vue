<template>
  <div id="rete" v-show="visible" ref="rete">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand >bpFlow</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" >
            <b-nav-item id="run-button" v-on:click="OnClickRun">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
              </svg>
            </b-nav-item>
            <b-nav-item id="debug-button" v-on:click="OnClickDebug">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug-fill" viewBox="0 0 16 16">
                <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"/>
                <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"/>
              </svg>
            </b-nav-item>
            <b-nav-item id="step-back-button" v-on:click="OnClickStepBack" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </b-nav-item>
            <b-nav-item id="step-forward-button" v-on:click="OnClickStep" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- <button class="runButton" v-on:click="OnClickRun">Run</button>
    <button class="debugButton" v-on:click="OnClickRun">Debug</button> -->

  </div>
</template>

<script>
// import init from "../node-editor";
import { init } from "../node-editor/index";
import { OnClickRun, OnClickStep } from "../node-editor/index";
import {
  BModal,
  VBModal,
  BButton,
  BFormGroup,
  BFormInput,
  BFormSpinbutton,
  BButtonToolbar,
  BButtonGroup,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
} from "bootstrap-vue";
//import Modal from './Modal.vue';
// import { BModal, VBModal } from 'bootstrap-vue'

export default {
  data() {
    return {
      visible: true,
      //   isModalVisible: false,
      //   name: '',
      //   nameState: null,
      //   submittedNames: []
    };
  },
  methods: {
    // showModal() {
    //     this.isModalVisible = true;
    // },
    // closeModal() {
    //     this.isModalVisible = false;
    // },
    OnClickRun: function () {
      OnClickRun();
    },
    OnClickDebug: function () {
      console.log("------DEBUG IS NOT IMPLEMENTED YET--------");
    },
    OnClickStep: function () {
      OnClickStep();
    },
    OnClickStepBack: function () {
      console.log("------STEP BACK IS NOT IMPLEMENTED YET--------");
    },
    // checkFormValidity() {
    //     const valid = this.$refs.form.checkValidity()
    //     this.nameState = valid
    //     return valid
    // },
    // resetModal() {
    //     this.name = ''
    //     this.nameState = null
    // },
    // handleOk(bvModalEvt) {
    //     // Prevent modal from closing
    //     bvModalEvt.preventDefault()
    //     // Trigger submit handler
    //     this.handleSubmit()
    // },
    // handleSubmit() {
    //     // Exit when the form isn't valid
    //     if (!this.checkFormValidity()) {
    //       return
    //     }
    //     // Push the name to submitted names
    //     this.submittedNames.push(this.name)
    //     // Hide the modal manually
    //     this.$nextTick(() => {
    //       this.$bvModal.hide('modal-prevent-closing')
    //     })
    // }
  },
  components: {
    BModal,
    BButton,
    BFormGroup,
    BFormInput,
    BFormSpinbutton,
    BButtonToolbar,
    BButtonGroup,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
  },
  directives: { "b-modal": VBModal },
  mounted() {
    init(this.$refs.rete);
  },
  //   components: {
  //         // Modal,
  //         BModal,
  //     },
  //   directives: { 'b-modal': VBModal },
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
.blockedNode .input{
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
  background: rgba(158, 161, 159, 0.8);
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
  background: rgba(213, 219, 216, 0.8);
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
  border-left: 100px solid rgb(136, 170, 219);
  border-bottom: 50px solid transparent;
}
</style>

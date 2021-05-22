<template>
  <div id="rete" v-show="visible" ref="rete">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand>BPFlow</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-b-toggle.sidebar-variant>Console</b-nav-item>
            <b-nav-item
              id="run-button"
              v-on:click="OnClickRun"
              :disabled="buttonsVisibility.isRunDisabled"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-play"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                />
              </svg>
            </b-nav-item>
            <b-nav-item
              id="debug-button"
              v-on:click="OnClickDebug"
              @click="makeToast('success')"
              class="mb-2"
              :disabled="buttonsVisibility.isDebugDisabled"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bug-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"
                />
                <path
                  d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"
                />
              </svg>
            </b-nav-item>
            <b-nav-item
              id="stop-button"
              v-on:click="OnClickStop"
              class="mb-2"
              @click="makeToast('danger')"
              :disabled="buttonsVisibility.isStopDisabled"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-stop-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"
                />
              </svg>
            </b-nav-item>
            <b-nav-item
              id="step-back-button"
              v-on:click="OnClickStepBack"
              :disabled="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </b-nav-item>
            <b-nav-item
              id="step-forward-button"
              v-on:click="OnClickStep"
              :disabled="buttonsVisibility.isStepDisabled"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </b-nav-item>
            <b-nav-item id="clean-board-button" v-on:click="OnClickCleanBoard" v-b-tooltip.bottom="'Clean Board'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                />
              </svg>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <b-sidebar
      id="sidebar-variant"
      title="CONSOLE"
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <b-button size="sm" block @click="ClearConsole">Clear</b-button>
      <div class="px-3 py-2">
        <div v-for="(row, index) in logContent" :key="index">
          {{ row }}<br />
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { init } from "../node-editor/index";
import {
  OnClickRun,
  OnClickStep,
  OnClickStop,
  OnClickDebug,
  cleanBoard
} from "../node-editor/index";
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
  BNav,
  BSidebar,
  BCard,
  BTooltip,
  VBTooltip
} from "bootstrap-vue";
//import Modal from './Modal.vue';
// import { BModal, VBModal } from 'bootstrap-vue'

export default {
  data() {
    return {
      visible: true,
      logContent: [],
      buttonsVisibility: {
        isStepDisabled: true,
        isStopDisabled: true,
        isDebugDisabled: false,
        isRunDisabled: false,
      },
    };
  },
  methods: {
    OnClickRun: function () {
      OnClickRun();
    },
    OnClickDebug: function () {
      this.buttonsVisibility.isStepDisabled = false;
      this.buttonsVisibility.isStopDisabled = false;
      this.buttonsVisibility.isDebugDisabled = true;
      this.buttonsVisibility.isRunDisabled = true;
      OnClickDebug();
    },
    OnClickStop: function () {
      this.buttonsVisibility.isStepDisabled = true;
      this.buttonsVisibility.isStopDisabled = true;
      this.buttonsVisibility.isDebugDisabled = false;
      this.buttonsVisibility.isRunDisabled = false;
      OnClickStop();
    },
    OnClickStep: function () {
      OnClickStep();
    },
    OnClickStepBack: function () {
      console.log("------STEP BACK IS NOT IMPLEMENTED YET--------");
    },
    OnClickCleanBoard: function () {
      console.log("------CLEAN BOARD IS NOT IMPLEMENTED YET--------");
      cleanBoard();
    },

    makeToast(variant = null) {
      this.$bvToast.toast(
        `${this.buttonsVisibility.isDebugDisabled ? "ON" : "OFF"}`,
        {
          title: `Debug Mode Status`,
          variant: variant,
          toaster: "b-toaster-bottom-right",
          appendToast: true,
          autoHideDelay: 2500,
          solid: true,
        }
      );
    },
    ClearConsole() {
      this.logContent.splice(0, this.logContent.length);
    },
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
    BNav,
    BSidebar,
    BCard,
    BTooltip
  },
  directives: { "b-modal": VBModal, 'b-tooltip': VBTooltip },
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

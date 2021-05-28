<template>
  <div id="codeEditor">
    <b-button
      :id="`code-control-${curNodeId}`"
      variant="dark"
      size="sm"
      v-b-tooltip.bottom="'Edit Code'"
      v-b-modal.code-modal-prevent-closing
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-file-earmark-code"
        viewBox="0 0 16 16"
      >
        <path
          d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
        />
        <path
          d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z"
        />
      </svg>
    </b-button>

    <b-modal
      id="code-modal-prevent-closing"
      ref="code-modal"
      centered
      title="Edit Code"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        function(payload){<br>
        &emsp;&emsp;let outputs = {};
            
        <b-form-group invalid-feedback="Code is required" :state="codeState">
          <codemirror
            id="code-input"
            ref="myCm"
            v-model="code"
            :options="cmOptions"
            class="code"
          ></codemirror>
        </b-form-group>
        &emsp;&emsp;return outputs;<br>
        }
      </form>
    </b-modal>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/base16-dark.css'


import {
  BModal,
  VBModal,
  BButton,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BTooltip,
  VBTooltip,
} from "bootstrap-vue";

export default {
  name: "CodeControlVueComp",
  props: ["ikey", "putData", "nodeOutputs", "nodeId", "getData"],
  data() {
    return {
      code: this.getData(this.ikey),
      codeState: null,
      outputs: this.nodeOutputs,
      componentKey: 0,
      curNodeId: this.nodeId,

      item: {
        content: "",
      },
      cmOptions: {
        tabSiz: 4,
        mode: "text/javascript",
        theme: 'base16-dark',
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { Ctrl: "autocomplete" },
        line: true,
        lineWiseCopyCut: true,
        showCursorWhenSelecting: false,
        matchBrackets: true,
        autocapitalize: true,
        autocorrect: true,
        spellcheck:  true,

      },
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.codeState = valid;
      return valid;
    },
    resetModal() {
      //this.code = ''
      this.componentKey += 1;
      this.codeState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.putData(this.ikey, this.code);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs["code-modal"].hide("code-modal-prevent-closing");
      });
    },
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  components: {
    BModal,
    BButton,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BTooltip,
    codemirror
  },
  directives: { "b-modal": VBModal, "b-tooltip": VBTooltip },
};
</script>


<style>
</style>





<template>
  <b-modal
    id="modal-choose-example"
    ref="modal-choose-example"
    title="Choose Example"
    ok-only
  >
    <div class="d-block text-center">
      <h4>Choose from the following examples</h4>

      <br />
      <b-button @click="OnClickLoadEmpty">Blank</b-button>
      <b-button @click="OnClickLoadHelloWorld">Hello World</b-button>
      <b-button @click="OnClickLoadHotCold">Hot Cold</b-button>
      <br />
      <br />
      <b-button @click="OnClickLoadGenericHotCold">Generic Hot Cold</b-button>
      <b-button @click="OnClickLoadTicTacToe">Tic Tac Toe</b-button>
    </div>
  </b-modal>
</template>
<script>
import {
  loadEditorExample,
} from "../node-editor/index";
import {
  BModal,
  VBModal,
  BButton,
} from "bootstrap-vue";
export default {
  data() {
    return {
    };
  },
  methods: {
    OnClickLoadEmpty() {
      loadEditorExample("Empty");
    },
    OnClickLoadHelloWorld() {
      loadEditorExample("HelloWorld");
    },
    OnClickLoadHotCold() {
      loadEditorExample("HotCold");
    },
    OnClickLoadGenericHotCold() {
      loadEditorExample("GenericHotCold");
    },
    OnClickLoadTicTacToe() {
      loadEditorExample("TicTacToe");
    },
  },
  components: {
    BModal,
    BButton,
  },
  directives: { "b-modal": VBModal},
  mounted() {
    this.$refs["modal-choose-example"].show();
  },
};
</script>
<style>
</style>


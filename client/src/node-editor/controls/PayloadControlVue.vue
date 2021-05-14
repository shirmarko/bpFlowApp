<template>
  <div>
  <span :id="`disabled-wrapper${curNodeId}`" class="d-inline-block" tabindex="0">
    <b-button size="sm" pill v-b-modal.code-modal-prevent-closing disabled>my payload</b-button>
  </span>
  <b-tooltip :target="`disabled-wrapper${curNodeId}`" :title="`${JSON.stringify(myNodeData.payloadView)}`"></b-tooltip>
</div>
</template>

<script>
//import Modal from './Modal.vue';
import {
  BButton,
  VBModal,
  BTooltip

} from "bootstrap-vue";

export default {
  name: "CodeControlVueComp",
  props: ["ikey", "nodeData", "nodeId"],
  data() {
    return {
      myNodeData: this.nodeData,
      curNodeId: this.nodeId
    };
  },
  methods: {
  },
  components: { BButton, BTooltip},
  directives: { "b-modal": VBModal },
};
</script>


<style>
</style>





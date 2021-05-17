<template>
  <div>
    <span
      :id="`payload-control-${curNodeId}`"
      class="d-inline-block"
      tabindex="0"
    >
      <b-button size="sm" variant="dark" v-b-tooltip.bottom="`${JSON.stringify(myNodeData.payloadView)}`">
        payload
      </b-button>
    </span>
  </div>
</template>

<script>
//import Modal from './Modal.vue';
import { BButton, VBModal, BTooltip, VBTooltip} from "bootstrap-vue";

export default {
  name: "CodeControlVueComp",
  props: ["ikey", "nodeData", "nodeId"],
  data() {
    return {
      myNodeData: this.nodeData,
      curNodeId: this.nodeId,
    };
  },
  methods: {},
  components: { BButton, BTooltip },
  directives: { "b-modal": VBModal, 'b-tooltip': VBTooltip},
};
</script>


<style>
</style>





<template>
  <div>
  <span id="disabled-wrapper" class="d-inline-block" tabindex="0">
    <b-button size="sm" pill v-b-modal.code-modal-prevent-closing disabled>my payload</b-button>
  </span>
  <b-tooltip target="disabled-wrapper">{{payload}}</b-tooltip>
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
  props: ["ikey", "payload"],
  data() {
    return {
      payload: this.payload,
      componentKey: 0
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





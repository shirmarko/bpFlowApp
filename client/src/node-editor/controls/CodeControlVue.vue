<template>
  <div id="codeEditor">
    <b-button size="sm" pill v-b-modal.code-modal-prevent-closing>Edit Code</b-button>

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
        <b-form-group invalid-feedback="Code is required" :state="codeState">

          <b-form-textarea
            id="code-input"
            v-model="code"
            placeholder="Enter code..."
            rows="10"
            max-rows="20"
          ></b-form-textarea>

        </b-form-group>
      </form>
    </b-modal>
    <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
    </b-modal> -->
  </div>
</template>

<script>
//import Modal from './Modal.vue';
import {
  BModal,
  VBModal,
  BButton,
  BFormGroup,
  BFormInput,
  BFormTextarea,
} from "bootstrap-vue";

export default {
  name: "CodeControlVueComp",
  props: ["ikey", "putData"],
  data() {
    return {
      code: "",
      codeState: null,
      //   submittedNames: []
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
      // this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs["code-modal"].hide("code-modal-prevent-closing");
      });
    },
  },
  components: { BModal, BButton, BFormGroup, BFormInput, BFormTextarea },
  directives: { "b-modal": VBModal },
};
</script>


<style>
</style>





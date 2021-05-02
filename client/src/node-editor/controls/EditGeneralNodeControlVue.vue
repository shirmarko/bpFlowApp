<template>
  <div>
    <b-button size="sm" pill v-b-modal.editNode-modal-prevent-closing
      >Edit Node</b-button
    >

    <b-modal
      id="editNode-modal-prevent-closing"
      ref="editNode-modal"
      centered
      title="Edit Node"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          id="title"
          label="Title: "
          label-for="title-id"
          invalid-feedback="Please enter title"
          :state="stateTitle"
        >
          <b-form-input
            id="title-id"
            v-model="titleValue"
            :state="stateTitle"
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="numberOfOutputs"
          label="Number Of Outputs: "
          label-for="numberOfOutputs-id"
          invalid-feedback="Number of outputs should be greater then 0"
          :state="stateNumber"
        >
          <b-form-input
            id="numberOfOutputs-id"
            v-model="numberOfOutputsValue"
            type="number"
            :state="stateNumber"
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group
          v-for="(output, index) in Object.fromEntries(outputs)"
          :key="`${componentKey}-${index}`"
          :id="index"
          :label="index"
        >
          <b-form-input :id="index" v-model="output.key" trim></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
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
} from "bootstrap-vue";

export default {
  props: ["ikey", "numOfOutputs", "name", "nodeOutputs", "myNode"],
  data() {
    let myData = {
      titleValue: this.name,
      numberOfOutputsValue: this.numOfOutputs,
      stateTitleVal: this.name.length > 0,
      stateNumberVal: this.numOfOutputs > 0,
      outputs: this.nodeOutputs,
      componentKey: 0,
    };
    for (const [key, value] of this.nodeOutputs.entries()) {
      myData[key] = value.name;
    }

    return myData;
  },
  computed: {
    stateTitle() {
      this.stateTitleVal = this.titleValue.length > 0;
      return this.stateTitleVal;
    },
    stateNumber() {
      this.stateNumberVal = this.numberOfOutputsValue > 0;
      return this.stateNumberVal;
    },
  },
  // mounted: function () {
  //   console.log("---" + this.nodeOutputs.entries());

  //   for (const [key, value] of this.nodeOutputs.entries()) {
  //     console.log(key, value);
  //     Vue.set(this, key, value.name);
  //   }
  //   console.log(this.data);
  // },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    checkFormValidity() {
      return this.stateTitleVal && this.stateNumberVal;
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

      this.forceRerender();

      // for(var output in this.myOutputs){
      //   this.nodeOutputs.get(key).name = value;
      // }
      for (const [key, output] of this.outputs.entries()) {
        output.name = output.key;
      }

      console.log(this.output1);
      this.myNode.update();
      //this.putData(this.ikey, this.code);
      // this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs["editNode-modal"].hide("editNode-modal-prevent-closing");
      });
    },
  },
  components: { BModal, BButton, BFormGroup, BFormInput },
  directives: { "b-modal": VBModal },
};
</script>


<style>
</style>
<template>
  <b-nav-item-dropdown
    id="my-nav-dropdown"
    text="Menu"
    toggle-class="nav-link-custom"
    right
  >
    <b-dropdown-item id="save-button" v-on:click="OnClickSave"
      >Save File</b-dropdown-item
    >
    <b-dropdown-item id="load-from-file-button" v-b-modal.modal-upload-json
      >Load File</b-dropdown-item
    >
    <b-modal id="modal-upload-json" title="File Upload" v-on:ok="OnClickLoad">
      <p class="my-4">Please upload your JSON file:</p>
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a JSON file or drop it here..."
        accept=".json"
      ></b-form-file>
    </b-modal>

    <b-dropdown-item id="load-from-file-button" v-b-modal.modal-choose-example
      >Load Example</b-dropdown-item
    >
  </b-nav-item-dropdown>
</template>
<script>
import {
  saveEditor,
  loadEditor
} from "../node-editor/index";
import {
  BModal,
  VBModal,
  BFormInput,
  BFormFile,
} from "bootstrap-vue";

export default {
  data() {
    return {
      file: null
    };
  },
  methods: {
    OnClickSave() {
      saveEditor();
    },
    async OnClickLoad() {
      let reader = new FileReader();
      let json;
      reader.onload = (e) => {
        json = e.target.result;
        loadEditor(json);
      };
      reader.readAsText(this.file);

      this.file = null;
    }
  },
  components: {
    BModal,
    BFormInput,
    BFormFile,
  },
  directives: { "b-modal": VBModal },
};
</script>
<style>
</style>

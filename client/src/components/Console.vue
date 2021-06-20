<template>
  <b-sidebar
    id="sidebar-variant"
    title="CONSOLE"
    bg-variant="dark"
    text-variant="light"
    shadow
  >
    <b-button size="sm" block @click="ClearConsole">Clear</b-button>
    <div class="px-3 py-2">
      <div v-for="(row, index) in logContent" :key="index">{{ row }}<br /></div>
    </div>
  </b-sidebar>
</template>
<script>
import { BButton, BSidebar } from "bootstrap-vue";

export default {
  props: ["log"],
  data() {
    return {
      logContent: this.log,
    };
  },
  methods: {
    ClearConsole() {
      this.logContent.splice(0, this.logContent.length);
    },
  },
  components: {
    BButton,
    BSidebar,
  },
};
</script>
<style>
</style>

<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-navbar-brand>BPFlow</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <Toolbar v-bind:myButtonsVisibility="this.myButtonsVisibility"/>
  </b-navbar>
</template>
<script>
import {
  BNavbar,
  BNavbarNav,
  BNavbarToggle,
  BNav,
} from "bootstrap-vue";

import Toolbar from "./Toolbar";

export default {
  props: ["myButtonsVisibility"],
  data() {
    return {
    };
  },
  components: {
    BNavbar,
    BNavbarNav,
    BNavbarToggle,
    BNav,
    Toolbar
  },
};
</script>
<style>
</style>


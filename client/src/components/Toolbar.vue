<template>
  <b-collapse id="nav-collapse" is-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-b-toggle.sidebar-variant>Console</b-nav-item>
      <b-nav-item
        id="run-button"
        v-on:click="OnClickRun"
        :disabled="buttonsVisibility.isRunDisabled"
        v-b-tooltip.hover="{ title: 'Run', placement: 'bottom' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-play"
          viewBox="0 0 16 16"
        >
          <path
            d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
          />
        </svg>
      </b-nav-item>
      <b-nav-item
        id="debug-button"
        v-on:click="OnClickDebug"
        @click="makeToast('success')"
        class="mb-2"
        :disabled="buttonsVisibility.isDebugDisabled"
        v-b-tooltip.hover="{ title: 'Debug', placement: 'bottom' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-bug-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"
          />
          <path
            d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"
          />
        </svg>
      </b-nav-item>
      <b-nav-item
        id="stop-button"
        v-on:click="OnClickStop"
        class="mb-2"
        @click="makeToast('danger')"
        :disabled="buttonsVisibility.isStopDisabled"
        v-b-tooltip.hover="{ title: 'Stop', placement: 'bottom' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-stop-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"
          />
        </svg>
      </b-nav-item>
      <b-nav-item
        id="step-back-button"
        v-on:click="OnClickStepBack"
        :disabled="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </b-nav-item>
      <b-nav-item
        id="step-forward-button"
        v-on:click="OnClickStep"
        :disabled="buttonsVisibility.isStepDisabled"
        v-b-tooltip.hover="{ title: 'Step', placement: 'bottom' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </b-nav-item>
      <b-nav-item
        id="clean-board-button"
        v-on:click="OnClickCleanBoard"
        v-b-tooltip.bottom="'Clean Board'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
          />
        </svg>
      </b-nav-item>
      <DropdownMenu />
    </b-navbar-nav>
  </b-collapse>
</template>
<script>
import {
  OnClickRun,
  OnClickStep,
  OnClickStop,
  OnClickDebug,
  cleanBoard,
  ChangeGraphReadOnly,
} from "../node-editor/index";
import {
  BModal,
  VBModal,
  BButton,
  BFormGroup,
  BFormInput,
  BFormSpinbutton,
  BButtonToolbar,
  BButtonGroup,
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BNav,
  BSidebar,
  BTooltip,
  VBTooltip,
  BFormFile,
} from "bootstrap-vue";
import DropdownMenu from "./DropdownMenu.vue";

export default {
    props: ["myButtonsVisibility"],
  data() {
    return {
      buttonsVisibility: this.myButtonsVisibility,
    };
  },
  methods: {
    OnClickRun: function () {
      OnClickRun();
    },
    OnClickDebug: async function () {
      this.buttonsVisibility.isStepDisabled = false;
      this.buttonsVisibility.isStopDisabled = false;
      this.buttonsVisibility.isDebugDisabled = true;
      this.buttonsVisibility.isRunDisabled = true;
      await ChangeGraphReadOnly();
      OnClickDebug();
    },
    OnClickStop: async function () {
      this.buttonsVisibility.isStepDisabled = true;
      this.buttonsVisibility.isStopDisabled = true;
      this.buttonsVisibility.isDebugDisabled = false;
      this.buttonsVisibility.isRunDisabled = false;
      await ChangeGraphReadOnly();
      OnClickStop();
    },
    OnClickStep: function () {
      OnClickStep();
    },
    OnClickStepBack: function () {
      console.log("------STEP BACK IS NOT IMPLEMENTED YET--------");
    },
    OnClickCleanBoard: function () {
      cleanBoard();
    },

    makeToast(variant = null) {
      this.$bvToast.toast(
        `${this.buttonsVisibility.isDebugDisabled ? "ON" : "OFF"}`,
        {
          title: `Debug Mode Status`,
          variant: variant,
          toaster: "b-toaster-bottom-right",
          appendToast: true,
          autoHideDelay: 2500,
          solid: true,
        }
      );
    },
  },
  components: {
    BModal,
    BButton,
    BFormGroup,
    BFormInput,
    BFormSpinbutton,
    BButtonToolbar,
    BButtonGroup,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BNav,
    BSidebar,
    BTooltip,
    BFormFile,
    DropdownMenu
  },
  directives: { "b-modal": VBModal, "b-tooltip": VBTooltip },
};
</script>
<style>
</style>

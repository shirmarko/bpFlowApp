var CustomStartNode = {
    template: `<div id=triangle-right> 
    <!-- Outputs-->
    <div class="output" v-for="output in outputs()" :key="output.key">
      <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
    </div>
  </div>`,
    mixins: [VueRenderPlugin.mixin],
    components: {
        Socket: VueRenderPlugin.Socket
    }
}
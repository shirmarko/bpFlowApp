<template>
<input type="text" :value="value" @input="change($event)"/>
</template>


<script>
export default {
  props: ["ikey", "getData", "putData"],
  data() {
    return {
      value: this.getData(this.ikey)
    };
  },
  methods: {
    change(e) {
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey) this.putData(this.ikey, this.value);
    }
  },
//   mounted() {
//     this.value = this.getData(this.ikey);
//   }
}
</script>

<style>
select, input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
</style>


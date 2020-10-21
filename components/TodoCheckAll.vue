<template>
   <div><label><input type="checkbox" :checked="!anyremaining" @change="allChecked">check all</label></div>
</template>

<script>
export default {
  name: "todo-check-all",
  props: {
    anyremaining: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    allChecked() {
      this.$emit("checkallchanged", this.anyremaining);
    }
  }
};
</script>

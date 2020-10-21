<template>
    <button v-if="showClearCompletedButton" @click="clearCompleted">clear completed </button>
</template>

<script>
export default {
  name: "todo-clear-completed",
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      this.$emit("clearCompletedTodos");
    }
  }
};
</script>

<template>
  <input
    class="input"
    :value="modelValue"
    @input="updateInput"
    type="text"
    placeholder="Title"
  />
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
  },
  data() {
    return {};
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="css" scoped>
.input {
  width: 100%;
  padding: 10px;
}
</style>

<template>
  <select class="select" :value="modelValue" @change="changeOptions">
    <option disabled value="">choose one pls</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelected",
  props: {
    modelValue: { String },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    changeOptions(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
.select {
  border: 1px solid teal;
  height: 37px;
  padding: 10px;
}
</style>

<template>
  <div class="dialog" v-if="show === true" @click="closeDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyDialog",
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style lang="css" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
}
.dialog__content {
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  min-width: 300px;
  min-height: 50px;
}
</style>

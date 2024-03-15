<template>
  <navbar-page />
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
.app {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

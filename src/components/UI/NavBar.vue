<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <ButtonComponent @click="$router.push('/users')">Posts</ButtonComponent>
      <ButtonComponent style="margin-left: 10px" @click="$router.push('/about')"
        >About</ButtonComponent
      >
      <ButtonComponent style="margin-left: 10px" @click="$router.push('/store')"
        >Store</ButtonComponent
      >
      <ButtonComponent
        style="margin-left: 10px"
        @click="$router.push('/composition')"
        >Composition</ButtonComponent
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar-page",
};
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 20px;
  height: 50px;
  align-items: center;
  padding: 10px 20px;
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.navbar__btns {
  margin-left: auto;
}
</style>

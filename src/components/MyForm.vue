<template>
  <form @submit.prevent="addPost">
    <h4>Create Post</h4>
    <MyInput v-model="title" placeholder="Title" /> <br />
    <MyInput v-model="content" placeholder="Content" /> <br />
    <ButtonComponent>Add</ButtonComponent>
  </form>
</template>

<script>
export default {
  name: "MyForm",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    addPost() {
      this.$emit("add-post", {
        id: Math.floor(Math.random() * 100),
        title: this.title,
        content: this.content,
      });
      this.title = "";
      this.content = "";
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  gap: 10px;
  max-width: 700px;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
./UI/Button.vue

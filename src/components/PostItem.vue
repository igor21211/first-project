<template>
  <div class="post" :key="post.id">
    <h2>{{ post.title }}</h2>
    <p>
      {{ post.body }}
    </p>
    <div class="like_dislike">
      <ButtonComponent @click.stop="deletePost(post.id)"
        >Delete</ButtonComponent
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deletePost(id) {
      this.$emit("delete-post", id);
    },
  },
};
</script>

<style lang="css" scoped>
.post {
  width: 100%;
  margin: 20px;
  padding: 20px;
  border: 1px solid #000;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
./UI/Button.vue

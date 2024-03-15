<template>
  <div class="post_content" v-if="post">
    <h2>Body: {{ post.title }}</h2>
    <p>Content: {{ post.body }}</p>
  </div>
  <div v-else class="post__loading">Loading...</div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostPage",
  data() {
    return {
      post: null,
      isLoading: true,
    };
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
        );
        this.post = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchPost();
  },
};
</script>

<style scoped>
.post__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-size: 30px;
}
.post_content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  max-width: 1200px;
  margin: auto;
}
.post_loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-size: 30px;
}
</style>

<template>
  <div class="container" v-if="posts.length > 0">
    <h2>Posts</h2>
    <transition-group name="post-list">
      <PostItem
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @delete-post="deletePost"
      />
    </transition-group>
  </div>
  <div v-if="posts.length === 0">
    <h2 style="color: red">Not have Post</h2>
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  name: "PostList",
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  components: {
    PostItem,
  },
  methods: {
    deletePost(id) {
      this.$emit("delete-post", id);
    },
  },
};
</script>

<style lang="css" scoped>
.post_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
  margin: auto;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  max-width: 1200px;
  margin: auto;
}
h2 {
  text-align: center;
}
.post-list-move {
  transition: transform 1s;
}
.post-list-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter, .post-list-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.post-list-leave-active {
  position: absolute;
}
.post-list-enter-active {
  transition: all 1s;
}
</style>

<template>
  <div class="posts_view">
    <h1>Posts</h1>
    <MyInput
      class="input"
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Search..
      "
    />
    <MyDialog v-model:show="dialogVisible">
      <MyForm @add-post="AddPost" />
    </MyDialog>
    <div class="app__btns">
      <ButtonComponent class="btn" @click="dialogVisible = true"
        >Add Post</ButtonComponent
      >
      <MySelected
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <PostList
      v-if="!isLoading"
      :posts="sortedAndFilteredPosts"
      @delete-post="deletePost"
    />
    <h2 v-else>Loading...</h2>
    <div v-inter="loadMorePost" class="observer"></div>
  </div>
</template>

<script>
import MyForm from "@/components/MyForm.vue";
import PostList from "@/components/PostList.vue";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "UserPage",
  components: {
    MyForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      loadMorePost: "post/loadMorePost",
      fetchPosts: "post/fetchPosts",
    }),
    AddPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    deletePost(id) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      sortOptions: (state) => state.post.sortOptions,
      selectedSort: (state) => state.post.selectedSort,
      isLoading: (state) => state.post.isLoading,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPage: (state) => state.post.totalPage,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndFilteredPosts: "post/sortedAndFilteredPosts",
    }),
  },
};
</script>

<style scoped>
.posts_view {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.input {
  width: 100%;
  max-width: 700px;
  margin: 10px 0px;
}
.page__wrapper {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.page {
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}
.current__page {
  background-color: teal;
  color: #fff;
}
.app__btns {
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-bottom: 15px 0px;
}
.observer {
}
</style>

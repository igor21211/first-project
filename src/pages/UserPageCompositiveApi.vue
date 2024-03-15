<template>
  <div class="posts_view">
    <h1>Posts</h1>
    <MyInput
      class="input"
      v-model="searchQuery"
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
      <MySelected v-model="selectedSort" :options="sortOptions" />
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
import { usePosts } from "@/hooks/usePosts";
import useSortedAndSearch from "@/hooks/useSortedAndSearch";
import useSortedPosts from "@/hooks/useSortedPosts";
export default {
  name: "UserPage",
  components: {
    MyForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "Title" },
        { value: "body", name: "Body" },
      ],
    };
  },
  setup() {
    const { posts, isLoading, totalPage } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearch(sortedPosts);
    return {
      posts,
      isLoading,
      totalPage,
      sortedAndFilteredPosts: sortedAndSearchedPosts,
      selectedSort,
      searchQuery,
    };
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

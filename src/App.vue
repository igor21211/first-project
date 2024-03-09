<template>
  <div class="app">
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
    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPage"
        class="page"
        :key="pageNumber"
        :class="{
          current__page: pageNumber === this.page,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
  </div>
</template>

<script>
import MyForm from "./components/MyForm.vue";
import PostList from "./components/PostList.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    MyForm,
    PostList,
  },
  data() {
    return {
      isLoading: false,
      dialogVisible: false,
      posts: [],
      title: "",
      content: "",
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        { value: "title", name: "Title" },
        { value: "body", name: "Body" },
      ],
    };
  },
  methods: {
    AddPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    deletePost(id) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
      });
    },
    sortedAndFilteredPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    page() {
      this.fetchPosts();
    },
  },
};
</script>

<style scoped>
.app {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.app__btns {
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-bottom: 15px 0px;
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
</style>

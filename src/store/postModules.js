import axios from "axios";
export const postModules = {
  state: () => ({
    isLoading: false,
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((a, b) => {
        return a[state.selectedSort]?.localeCompare(b[state.selectedSort]);
      });
    },
    sortedAndFilteredPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setIsLoading(state, bool) {
      state.isLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    setTitle(state, title) {
      state.title = title;
    },
    setContent(state, content) {
      state.content = content;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setIsLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPage",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
      } catch (error) {
        console.error(error);
      } finally {
        commit("setIsLoading", false);
      }
    },
    async loadMorePost({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPage",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (error) {
        console.error(error);
      }
    },
  },
  namespaced: true,
};

import { onMounted, ref } from "vue";
import axios from "axios";

export function usePosts(limit) {
  const posts = ref([]);
  const isLoading = ref(true);
  const totalPage = ref(0);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limit,
          },
        }
      );
      totalPage.value = Math.ceil(response.headers["x-total-count"] / limit);
      posts.value = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(fetching);
  return {
    posts,
    isLoading,
    totalPage,
  };
}

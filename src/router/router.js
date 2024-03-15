import { createRouter, createWebHistory } from "vue-router";
import Main from "@/pages/Main.vue";
import UserPage from "@/pages/UserPage.vue";
import About from "@/pages/About.vue";
import PostPage from "@/pages/PostPage.vue";
import UserPageWithStore from "@/pages/UserPageWithStore.vue";
import UserPageCompositiveApi from "@/pages/UserPageCompositiveApi.vue";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/users",
    component: UserPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/users/:id",
    component: PostPage,
  },
  {
    path: "/store",
    component: UserPageWithStore,
  },
  {
    path: "/composition",
    component: UserPageCompositiveApi,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;

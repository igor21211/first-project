import { createStore } from "vuex";
import { postModules } from "./postModules";

export default createStore({
  modules: {
    post: postModules,
  },
});

import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";
import popularTags from "./popularTags";
import feed from "@/store/feed";
import article from "@/store/article";
import createArticle from "@/store/createArticle";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
  },
});

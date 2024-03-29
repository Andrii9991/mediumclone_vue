import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";
import popularTags from "./popularTags";
import feed from "@/store/feed";
import article from "@/store/article";
import createArticle from "@/store/createArticle";
import settings from "@/store/settings";
import addToFavorite from "@/store/addToFavorite";
import userProfile from "@/store/userProfile";

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
    settings,
    addToFavorite,
    userProfile,
  },
});

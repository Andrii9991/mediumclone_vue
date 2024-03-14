import articleApi from "@/api/article";

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    validationErrors: null,
  },
  getters: {},
  mutations: {
    createArticleStart(state) {
      state.isSubmitting = true;
    },
    createArticleSuccess(state) {
      state.isSubmitting = false;
    },
    createArticleFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    createArticle(context, { articleInput }) {
      return new Promise((resolve) => {
        context.commit("createArticleStart");
        articleApi
          .createArticle(articleInput)
          .then((article) => {
            context.commit("createArticleSuccess", article);
            resolve(article);
          })
          .catch((result) => {
            console.log(result);
            context.commit("createArticleFailure", result.response.data);
          });
      });
    },
  },
  modules: {},
};

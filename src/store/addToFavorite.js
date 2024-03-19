import addToFavoriteApi from "@/api/addToFavorites";

export default {
  namespaced: true,
  state: {},
  mutations: {
    addToFavoriteStart() {},
    addToFavoriteSuccess() {},
    addToFavoriteFailure() {},
  },
  actions: {
    addToFavorite(context, { slug, isFavorited }) {
      return new Promise((resolve) => {
        context.commit("addToFavoriteStart");
        const promise = isFavorited
          ? addToFavoriteApi.removeFromFavorites(slug)
          : addToFavoriteApi.addToFavorites(slug);
        promise
          .then((article) => {
            context.commit("addToFavoriteSuccess", article);
            resolve(article);
          })
          .catch(() => {
            context.commit("addToFavoritesFailure");
          });
      });
    },
  },
};

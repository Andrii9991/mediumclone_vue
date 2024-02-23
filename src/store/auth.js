import authApi from "@/api/auth";
import { setItem } from "@/helper/persistanceStorage";

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: false,
  },
  getters: {
    currentUser: (state) => state.currentUser,
    isLoggedIn: (state) => {
      return Boolean(state.isLoggedIn);
    },
    isAnonimus: (state) => {
      state.isLoggedIn === false;
    },
  },

  mutations: {
    registerStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    registerSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    registerFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },

    loginStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    loginSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    loginFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    register(context, credentials) {
      return new Promise((resolve) => {
        context.commit("registerStart");
        authApi
          .register(credentials)
          .then((response) => {
            context.commit("registerSuccess", response.data.user);
            setItem("accessToken", response.data.user.token);
            resolve(response.data.user);
          })
          .catch((result) => {
            context.commit("registerFailure", result.response.data.errors);
          });
      });
    },

    login(context, credentials) {
      return new Promise((resolve) => {
        context.commit("loginStart");
        authApi
          .login(credentials)
          .then((response) => {
            context.commit("loginSuccess", response.data.user);
            setItem("accessToken", response.data.user.token);
            resolve(response.data.user);
          })
          .catch((result) => {
            context.commit("loginFailure", result.response.data.errors);
          });
      });
    },
  },
  modules: {},
};

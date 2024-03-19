import authApi from "@/api/auth";
import { setItem } from "@/helper/persistanceStorage";

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    BaseValidationErrors: null,
    isLoggedIn: null,
  },
  getters: {
    currentUser: (state) => state.currentUser,
    isLoggedIn: (state) => {
      return Boolean(state.isLoggedIn);
    },
    isAnonimus: (state) => {
      return state.isLoggedIn === false;
    },
  },

  mutations: {
    registerStart(state) {
      state.isSubmitting = true;
      state.BaseValidationErrors = null;
    },
    registerSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    registerFailure(state, payload) {
      state.isSubmitting = false;
      state.BaseValidationErrors = payload;
    },

    loginStart(state) {
      state.isSubmitting = true;
      state.BaseValidationErrors = null;
    },
    loginSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    loginFailure(state, payload) {
      state.isSubmitting = false;
      state.BaseValidationErrors = payload;
    },

    getCurrentUserStart(state) {
      state.isLoading = true;
    },
    getCurrentUserSuccess(state, payload) {
      state.isLoading = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    getCurrentUserFailure(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    updateCurrentUserStart() {},
    updateCurrentUserSuccess(state, payload) {
      state.currentUser = payload;
    },
    updateCurrentUserFailure() {},
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
    getCurrentUser(context) {
      return new Promise((resolve) => {
        context.commit("getCurrentUserStart");
        authApi
          .getCurrentUser()
          .then((response) => {
            context.commit("getCurrentUserSuccess", response.data.user);
            resolve(response.data.user);
          })
          .catch(() => {
            context.commit("getCurrentUserFailure");
          });
      });
    },
    updateCurrentUser(context, { currentUserInput }) {
      return new Promise((resolve) => {
        context.commit("updateCurrentUserStart");
        authApi
          .updateCurrentUser(currentUserInput)
          .then((user) => {
            context.commit("updateCurrentUserSuccess", user);
            resolve(user);
          })
          .catch((result) => {
            context.commit(
              "updateCurrentUserFailure",
              result.response.data.errors
            );
          });
      });
    },
  },
  modules: {},
};

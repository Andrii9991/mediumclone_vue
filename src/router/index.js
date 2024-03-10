import Vue from "vue";
import VueRouter from "vue-router";
import GlobalFeed from "../views/GlobalFeed.vue";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/feed",
    name: "yourFeed",
    component: GlobalFeed,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: GlobalFeed,
  },
  {
    path: "/article/new",
    name: "createArticle",
    component: GlobalFeed,
  },
  {
    path: "/article/:slug",
    name: "article",
    component: GlobalFeed,
  },
  {
    path: "/article/:slug/edit",
    name: "editArticle",
    component: GlobalFeed,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: GlobalFeed,
  },
  {
    path: "/",
    name: "globalFeed",
    component: GlobalFeed,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

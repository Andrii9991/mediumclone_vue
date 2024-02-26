import Vue from "vue";
import VueRouter from "vue-router";
import GlobalFeed from "../views/GlobalFeed.vue";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "globalFeed",
    component: GlobalFeed,
  },
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
];

const router = new VueRouter({
  routes,
});

export default router;

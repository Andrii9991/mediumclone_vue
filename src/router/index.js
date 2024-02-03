import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterPage from "../views/RegisterPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

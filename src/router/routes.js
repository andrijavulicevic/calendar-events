import store from "../store/";

const ifAuthenticated = (to, from, next) => {
  if (store.getters.getIsLoggedIn) {
    next();
    return;
  }
  next("/login");
};

export default [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register")
  }
];

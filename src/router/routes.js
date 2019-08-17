import Home from "@/views/Home";
import Login from "@/views/Login";

export default [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register")
  }
];

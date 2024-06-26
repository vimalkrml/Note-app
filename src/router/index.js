import { createRouter, createWebHistory } from "vue-router";
import Notes from "../views/Notes.vue";
import Collaboration from "../views/Collaboration.vue";
import Login from "../views/Login.vue";
import { auth } from "../firebase/firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Notes",
      component: Notes,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/collaboration",
      name: "Collaboration",
      component: Collaboration,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
  linkExactActiveClass: "active-link",
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    next("/");
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }
  next();
});

export default router;

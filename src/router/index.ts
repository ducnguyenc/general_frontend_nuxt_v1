import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
    }
  ],
});

router.beforeEach((to, from) => {
  if (localStorage.access_token == undefined) {
    let route = ['/signin', '/signup', '/'];
    if (route.indexOf(to.path) === -1) {
      return router.push('/signin')
    }
  }

  if (localStorage.access_token) {
    let route = ['/signin', '/signup'];    
    if (route.indexOf(to.path) >= 0) {      
      return router.push('/')
    }
  }
})

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: () => import("../views/PricingView.vue"),
  },
  {
    path: "/configurar/:plan",
    name: "Configurator",
    component: () => import("../views/ConfiguratorView.vue"),
    props: true,
  },
  {
    path: "/servicios/:slug",
    name: "ServiceDetail",
    component: () => import("../views/ServiceDetailView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;

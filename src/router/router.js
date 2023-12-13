import { createRouter, createWebHistory } from "vue-router";
import CatalogPage from "@/pages/CatalogPage";
import PromotionsPage from "@/pages/PromotionsPage";
import ReviewPage from "@/pages/ReviewPage";
import StoriesPage from "@/pages/StoriesPage";
import SupportPage from "@/pages/SupportPage";

const routes = [
  {
    path: "/:category?/:as?",
    component: CatalogPage,
  },

  {
    path: "/promotions",
    component: PromotionsPage,
  },
  {
    path: "/review",
    component: ReviewPage,
  },
  {
    path: "/stories",
    component: StoriesPage,
  },
  {
    path: "/support",
    component: SupportPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;

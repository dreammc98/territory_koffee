import { createRouter, createWebHistory } from "vue-router";
import CatalogPage from "@/pages/CatalogPage";
import PromotionsPage from "@/pages/PromotionsPage";
import ReviewPage from "@/pages/ReviewPage";
import StoriesPage from "@/pages/StoriesPage";
import SupportPage from "@/pages/SupportPage";
import ProductPage from "@/pages/ProductPage";

const routes = [
  {
    path: "/catalog",
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
  {
    path: "/product",
    component: ProductPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;

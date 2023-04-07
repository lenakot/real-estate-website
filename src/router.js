import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/Views/MainPage.vue";
import About from "@/Views/About.vue";
import HouseDetails from "@/Views/HouseDetails.vue";
import CreateNewHouse from "@/Views/CreateNewHouse.vue";
import EditHouse from "@/Views/EditHouse.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/house/:id",
      name: "Detail",
      component: HouseDetails,
    },
    {
      path: "/create-new-listing",
      name: "CreateNewHouse",
      component: CreateNewHouse,
    },
    {
      path: "/edit-listing/:id",
      name: "EditHouse",
      component: EditHouse,
    },
  ],
});

export default router;

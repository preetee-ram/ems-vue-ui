import { createRouter, createWebHistory } from "vue-router";
import EmployeeListView from "./views/EmployeeListView.vue";
import EmployeeAddView from "./views/EmployeeAddView.vue";
import EmployeeEditView from "./views/EmployeeEditView.vue";
import LoginView from "./views/LoginView.vue";
import SignupView from "./views/SignupView.vue";
import AuthLayout from "./layout/AuthLayout.vue";
import HomeLayout from "./layout/HomeLayout.vue";

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", component: LoginView }],
  },
  {
    path: "/signup",
    component: AuthLayout,
    children: [{ path: "", component: SignupView }],
  },
  {
    path: "/",
    component: HomeLayout,
    children: [
      {
        path: "/",
        name: "EmployeeList",
        component: EmployeeListView,
      },
      {
        path: "/add",
        name: "EmployeeAdd",
        component: EmployeeAddView,
      },
      {
        path: "/edit/:id",
        name: "EmployeeEdit",
        component: EmployeeEditView,
        props: true,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

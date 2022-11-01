import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import Login from "@/pages/Auth/LoginPage.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Product from "@/pages/Product.vue";
import Teams from "@/pages/Teams.vue";

// report cs
import ReportCS from "@/pages/CS/Report/ReportIndex.vue";
import ReportDataCS from "@/pages/CS/Report/ReportData.vue";
import ReportFormCS from "@/pages/CS/Report/ReportForm.vue";
import ReportDetailCS from "@/pages/CS/Report/ReportDetail.vue";

// member
import MemberIndex from "@/pages/CS/Member/MemberIndex.vue";
import MemberData from "@/pages/CS/Member/MemberData.vue";
import MemberAdd from "@/pages/CS/Member/MemberAdd.vue";
import MemberEdit from "@/pages/CS/Member/MemberEdit.vue";

// profile
import Profile from "@/pages/Profile/ProfileIndex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      redirect: "/auth/login",
      children: [
        {
          name: "login",
          path: "/auth/login",
          component: Login,
        },
      ],
    },
    {
      path: "/",
      redirect: "/dashboard",
      meta: { requiresAuth: true },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: Dashboard,
          meta: { title: "Dashboard" },
        },
        {
          path: "/product",
          name: "product",
          component: Product,
          meta: { title: "Produk" },
        },
        {
          path: "/team",
          name: "team",
          component: Teams,
          meta: { title: "Team" },
        },
        // profile
        {
          path: ":username",
          name: "profile",
          component: Profile,
          meta: { title: "Profile Page" },
        },
        // report cs
        {
          path: "/report-cs",
          name: "report-cs",
          component: ReportCS,
          children: [
            {
              path: "",
              name: "report-data",
              component: ReportDataCS,
              meta: { title: "Report Data" },
            },
            {
              path: "/report-form",
              name: "report-form-cs",
              component: ReportFormCS,
              meta: { title: "Report Form" },
            },
            {
              path: "/report-detail/:kode",
              name: "report-detail-cs",
              component: ReportDetailCS,
              meta: { title: "Report Detail" },
            },
          ],
        },
        // member
        {
          path: "/member-page",
          name: "member-index",
          component: MemberIndex,
          children: [
            {
              path: "",
              name: "member-data",
              component: MemberData,
              meta: { title: "Member" },
            },
            {
              path: "/member-add",
              name: "member-add",
              component: MemberAdd,
              meta: { title: "Member Form Add" },
            },
            {
              path: "/member-edit/:id",
              name: "member-edit",
              component: MemberEdit,
              meta: { title: "Member Form Edit" },
            },
          ],
        },
      ],
    },
  ],

  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    } else {
      window.scrollTo(0, 0);
    }
  },
});

router.beforeEach((to, from, next) => {
  store.commit("CLEAR_ERRORS");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth;
    if (!auth) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

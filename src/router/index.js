//   router/index.js
import VueRouter from "vue-router";
import Vue from "vue";
import { start, close } from "@/utils/nprogress.js";

// 插件一定要使用
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("@/layout/index.vue"),
      redirect: { name: "products" },
      children: [
        {
          name: "home",
          path: "home",
          component: () => import("@/view/Home.vue"),
          meta: {
            isShow: true,
            title: "个人中心",
            icon: "el-icon-s-custom",
          },
        },
        {
          name: "cart",
          path: "cart",
          component: () => import("@/view/Cart.vue"),
          meta: {
            isShow: true,
            title: "购物车",
            icon: "el-icon-shopping-cart-2",
          },
        },
        {
          name: "products",
          path: "products",
          component: () => import("@/view/Products.vue"),
          meta: {
            isShow: true,
            title: "商品列表",
            icon: "el-icon-shopping-bag-1",
          },
        },
        {
          name: "login",
          path: "/login",
          component: () => import("@/components/Login.vue"),
          meta: {
            isShow: false,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  start();
  next();
});

router.afterEach((to, from) => {
  close();
});

export default router;

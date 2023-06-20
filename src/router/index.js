//   router/index.js
import VueRouter from "vue-router";
import Vue from "vue";

// 插件一定要使用
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("@/layout/index.vue"),
      redirect: { name: "products" },
      children: [
        {
          name: "home",
          path: "/home",
          component: () => import("@/view/Home.vue"),
          meta: {
            title: "个人中心",
            icon: "el-icon-setting"
          }
        },
        {
          name: "cart",
          path: "/cart",
          component: () => import("@/view/Cart.vue"),
          meta: {
            title: "购物车",
            icon: "el-icon-menu"
          }
        },
        {
          name: "products",
          path: "/products",
          component: () => import("@/view/Products.vue"),
          meta: {
            title: "商品列表",
            icon: "el-icon-document"
          }
        },
      ],
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/components/Login.vue"),
    }
  ],
});

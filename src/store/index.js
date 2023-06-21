// store/index.js

import Vue from "vue";
// 创建VueX中的store, 并导出
import Vuex from "vuex";
// 使用插件
Vue.use(Vuex);

// 相当于DAO层, 操作数据
const mutations = {
  addCart(state, goods) {
    state.cartlist.push(goods);
  },
  setGoodsList(state, goodslist) {
    state.goodslist = goodslist;
  },
  removeCart(state, goods) {
    state.cartlist.splice(state.cartlist.indexOf(goods), 1);
  },
  // 清空购物车(已勾选的商品)
  clearCart(state, selectedGoods) {
    state.cartlist = state.cartlist.filter(goods => {
      return !selectedGoods.includes(goods);
    });
  },
};
// 相当于数据库,存储数据, , 类似Vue实例中的data属性
const state = {
  // 商品列表
  goodslist: [],
  // 购物车列表
  cartlist: [],
};

export default new Vuex.Store({
  mutations,
  state,
});

// store/index.js

import Vue from "vue";
// 创建VueX中的store, 并导出
import Vuex from "vuex";
// 使用插件
Vue.use(Vuex);
// 相当于service层, 处理主要业务逻辑
const actions = {
  // 此处调用API
  fun(context, val) {
    // 传递给其他函数继续处理
    context.dispatch("fun1", val);
    // 提交给 mutations 层
    context.commit("FUN", val);
  },
  fun1(context, val) {
    console.log("方法1处理业务");
  },
};
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
};
// 相当于数据库,存储数据, , 类似Vue实例中的data属性
const state = {
  // 商品列表
  goodslist: [],
  // 购物车列表
  cartlist: [],
  num: 0,
};
// 类似于Vue实例的computed属性
const getters = {
  computedNum(state) {
    return state.num * 10;
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});

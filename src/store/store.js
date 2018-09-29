import Vue from 'vue';
import Vuex from 'vuex';
import homeMenu from './home-menu.js';
Vue.use(Vuex);
let store = new Vuex.Store({
  modules:{
    homeMenu,
  },
});
export default store;
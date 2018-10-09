import Vue from 'vue';
import Vuex from 'vuex';
import homeMenu from './home-menu.js';
import dataProcessingState from './data-processing-state.js'
Vue.use(Vuex);
let store = new Vuex.Store({
  modules: {
    homeMenu,
    dataProcessingState
  },
});
export default store;
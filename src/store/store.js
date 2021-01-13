import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
  navId: '1',
  CH: null,
  cMsg: {},
  vMsg: {},
  cArr: [],
  sElems: [],
  tElems: [],
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});

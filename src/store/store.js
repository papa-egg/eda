import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
  userMsg: {},
  userList: [],
  navId: '1',
  CH: null,
  engine: null,
  doc: null,
  natureList: [],
  cMsg: {},
  vMsg: {},
  cArr: [],
  sElems: [],
  tElems: [],
  hitArr: [],
  natureStatus: 0,
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});

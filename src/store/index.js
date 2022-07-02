import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage

})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    SearchHistoryList: []
  },
  getters: {
  },
  mutations: {
    SETUSER (state, payload) {
      state.user = payload
    },
    HISTORY (state, payload) {
      let arr = state.SearchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.SearchHistoryList = arr
    },
    DELHISTORY (state, index) {
      state.SearchHistoryList.splice(index, 1)
    },
    EMPTYHISTORY (state) {
      state.SearchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})

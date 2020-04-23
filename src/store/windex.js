import Vue from 'vue'
import Wvuex from '../Wvuex'

Vue.use(Wvuex)

export default new Wvuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state, num = 1) {
      state.count += num
    }
  },
  getters: {
    score(state) {
      return 'score:' + state.count
    }
  },
  actions: {
    // 复杂业务逻辑，类似controller；如ajax请求
    asyncAdd({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('add', 3)
          resolve({ ok: 1 })
        }, 1000)
      })
    }
  }
})

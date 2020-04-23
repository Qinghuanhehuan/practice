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
})

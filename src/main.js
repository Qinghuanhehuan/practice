import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import store from './store/windex'
// import router from './wrouter'
import "./icons/"

Vue.config.productionTip = false
// 添加总线事件
Vue.prototype.$bus = new Vue()

// render函数创建组件实例
// <div id="box" class="foo"><span>aaa</span></div>
// Vue.component('comp',{
//   render(h){
//     return h('div',{class:{foo:true},attrs:{id:'box'}},[h('span','aaa')])
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

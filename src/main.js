import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './wrouter'

Vue.config.productionTip = false
// 添加总线事件
Vue.prototype.$bus = new Vue()

Vue.prototype.$dispatch = function(eventName,data){
  let parent = this.$parent
  while(parent){
    parent.$emit(eventName,data)
    // 递归查找父元素
    parent = parent.$parent
  }
}

Vue.prototype.$boardcast = function(eventName,data){
  boardcast.call(this,eventName,data)
}
function boardcast(eventName,data){
  this.$children.forEach(child=>{
    child.$emit(eventName,data)
    if(this.$children.length){
      // 递归调用，通过call修改this指向child
      boardcast.call(this,eventName,data)
    }
  })
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

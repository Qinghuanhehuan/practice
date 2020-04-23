// 维护状态state
// 修改状态commit
// 业务逻辑控制dispatch
// 状态派发getter
// 实现state响应式
// 插件
// 混入
let Vue;
function install(_Vue){
  Vue = _Vue

  Vue.mixin({
    beforeCreate(){
      if(this.$options.store){
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
class Store{
  //利用vue的数据响应式
  constructor(options={}){
    this.state = new Vue({
      data:options.state
    })
    // 初始化mutations
    this.mutations = options.mutations || {}
    this.actions = options.actions || {}

    options.getters && this.handleGetters(options.getters)
  }
  // 触发mutations，需要实现commit
  commit=(type,arg)=>{
    //this指向Store实例
    this.mutations[type](this.state,arg) //获取状态变更函数
  }

  dispatch=(type,arg)=>{
    this.actions[type]({
      commit:this.commit,
      state:this.state
    },
    arg
    )
  }

  handleGetters(getters){
    Object.keys(getters).forEach(key=>{
      Object.defineProperty(this.getters,key,{
        get:()=>{
          return getters[key](this.state)
        }
      })
    })
  }
}
export default {Store,install}

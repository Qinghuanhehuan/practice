import Vue from 'vue'

// 创建指定的组件实例并挂在到body上
export default function create(Component,props){
  //创建vue实例
  const vm = new Vue({
    render(h){
      // h函数可以渲染VNode
      return h(Component,{props})
    }
  }).$mount() //更新操作

  // vm创建了组件实例
  // 1.通过$children获取组件实例
  
  console.log(vm.$root)
  const comp = vm.$children[0]

  // 2.追加至body
  document.body.appendChild(vm.$el)

  // 3.清理函数
  comp.remove = () =>{
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  // 4.返回组件实例
  return comp
}

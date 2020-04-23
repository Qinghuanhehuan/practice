import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: "/list", name: "list", component: List },
      // { path: "/detail/:id", name: "detail", component: Detail },
      { path: "/detail/:id", name: "detail", component: Detail,props:true }
    ]
  },
  {
    path: '/about',
    meta:{auth:true},
    name: 'About',
    // beforeEnter(){} 路由级钩子
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !window.isLogin){
    if(window.confirm('请登录')){
      window.isLogin = true
      next() //登录成功进行下一步
    }else{
      next('/') // 放弃，回首页
    }
  }else{
    next() // 不需要登录
  }
})

// 动态路由
// 后台返回数据
//[{
// path: "/",
// name: "home",
// component: "Home", //Home
//}]

// 异步获取路由
// api.getRoutes().then(routes=>{
//   const routeConfig = routes.map(route=>mapComponent(route))
//   router.addRoutes(routeConfig)
// })
// // 映射关系
// const comMap ={
//   'Home':()=>import('../view/Home.vue')
// }
// // 递归替换
// function mapComponent(route){
//   route.component = comMap[route.component]
//   if(route.children){
//     route.children = route.children.map(child=>mapComponent(child))
//   }
//   return route
// }

export default router

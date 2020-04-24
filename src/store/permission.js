import { asyncRoutes, constRoutes} from '@/router'

/**
 * 根据路由meta.role确定是否当前⽤户拥有访问权限
 * @roles ⽤户拥有⻆⾊
 * @route 待判定路由
 */
function hasPermission(roles,route){
  if(route.meta && route.meta.roles){
    return roles.some(role => route.meta.roles.includes(role))
  }else{
    return true
  }
}

/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，⾸次传⼊的就是AsyncRoutes
 * @roles ⽤户拥有⻆⾊
 */
export function filterAsyncRoutes(routes,roles){
  const res = []
  routes.forEach(route=>{
    const tmp = {...route}
    if(hasPermission(roles,tmp)){
      if(tmp.children){
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes:[],
  addRoutes:[]
}
const mutations={
  SET_ROUTES:(state,routes)=>{
    state.addRoutes = routes
    state.routes = constRoutes.concat(routes)
  }
}
const actions={
  generatorRoutes({commit},roles){
    return new Promise(resolve=>{
      let accessedRoutes;
      if(roles.includes('admin')){
        accessedRoutes = asyncRoutes || []
      }else{
        accessedRoutes = filterAsyncRoutes(asyncRoutes,roles)
      }
      commit('SET_ROUTES',accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default{
  namespaced: true,
  state,
  mutations,
  actions
}

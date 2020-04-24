import { asyncRoutes, constRoutes } from "@/router";
/**
 * 根据路由meta.role确定是否当前⽤户拥有访问权限
 * @roles ⽤户拥有⻆⾊
 * @route 待判定路由
 */
function hasPermission(roles, route) {
  // 如果当前路由有roles字段则需判断⽤户访问权限
  if (route.meta && route.meta.roles) {
    // 若⽤户拥有的⻆⾊中有被包含在待判定路由⻆⾊表中的则拥有访问权
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    // 没有设置roles则⽆需判定即可访问
    return true;
  }
}
/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，⾸次传⼊的就是AsyncRoutes
 * @roles ⽤户拥有⻆⾊
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    // 复制⼀份
    const tmp = { ...route };
    // 如果⽤户有访问权则加⼊结果路由表
    if (hasPermission(roles, tmp)) {
      // 如果存在⼦路由则递归过滤之
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}
const state = {
  routes: [], // 完整路由表
  addRoutes: [] // ⽤户可访问路由表
};
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constRoutes.concat(routes);
  }
};
const actions = {
  // 路由⽣成：在得到⽤户⻆⾊后会第⼀时间调⽤
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      // ⽤户是管理员则拥有完整访问权限
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes || [];
      } else {
        // 否则需要根据⻆⾊做过滤处理
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

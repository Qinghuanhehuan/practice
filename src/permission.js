//做全局路由
import router from './router'
import store from './store'
import Message from 'element-ui'
import {getToken} from '@/utils/auth'//从cookie获取令牌
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  if(hasToken){
    // 有令牌
    if(to.path==='./login'){
      // 已登录，重定向至首页
      next({ path: '/' })
    }else{
      // 用户角色已附加，说明动态路由已添加
      const hasRoles = store.getter.roles && store.getters.roles.length > 0
      if(hasRoles){
        next()
      }else{
        try{
          // 1.请求用户信息
          const { roles } = await store.dispatch('user/getInfo')
          // 2.根据角色生成动态路由
          const accessRoutes = store.dispatch('permission/generateRoutes', roles)
          // 3.添加只router
          router.addRoutes(accessRoutes)
          // 4.重定向
          next({ ...to, replace: true })
        }catch(error){
          await store.dispatch('user/restToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    //用户无令牌
    if(whiteList.indexOf(to.path)!== -1){
      next();
    }else{
      next(`/login?redirect=${to.path}`)
    }
  }
})

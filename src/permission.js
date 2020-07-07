/*
 * @Author: your name
 * @Date: 2020-07-02 15:59:55
 * @LastEditTime: 2020-07-03 08:34:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \education\src\permission.js
 */ 
import router from './router'

router.beforeEach((to, from, next) => {
    // debugger
    // console.log('-beforeEach-', to.path)
    // 修改页面标题
    //   document.title = getPageTitle(to.meta.title)

    // 从 Cookie 获取 Token
    //   const hasToken = getToken()

    if (localStorage.getItem('scUserId')) { //如果有就直接到首页
        next();
    } else {
        if (to.path == '/login'|| to.path == '/register' || to.path == '/forgetPassword') { //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            if(to.path == '/register' || to.path == '/forgetPassword'){
                next();
            }
            next('/login');
        }

    }

})
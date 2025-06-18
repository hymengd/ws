import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import router from "./router";
import { usePermissionStore, useUserStore } from "./stores";
import { constantRouter } from "./router/config";
let modules = import.meta.glob('@/views/**/*.vue', { eager: true })

// 全局路由守卫 - 登录状态检查和权限路由加载
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    const whiteList = constantRouter // 白名单路由表

    // 在白名单中
   
        if (userStore.isLoggedIn) { // 已登录
            console.log("已登录");
            console.log(permissionStore.addRouters);
            
            if (permissionStore.addRouters.length === 0) { // 没有加载权限路由
                console.log("没有加载权限路由");
                // 加载权限路由
                await permissionStore.initUseRouter() // 加载权限路由 
                console.log(permissionStore.addRouters);
                console.log(router.getRoutes());

                // 添加权限路由
                // permissionStore.addRouters.forEach(route => {
                //     router.addRoute(route) // 添加到路由表中
                // })
                next({ ...to, replace: true }) // 替换当前路由，跳转到目标页面

            } else {
                console.log("已经加载过权限路由");
                next() // 直接进入
            }

        } else { // 未登录  
            console.log("未登录");  
            if (whiteList.some(item => item.path === to.path)) {
                next() // 直接进入
            } else { // 未登录且不在白名单中
                next('/login') // 跳转到登录页
            }
        }
    }
)
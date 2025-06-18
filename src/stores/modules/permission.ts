import { asyncRouter, constantRouter } from "@/router/config";
import { defineStore } from "pinia";
import type { PersistenceOptions } from "pinia-plugin-persistedstate";
import { ref } from "vue";
import { useRouter, type RouteRecordRaw } from "vue-router";
import { useUserStore } from "./user";
import { ro } from "element-plus/es/locales.mjs";
export const usePermissionStore = defineStore("permissionStore", () => {

    const router = useRouter();
    const addRouters = ref<RouteRecordRaw[]>([]);
    // 菜单的路由列表
    const menuRoutes = ref<RouteRecordRaw[]>([]);


    function initUseRouter() {
        console.log("initUseRouter");
        const userStore = useUserStore();
        const userInfo = userStore.userInfo;
        console.log(userInfo.role);

        addRouters.value = filterAsyncRoutes(asyncRouter, userInfo.role);
        addRouters.value.forEach(route => {
            router.addRoute('mainLayout', route); // 添加到 mainLayout 路由下
        });
        //  最后添加 404页面
        router.addRoute(
            {
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                component: () => import('@/views/system/404.vue'),
                meta: { hidden: true }
            }
        )
        // router.replace(router.currentRoute.value.fullPath)
        menuRoutes.value = router.getRoutes();
        console.log(menuRoutes.value);

    }
    // 路由过滤方法
    function filterAsyncRoutes(routes: RouteRecordRaw[], role: string): RouteRecordRaw[] {
        return routes.filter(route => {
            if (route.meta?.roles?.includes(role) || !route.meta?.roles) {
                return true
            }
            if (route.children) {
                route.children = filterAsyncRoutes(route.children, role)
                return route.children.length > 0
            }
            return false
        })
    }
    function cleanUseRouter() {
        addRouters.value = [];
        console.log(addRouters.value);
    }
    return { addRouters, menuRoutes, initUseRouter, cleanUseRouter }
},
    // {
    //     persist: {
    //         key: "permissionStore",
    //         storage: localStorage,
    //         paths: []
    //     } as PersistenceOptions
    // }
)
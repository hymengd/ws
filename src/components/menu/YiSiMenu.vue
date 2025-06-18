<template>
    <el-menu class="menu-container" :router="true" :default-active="$route.path">
        <yi-si-menu-item v-for="route in filteredRoutes" :key="route.path" :route="route" :base-path="route.path" />
    </el-menu>
</template>

<script lang="ts">
import YiSiMenuItem from './YiSiMenuItem.vue';
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    components: { YiSiMenuItem },
    setup() {
        const router = useRouter()

        const filteredRoutes = computed(() => {
            console.log(router.getRoutes());

            return router.getRoutes().filter(route => {
                // 过滤条件
                return !route.meta?.hidden
                    && route.components
                    // && route.path !== '/home'
                    // && route.path !== '/'
                    // && route.name !== 'mainLayout'
            })
        })
        console.log(filteredRoutes.value);


        return { filteredRoutes }
    }
}
</script>

<style scoped>
.menu-container {
    border-right: none;
    height: 100%;
}
</style>
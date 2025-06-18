<template>
    <el-container class="layout-container">
        <yi-si-header height="160px" @toggle-asider="toggleAsider"></yi-si-header>
        <el-container>
            <yi-si-asider :width="asiderWidth" :is-visible="isAsiderVisible"></yi-si-asider>
            <el-main class="main-content">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { ref } from 'vue'
import YiSiAsider from './asider/YiSiAsider.vue'
import YiSiHeader from './header/YiSiHeader.vue'
export default {
    // name: 'wsLayout',
    components: {
        YiSiAsider,
        YiSiHeader,
    },
    setup() {
        const asiderWidth = ref('200px')
        const isAsiderVisible = ref(true)
        const toggleAsider = () => {
            isAsiderVisible.value = !isAsiderVisible.value
            // asiderWidth.value = isAsiderVisible.value ? '200px' : '0px'
        }

        return { asiderWidth, isAsiderVisible, toggleAsider }
    }
}
</script>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.main-content {
    padding: 20px;
    background-color: #f5f7fa;
    height: calc(100vh - 100px); /* 减去头部高度 */
    overflow-y: auto;
}

.el-aside {
    background-color: #f0f0f0;
}   

</style>
<template>
    <el-aside :width="width" v-show="isVisible" style="background-color: black;">
        <yi-si-menu ></yi-si-menu>
    </el-aside>
</template>

<script lang="ts">
import YiSiMenu from '@/components/menu/YiSiMenu.vue'
export default {
    name: 'YiSiAsider',
    components: { YiSiMenu },
    props: {
        width: {
            type: String,
            default: '200px'
        },
        isVisible: {
            type: Boolean,
            default: true
        }
    },
    // computed: {
    //     computedWidth() {
    //         return this.isVisible ? this.width : '0px'
    //     }
    // }
}
</script>

<style></style>
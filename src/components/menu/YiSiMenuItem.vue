<template>
  <template v-if="shouldShow">
    <el-sub-menu v-if="hasChildren" :index="resolvePath">
      <template #title>
        <span>{{ route.meta?.title || route.name }}</span>
      </template>
      <yi-si-menu-item v-for="child in filteredChildren" :key="child.path" :route="child" :base-path="resolvePath" />
    </el-sub-menu>

    <el-menu-item v-else :index="resolvePath">
      <span>{{ route.meta?.title || route.name }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'YiSiMenuItem',
  props: {
    route: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const hasChildren = computed(() => {
      return props.route.children &&
        props.route.children.some((child: { component: any; meta: { hidden: any } }) =>
          child.component && !child.meta?.hidden
        )
    })

    const filteredChildren = computed(() => {
      return props.route.children?.filter((child: { meta: { hidden: any }; component: any }) =>
        !child.meta?.hidden && child.component
      ) || []
    })

    const resolvePath = computed(() => {
      // 修正路径拼接逻辑，避免重复
      if (props.route.path.startsWith('/')) {
        return props.route.path
      }
      return `${props.basePath}/${props.route.path}`
    })

    const shouldShow = computed(() => {
      return props.route.components
        && !props.route.meta?.hidden
      // && props.route.name !== 'mainLayout'
      // && props.route.path !== ''
    })

    return { hasChildren, filteredChildren, resolvePath, shouldShow }
  }
})
</script>
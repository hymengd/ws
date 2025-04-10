<script setup lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import { Setting, SwitchButton } from '@element-plus/icons-vue'
import { setUserOffline } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
const router = useRouter()
const userStore = useUserStore()

// 退出登录方法
const handleLogout = () => {
  setUserOffline(userStore.currentUserId)
  userStore.clearUserInfo()
  // 强制刷新页面以重置所有状态
  router.replace('/login').finally(() => {
    window.location.reload()
  })
}

// 设置方法
const handleSettings = () => {
  ElMessage.info('设置功能待实现')
}

// 导出组件
defineComponent({
  name: 'wsHeader'
})
</script>

<template>
  <header class="header-container">
    <div class="header-content">
      <div class="logo">
        <h1>即时通讯系统</h1>
      </div>
      <div class="header-actions">
        <el-button
          type="text"
          :icon="Setting"
          @click="handleSettings"
        >
          设置
        </el-button>
        <el-button
          type="text"
          :icon="SwitchButton"
          @click="handleLogout"
        >
          退出登录
        </el-button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  height: 60px;
  
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  h1 {
    margin: 0;
    font-size: 20px;
    color: #333;
  }
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;

  .el-button {
    padding: 8px 12px;
    font-size: 14px;
    
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>

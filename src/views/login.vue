<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { usePermissionStore, useUserStore } from '../stores/index'
import { login, setUserOnline } from '@/api/user'
const router = useRouter()
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const loginForm = ref({
  account: 'qm2025001',
  password: '1qaz'
})


const handleLogin = async () => {
  if (!loginForm.value.account.trim() || !loginForm.value.password.trim()) {
    ElMessage.warning('请输入完整的账号和密码')
    return
  }
  try {
    const { data } = await login(loginForm.value.account, loginForm.value.password)
    ElMessage.success('登录成功')
    // 设置用户为上线状态
    setUserOnline(userStore.currentUserId)
    await userStore.userlogin(data) // 登录成功后，设置用户信息
    await permissionStore.initUseRouter() // 初始化路由
    router.replace('/home') // 前面设置了登录信息，路由守卫判断
  } catch (e) {
    ElMessage.error('登录失败，请检查账号密码')
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">即时通讯系统登录</h2>
      <el-form :model="loginForm" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="loginForm.account" placeholder="请输入账号" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password
            @keyup.enter="handleLogin" />
        </el-form-item>
        <el-button type="primary" @click="handleLogin" class="login-btn">
          立即登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  width: 450px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 35px;
  color: #2c3e50;
  font-size: 24px;
}

.login-btn {
  width: 100%;
  margin-top: 25px;
  height: 40px;
}
</style>
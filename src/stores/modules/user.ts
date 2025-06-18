import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import type { UserInfo } from '@/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>({} as UserInfo) // 初始值为一个空对象，确保类型安全
  const isLoggedIn = ref(false) // 初始值为 false，代表未登录
  const permissionStore = ref<string[]>([]) // 初始值为空数组，用于存储权限信息
  const currentUserId = computed(() => userInfo.value.id || 0)

  async function userlogin(data: UserInfo) {
    try {
      console.log(data);
      userInfo.value = data
      isLoggedIn.value = true
      // ElMessage.success('登录成功')
      return Promise.resolve(data)
    } catch (error) {
      // ElMessage.error('登录失败')
      return Promise.reject(error)
    }
  }
  function clearUserInfo() {
    userInfo.value = {} as UserInfo // 重置为初始值
    isLoggedIn.value = false
    permissionStore.value = []
  }
  function setpermissionStore(permission: string[]) {
    permissionStore.value = permission
    console.log(permissionStore.value);
  }
  return { userInfo, isLoggedIn, permissionStore, currentUserId, userlogin, clearUserInfo, setpermissionStore }
},
  {
    // persist: true // 持久化配置，默认情况下会持久化整个state。key为上面的id，这里是'user'
    persist: {
      key: 'userStore',
      storage: localStorage,
      paths: ['userInfo', 'isLoggedIn']
    } as PersistenceOptions
  }
)
<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import useWebSocket from '../../composables/useWebSocket'
import WsMessageList from '../../components/business/WsMessageList.vue'
import { ElMessage } from 'element-plus'
import type { FriendInfo } from '../../types'
import { getAllFriendsInfoByUID } from '../../api/friend'
import { useUserStore } from '../../stores/index'
import { useFriendStore } from '@/stores/modules/friend'
const { connect, sendMessage, displayMessages, status, error } = useWebSocket()

const userStore = useUserStore()
const currentUserId = ref<number>(userStore.currentUserId) // 当前登录用户ID
// 修改好友列表响应式变量
const friends = computed(() => useFriendStore().friendList || [])
const targetUserId = ref<number>(2) //currentFriendId
const messageContent = ref('')
// 添加在线好友列表
let onlineFriends = ref<FriendInfo[]>([])

// 添加下拉菜单相关状态
const dropdownVisible = ref(false)

// 添加下拉菜单方法
const handleCreateGroup = () => {
  ElMessage.info('发起群聊功能待实现')
  dropdownVisible.value = false
}

const handleAddFriend = () => {
  ElMessage.info('添加好友功能待实现')
  dropdownVisible.value = false
}

// 初始化好友信息
async function initFriend() {
  try {
    // 获取好友列表
    const response = await getAllFriendsInfoByUID(currentUserId.value)
    // 好友信息存储到本地
    useFriendStore().setFriends(response.data)
    console.log("初始化本地好友列表："+friends.value);
    if(friends.value.length > 0) {
      targetUserId.value = friends.value[0].id // 设置第一个好友为默认选中的好友
    }
    console.log(response.data);
    
    onlineFriends = response.data.filter((friend: FriendInfo) => friend.status == '在线'  )
    console.log(onlineFriends.value);
    
  } catch (error) {
    console.error('获取好友列表失败:', error)
  }
}

// 添加好友切换方法
const switchFriend = (friendId: number) => {
  targetUserId.value = friendId
  console.log(targetUserId.value);
  
  // 这里可以添加消息记录更新逻辑
}
// 添加自动连接逻辑
onMounted(async() => {
  handleConnect();
  // 等待用户存储完成初始化
  await nextTick()
  // 初始化好友列表
  await initFriend();
  console.log(status);
  
  // setInterval(()=>{
  //   console.log("循环");
    
  //   console.log(useFriendStore().friendList);
  //   console.log(friends.value);
  // },10000)
})

const handleConnect = () => {
  if (!currentUserId.value) {
    ElMessage.warning('请输入用户ID')
    return
  }
  connect(currentUserId.value)
  // 模拟自动接收消息
  // setTimeout(() => {
  //   messages.push('收到消息: 欢迎使用即时通讯系统')
  //   messages.push('发送消息: 测试连接正常')
  // }, 1000)
}

const handleSend = () => {
  if (!messageContent.value.trim()) {
    ElMessage.warning('消息内容不能为空')
    return
  }
  sendMessage({
    sender_id: currentUserId.value,
    receiver_id: targetUserId.value,
    message_type: 'TEXT',
    content: messageContent.value,
    file_url: '',
    is_read: 0,
    created_at: new Date().toISOString(),
    // isSender: true
  })
  messageContent.value = ''
}

</script>

<template>
  <div class="websocket-container">
    <el-card shadow="hover" class="chat-card">
      <div class="chat-area">
        <!-- 好友列表 -->
        <el-card class="friend-panel">
          <template #header>
            <div class="panel-header">
              <span>好友列表</span>
              <div class="header-actions">
                <el-dropdown trigger="click" v-model="dropdownVisible">
                  <el-button type="primary" size="small">
                    更多操作
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="handleCreateGroup">发起群聊</el-dropdown-item>
                      <el-dropdown-item @click="handleAddFriend">添加好友</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <!-- <el-button type="primary" size="small" @click="handleConnect">
                  {{ status === 'connected' ? '已连接' : '连接' }}
                </el-button> -->
              </div>
            </div>
          </template>
          <div class="friend-list">
            <div 
              v-for="friend in friends" 
              :key="friend.id"
              class="friend-item"
              :class="{ 'active': targetUserId === friend.id }"
              @click="switchFriend(friend.id)"
            >
              <el-avatar :size="40" :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend}`" />
              <div class="friend-info">
                <span class="friend-name">{{ friend.name }}</span>
                <div class="status-indicator">
                  <span class="status-dot" :class="{ 'online': friend.status == '在线' }"></span>
                  <span class="status-text">{{ friend.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 聊天主区域 -->
        <div class="chat-main">
          <div class="chat-header">
            <div class="current-target">
              <el-avatar :size="40" :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${targetUserId}`" />
              <div class="target-info">
                <span class="target-name">用户 {{ targetUserId || '未选择' }}</span>
               
              </div>
            </div>
          </div>

          <div class="message-panel">
            <WsMessageList :messages="displayMessages" :status="status" :error="error" />
          </div>

          <div class="input-area">
            <el-input
              v-model="messageContent"
              type="textarea"
              :rows="3"
              resize="none"
              placeholder="输入消息内容..."
              :disabled="status !== 'connected'"
              @keyup.enter.exact="handleSend"
            />
            <div class="input-actions">
              <el-button
                type="primary"
                :disabled="status !== 'connected'"
                @click="handleSend"
              >
                发送
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.websocket-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.chat-card {
  border-radius: 8px;
  overflow: hidden;
}

.chat-area {
  display: flex;
  gap: 20px;
  height: 600px;
}

.friend-panel {
  width: 280px; 
  border-radius: 8px;
  overflow: hidden;
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  }

  .friend-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: calc(100% - 60px);
    overflow-y: auto;
    padding: 10px;
  }

  .friend-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #f5f7fa;
    }

    &.active {
      background-color: #ecf5ff;
    }

    .friend-info {
      display: flex;
      flex-direction: column;
      
      .friend-name {
        font-size: 14px;
        color: #333;
        margin-bottom: 4px;
      }
      
      .status-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #909399;
          
          &.online {
            background-color: #67c23a;
          }
        }
        
        .status-text {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid #ebeef5;
  background-color: #fff;

  .current-target {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .target-info {
    display: flex;
    flex-direction: column;
    
    .target-name {
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .connection-status {
      font-size: 12px;
      color: #909399;

      &.connected {
        color: #67c23a;
      }
    }
  }
}

.message-panel {
  flex: 1;
  overflow: hidden;
  background-color: #f5f7fa;
}

.input-area {
  padding: 16px;
  border-top: 1px solid #ebeef5;
  background-color: #fff;

  .input-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }
}
</style>
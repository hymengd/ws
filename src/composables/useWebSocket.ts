import { ref, reactive } from 'vue'
import type { TransMessages, DisplayMessage, FriendStatus } from '../types'
import { getMessageListByUID, insertTextMessage } from '../api/message'
import { useFriendStore } from '@/stores/modules/friend'

export default function useWebSocket() {
  const displayMessages = reactive<DisplayMessage[]>([])
  // const TransMessages = ref<TransMessages>()
  const socket = ref<WebSocket | null>(null)
  const status = ref('disconnected')
  const error = ref('')
  let heartbeatInterval: number | null = null;  // 心跳检测
  function startHeartbeat() {
    heartbeatInterval = setInterval(() => {
      if (socket.value && socket.value.readyState === WebSocket.OPEN) {
        socket.value.send('ping');
      }
    }, 30000); // 10秒一次
  }
  const connect = (userId: number) => {
    if (!userId) {
      error.value = '用户ID不能为空'
      return
    }
    status.value = 'connecting'
    // socket.value = new WebSocket(`ws://localhost:8080/websocket/${userId}`)
    socket.value = new WebSocket(`ws://localhost:8080/api/websocket/${userId}`)

    // 集中处理所有WebSocket事件
    socket.value.onopen = () => {
      status.value = 'connected'
      error.value = ''
      console.log('WebSocket连接成功');
      initMessages(userId) // 初始化消息
      startHeartbeat(); // 启动心跳检测
    }
    
    // 增加响应超时检测
    const timeout = setTimeout(() => {
      socket.value?.close();
      status.value = 'error';
      error.value = '心跳响应超时';
    }, 35000);
    socket.value.onmessage = (e) => {  // 移动到这里处理
      if (e.data === 'pong') {
        // 正常接收心跳响应
        return;
      }
      else {
        const msg = JSON.parse(e.data);
        useFriendStore().updateFriendStatus({ id: msg.userId, status: msg.status });  // 更新好友状态
      }
      clearTimeout(timeout)
      try {
        const msgData = JSON.parse(e.data) as FriendStatus;
        if (msgData.id) {
          useFriendStore().updateFriendStatus({
            id: msgData.id,
            status: msgData.status
          })
        } else {
          const msgData = JSON.parse(e.data) as DisplayMessage;
          displayMessages.push(msgData);
        }
      } catch (error) {
        console.error('消息解析失败:', error);
      }
    }

    socket.value.onerror = (e) => {
      status.value = 'error'
      error.value = `连接错误: ${e.type}`
    }
    const MAX_RETRIES = 3;
    let retries = 0;
    socket.value.onclose = () => {
      if (retries < MAX_RETRIES) {
        console.log('WebSocket连接失败，正在重试...');
        setTimeout(() => connect(userId), 2000);
        retries++;
      } else {
        console.log('WebSocket连接失败，重试次数超过限制');
        status.value = 'disconnected';
      }
    }
  }
  const disconnect = () => {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval)
    }
    socket.value?.close()
  }
  const sendMessage = (message: TransMessages) => {
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(message));
      insertTextMessage(message)
      const msg = { ...message, is_self: true } as DisplayMessage;

      displayMessages.push(msg) // 发送消息后立即添加到列表中
    }
  }
  // 新增初始化消息方法
  const initMessages = async (user_id: number) => {
    // messages.splice(0, messages.length, ...historyMessages); // 替换现有消息
    const response = await getMessageListByUID(user_id)
    displayMessages.push(...response.data) // 历史消息加载到消息列表中
  }


  return {
    connect,
    disconnect,
    sendMessage,
    displayMessages,
    status,
    error
  }
}
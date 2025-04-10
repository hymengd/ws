<script lang="ts">
import { defineComponent } from 'vue'
import type { DisplayMessage } from '../../types/index';
export default defineComponent({
  name: 'WsMessageList'
})
</script>

<script setup lang="ts">
defineProps<{
  messages: DisplayMessage[]
  status: string
  error?: string
}>()
</script>

<template>
  <div class="message-container">
    <div 
      v-for="(msg, index) in messages" 
      :key="index" 
      class="message-item"
      :class="{ 
        'left': !msg.is_self,
        'right': msg.is_self 
      }"
    >
      <div class="message-content">
        {{ msg.content }}
      </div>
      <div class="message-time">
        {{ new Date(msg.created_at).toLocaleTimeString() }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-container {
  padding: 20px;
  height: 90%;
  overflow-y: auto;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.message-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  max-width: 60%;
  
  .message-content {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .message-time {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
    padding: 0 8px;
  }

  &.left {
    align-items: flex-start;
    margin-right: auto;
    
    .message-content {
      background: #ffffff;
      border: 1px solid #e5e5e5;
      color: #333;
      border-radius: 0 8px 8px 8px;
    }
  }

  &.right {
    align-items: flex-end;
    margin-left: auto;
    
    .message-content {
      background: #95ec69;
      color: #000;
      border-radius: 8px 0 8px 8px;
    }
  }
}

.status {
  margin: 10px 0;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #f0f9eb;
}

.status.connected {
  color: #67c23a;
}

.status.error {
  color: #f56c6c;
  background-color: #fef0f0;
}

.error-message {
  color: #f56c6c;
  margin: 10px 0;
  padding: 8px 16px;
  background-color: #fef0f0;
  border-radius: 4px;
}
</style>
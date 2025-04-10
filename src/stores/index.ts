import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 创建 Pinia 实例并配置持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 统一导出所有模块
export * from './modules/user';

// 导出初始化后的 Pinia 实例
export default pinia;
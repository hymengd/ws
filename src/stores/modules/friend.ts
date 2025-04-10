import type { FriendInfo, FriendStatus } from "@/types";
import { defineStore } from "pinia";
import type { PersistenceOptions } from "pinia-plugin-persistedstate";
import { computed, ref } from "vue";

export const useFriendStore = defineStore('friend', () => {
    const friends = ref<FriendInfo[]>(); // 存储好友列表的数组，暂时用来解决好友在线/离线状态
    const friendList = computed(() => friends.value)
    /**
     * 初始化本地好友列表
     * @param friendList
     */
    function setFriends(friendList: FriendInfo[]) {
        friends.value = friendList;
    }
    /**
     * 根据用户id和状态更新好友在线/离线
     * @param payload
     */
    function updateFriendStatus(friendStaus: FriendStatus) {
        if (!friendStaus.id) {
            return;
        }
        // 根据friendStaus的id，在friends中找到对应的id，并更新friends的statu
        friends.value?.forEach(friend => {
            if(friend.id == friendStaus.id){
                friend.status = friendStaus.status as '在线' | '离线';
            }
        })
    }
    return { setFriends, updateFriendStatus, friendList }
},
    {
        persist: {
            key: 'friendStore',
            storage: localStorage,
            paths: ['friends']
        } as PersistenceOptions
    }
)

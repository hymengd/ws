// 查询用户的好友返回类型定义
export interface FriendRelationship {
    user_id: number;    // 用户ID
    friend_id: number;  // 好友ID
}
export interface FriendInfo {
    id: number;
    account: string;
    name: string;
    status: '在线' | '离线';
}
export interface FriendStatus {
    id: number;
    status: '在线' | '离线';
}


import type { FriendRelationship } from "@/types";
import axios from "axios";

export const getUserFriendByFriendId = (userId: number) => {
    return axios.post('/friend/getUserFriendsByUserId', {
        user_id: userId
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        return err;
    })    
}
export const getAllFriendsInfoByUID = (user_id: number) => {
    return axios.post('/friend/getAllFriendsInfoByUID',{
        user_id: user_id
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    })
}
export const insertUserFriend = (friendShip: FriendRelationship) => {
    return axios.post('/friend/insertUserFriend',friendShip,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res)=>{
        console.log(res);
    })
}
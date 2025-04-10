import type { TransMessages } from "@/types";
import axios from "axios";
export const getMessageListByUID = (user_id: number) => {
    return axios.post('/message/getMessageListByUID', user_id, {
        headers: {
            'Content-Type': 'application/json'  // 必须设置JSON内容类型
        }
    }).then(res => {
        return res
    });
}
export const insertTextMessage = (message: TransMessages) => {
    return axios.post('/message/insertTextMessage', message).then(res => {
        return res
    });
}
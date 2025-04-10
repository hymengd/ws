export interface TransMessages {
    message_id?: number
    sender_id: number
    receiver_id: number

    message_type: 'TEXT' | 'FILE' | 'IMAGE' | 'VIDEO' | 'LINK'
    content?: string
    file_url?: string

    is_read?: 0 | 1
    created_at?: string
}
// export interface TransMessages {
//     // 发送到后端的数据类型  ----- 
//     from: number
//     to: number
//     content: string


// }
export interface DisplayMessage {
    // 从后端返回的消息类型  ----- ？本地MessaeHistory中的MessageType
    message_id?: number
    sender_id: number
    receiver_id: number
    message_type: 'TEXT' | 'FILE' | 'IMAGE' | 'VIDEO' | 'LINK'
    content?: string
    file_url?: string
    is_read: 0 | 1
    created_at: string
    is_self: boolean
}
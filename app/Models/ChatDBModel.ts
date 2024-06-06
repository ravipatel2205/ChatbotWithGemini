import { type ChatModel } from './ChatsModel'

export interface ChatDBModel {
    id: string
    messages: ChatModel[]
}

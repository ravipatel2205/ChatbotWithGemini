import { type ChatModel } from '../Models/ChatsModel'
import { type ChatDBModel } from './../Models/ChatDBModel'
import { MMKV } from 'react-native-mmkv'

class DatabaseHelper {
    private static readonly instance: DatabaseHelper | undefined
    private readonly storage: MMKV
    private readonly historyKey = 'chatHistory'

    private constructor() {
        this.storage = new MMKV()
    }

    public static getInstance(): DatabaseHelper {
        let instance = DatabaseHelper.instance
        instance = instance ?? new DatabaseHelper() // If instance is null or undefined, create a new instance
        return instance
    }

    private chatModelsToJson(chatModels: ChatDBModel[]): string {
        return JSON.stringify(chatModels)
    }

    private jsonToChatModels(json: string): ChatDBModel[] {
        return JSON.parse(json)
    }

    public generateRandomString(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < 15; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    public async getAllChatsFromHistory(id: string): Promise<ChatModel[]> {
        const allChats = await this.getAllHistory()
        const index = allChats.findIndex((item) => item.id === id)
        if (index !== -1) {
            return allChats[index].messages
        } else {
            return []
        }
    }

    public async saveChats(chatModels: ChatModel[], chatModelId: string): Promise<void> {
        const allChats = await this.getAllHistory()
        const index = allChats.findIndex((item) => item.id === chatModelId)
        if (index !== -1) {
            allChats[index].messages = chatModels
        } else {
            const model: ChatDBModel = {
                id: chatModelId,
                messages: chatModels
            }
            allChats.push(...[model])
        }
        const json = this.chatModelsToJson(allChats)
        this.storage.set(this.historyKey, json)
    }

    public async getAllHistory(): Promise<ChatDBModel[]> {
        const json = this.storage.getString(this.historyKey)
        if (json !== null && json !== undefined && json !== '') {
            return this.jsonToChatModels(json)
        } else {
            return []
        }
    }
}
export const dataBaseHelper = DatabaseHelper.getInstance()

export interface ChatModel {
    isUser: boolean
    text: string
    image: string
    type: MessageType
}

export enum MessageType {
    text = 'text',
    image = 'image',
    imageWithText = 'imageWithText'
}
